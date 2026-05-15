"""
Master Workspace Consolidation Script
Consolidates code files from workspace folders into organized outputs.

Handles: cvp_backend, cvp_dashboard, cvp_homeo
Excludes: tests/, scripts/, docs/ folders

Usage:
    python consolidate_workspace.py
    python consolidate_workspace.py --output-dir ./consolidated/
    python consolidate_workspace.py --redact "API_KEY|SECRET"
    python consolidate_workspace.py --quiet
    python consolidate_workspace.py --verbose
"""

import os
import re
import sys
import fnmatch
import logging
from pathlib import Path, PurePosixPath
from datetime import datetime
from typing import Dict, List, Tuple, Optional

# Setup logging
logging.basicConfig(
    format='%(message)s',
    level=logging.INFO
)
logger = logging.getLogger('consolidate_workspace')

# Code file extensions to include
CODE_EXTENSIONS = {
    '.py', '.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.html',
    '.json', '.yaml', '.yml', '.md', '.sql'
}

# Workspace folder structure (relative to consolidate_content folder)
# consolidate_content is in: cvp/cvp_scripts/consilidate_content
# So we need to go up 3 levels to get to cvp root
WORKSPACE_FOLDERS = {
    'backend': '../../cvp_backend',
    'dashboard': '../../cvp_dashboard',
    'homeo': '../../cvp_homeo'
}


def load_gitignore_patterns(search_start: Path, max_depth: int = 6) -> List[str]:
    """Search upward for .gitignore and load patterns."""
    patterns = []
    cur = search_start.resolve()
    
    for _ in range(max_depth):
        gitignore = cur / '.gitignore'
        if gitignore.exists():
            try:
                with open(gitignore, 'r', encoding='utf-8') as f:
                    for line in f:
                        s = line.strip()
                        if s and not s.startswith('#'):
                            patterns.append(s)
                logger.info('Loaded .gitignore from: %s (%d patterns)', gitignore, len(patterns))
                return patterns
            except Exception as e:
                logger.warning('Error reading .gitignore: %s', e)
                return patterns
        cur = cur.parent
    
    return patterns


def should_exclude(file_path: Path, patterns: List[str]) -> bool:
    """Check if file matches any exclude pattern."""
    if not patterns:
        return False
    
    posix_path = file_path.as_posix()
    relative_posix = posix_path.replace('\\', '/')
    
    for pat in patterns:
        try:
            if fnmatch.fnmatch(relative_posix, pat) or fnmatch.fnmatch(posix_path, pat):
                return True
        except Exception:
            continue
    
    return False


def walk_code_files(folder: Path, exclude_patterns: List[str]) -> Dict[str, str]:
    """Walk a folder and collect all code files."""
    files = {}
    
    if not folder.exists():
        logger.warning('Folder does not exist: %s', folder)
        return files
    
    try:
        for root, dirs, filenames in os.walk(folder):
            # Filter out common exclude directories
            dirs[:] = [d for d in dirs if d not in {'.git', '__pycache__', 'node_modules', '.pytest_cache', 'dist', 'build', '.venv', 'venv', '.vscode', 'tests', 'scripts', 'docs'}]
            
            for fname in filenames:
                file_path = Path(root) / fname
                
                # Check extension
                if file_path.suffix.lower() not in CODE_EXTENSIONS:
                    continue
                
                # Check gitignore patterns
                if should_exclude(file_path, exclude_patterns):
                    logger.debug('Skipping (gitignore): %s', file_path)
                    continue
                
                # Read file content
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    # Store relative path as key
                    rel_path = file_path.relative_to(folder).as_posix()
                    files[rel_path] = content
                except Exception as e:
                    logger.warning('Error reading file %s: %s', file_path, e)
                    continue
    
    except Exception as e:
        logger.error('Error walking folder %s: %s', folder, e)
    
    return files


def apply_redaction(content: str, redact_regex: Optional[str]) -> str:
    """Apply redaction to content if regex provided."""
    if not redact_regex:
        return content
    
    try:
        return re.sub(redact_regex, '<REDACTED>', content)
    except re.error as e:
        logger.warning('Invalid redact regex: %s', e)
        return content


def consolidate_folder(
    folder_name: str,
    folder_path: Path,
    output_dir: Path,
    exclude_patterns: List[str],
    redact_regex: Optional[str] = None,
    stable: bool = True
) -> Tuple[int, int]:
    """Consolidate a single folder into output files."""
    
    logger.info('\n' + '=' * 80)
    logger.info('CONSOLIDATING: %s', folder_name.upper())
    logger.info('=' * 80)
    
    # Collect files
    files = walk_code_files(folder_path, exclude_patterns)
    
    if not files:
        logger.warning('No code files found in %s', folder_name)
        return 0, 0
    
    # Sort for determinism
    if stable:
        files = {k: files[k] for k in sorted(files.keys())}
    
    total_files = 0
    total_size = 0
    
    # Create consolidated file
    output_file = output_dir / f'consolidated_{folder_name}.txt'
    index_file = output_dir / f'consolidated_{folder_name}_index.txt'
    
    try:
        with open(output_file, 'w', encoding='utf-8') as outf:
            # Header
            outf.write('=' * 80 + '\n')
            outf.write(f'CONSOLIDATED {folder_name.upper()} FILES\n')
            outf.write('=' * 80 + '\n')
            outf.write(f'Generated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n')
            outf.write(f'Folder: {folder_path}\n')
            outf.write(f'Total files: {len(files)}\n')
            outf.write('=' * 80 + '\n\n')
            
            # Table of contents
            outf.write('TABLE OF CONTENTS\n')
            outf.write('-' * 80 + '\n')
            for i, file_path in enumerate(files.keys(), 1):
                outf.write(f'{i:3d}. {file_path}\n')
            outf.write('\n' + '=' * 80 + '\n\n')
            
            # Files
            for file_path, content in files.items():
                # Apply redaction
                content = apply_redaction(content, redact_regex)
                
                file_size = len(content.encode('utf-8'))
                total_files += 1
                total_size += file_size
                
                outf.write('─' * 80 + '\n')
                outf.write(f'FILE: {file_path}\n')
                outf.write(f'Size: {file_size} bytes\n')
                outf.write('─' * 80 + '\n\n')
                outf.write(content)
                outf.write('\n\n')
                
                logger.info('  Consolidated: %s (%d bytes)', file_path, file_size)
        
        logger.info('✅ Output file: %s', output_file)
    except Exception as e:
        logger.error('❌ Error creating consolidated file: %s', e)
        return 0, 0
    
    # Create index file
    try:
        categories = {}
        for file_path in files.keys():
            parts = file_path.split('/')
            category = parts[0] if parts[0] else 'root'
            if category not in categories:
                categories[category] = []
            categories[category].append(file_path)
        
        with open(index_file, 'w', encoding='utf-8') as outf:
            outf.write('=' * 80 + '\n')
            outf.write(f'{folder_name.upper()} FILES INDEX\n')
            outf.write('=' * 80 + '\n\n')
            
            # Categories
            for category in sorted(categories.keys()):
                outf.write(f'\n📁 {category.upper()}\n')
                outf.write('-' * 40 + '\n')
                for file_path in sorted(categories[category]):
                    file_name = file_path.split('/')[-1]
                    file_size = len(files[file_path].encode('utf-8'))
                    outf.write(f'  📄 {file_name:<40} ({file_size:>6} bytes)\n')
            
            # Summary
            outf.write('\n\n' + '=' * 80 + '\n')
            outf.write('SECTION SUMMARY\n')
            outf.write('=' * 80 + '\n\n')
            for category in sorted(categories.keys()):
                cat_files = categories[category]
                cat_size = sum(len(files[f].encode('utf-8')) for f in cat_files)
                outf.write(f'{category.upper():20} {len(cat_files):3d} files  {cat_size:>8,} bytes\n')
        
        logger.info('✅ Index file: %s', index_file)
    except Exception as e:
        logger.error('❌ Error creating index file: %s', e)
    
    # Summary
    logger.info('\n' + '-' * 80)
    logger.info('Consolidated %d files | Total size: %.2f MB', total_files, total_size / 1024 / 1024)
    logger.info('-' * 80)
    
    return total_files, total_size


def create_workspace_readme(output_dir: Path, results: Dict[str, Tuple[int, int]]) -> None:
    """Create comprehensive README for the workspace consolidation."""
    
    readme_file = output_dir / 'README.md'
    
    try:
        with open(readme_file, 'w', encoding='utf-8') as f:
            f.write('# Workspace Consolidation Report\n\n')
            f.write(f'**Generated:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n\n')
            
            # Summary table
            f.write('## Consolidation Summary\n\n')
            f.write('| Folder | Files | Size (MB) |\n')
            f.write('|--------|-------|----------|\n')
            
            total_all_files = 0
            total_all_size = 0
            
            for folder, (file_count, size_bytes) in sorted(results.items()):
                size_mb = size_bytes / (1024 * 1024)
                f.write(f'| {folder:12} | {file_count:5d} | {size_mb:8.2f} |\n')
                total_all_files += file_count
                total_all_size += size_bytes
            
            total_mb = total_all_size / (1024 * 1024)
            f.write(f'| **TOTAL** | **{total_all_files}** | **{total_mb:.2f}** |\n\n')
            
            # Files
            f.write('## Generated Files\n\n')
            for folder in sorted(results.keys()):
                f.write(f'### {folder.capitalize()}\n\n')
                f.write(f'- `consolidated_{folder}.txt` - All code files consolidated\n')
                f.write(f'- `consolidated_{folder}_index.txt` - File structure and index\n\n')
            
            # Instructions
            f.write('## How to Use\n\n')
            f.write('1. **Browse Index Files:** Start with `consolidated_*_index.txt` for quick reference\n')
            f.write('2. **Review Code:** Open `consolidated_*.txt` for complete code review\n')
            f.write('3. **Search:** Use Ctrl+F to find specific code patterns or files\n')
            f.write('4. **Share:** Send consolidated files for code review or documentation\n\n')
            
            # Notes
            f.write('## Notes\n\n')
            f.write('- Original files remain unchanged\n')
            f.write('- Files matching `.gitignore` patterns are excluded\n')
            f.write('- Files are sorted alphabetically for reproducibility\n')
            f.write('- Non-code files are excluded (see CODE_EXTENSIONS in script)\n')
        
        logger.info('✅ README created: %s', readme_file)
    except Exception as e:
        logger.error('❌ Error creating README: %s', e)


def main():
    """Main consolidation workflow."""
    
    logger.info('\n' + '=' * 80)
    logger.info('WORKSPACE FILE CONSOLIDATION TOOL')
    logger.info('=' * 80)
    logger.info('Started at: %s\n', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    
    # Parse arguments
    output_dir = Path(__file__).parent  # Default: consolidate_content folder
    redact_regex = None
    quiet = False
    
    i = 1
    while i < len(sys.argv):
        arg = sys.argv[i]
        if arg == '--output-dir' and i + 1 < len(sys.argv):
            output_dir = Path(sys.argv[i + 1])
            i += 2
        elif arg == '--redact' and i + 1 < len(sys.argv):
            redact_regex = sys.argv[i + 1]
            i += 2
        elif arg == '--quiet':
            logger.setLevel(logging.WARNING)
            quiet = True
            i += 1
        elif arg == '--verbose':
            logger.setLevel(logging.DEBUG)
            i += 1
        else:
            i += 1
    
    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    logger.info('Output directory: %s\n', output_dir)
    
    # Load gitignore patterns
    gitignore_patterns = load_gitignore_patterns(Path(__file__).parent)
    
    # Setup script directory for relative paths
    script_dir = Path(__file__).parent
    
    results = {}
    
    # Consolidate each folder
    for folder_name, rel_path in WORKSPACE_FOLDERS.items():
        folder_path = (script_dir / rel_path).resolve()
        
        if not folder_path.exists():
            logger.warning('⚠️  Folder not found: %s (%s)', folder_name, folder_path)
            continue
        
        file_count, size_bytes = consolidate_folder(
            folder_name,
            folder_path,
            output_dir,
            gitignore_patterns,
            redact_regex,
            stable=True
        )
        
        if file_count > 0:
            results[folder_name] = (file_count, size_bytes)
    
    # Create workspace summary
    if results:
        create_workspace_readme(output_dir, results)
    
    # Final summary
    logger.info('\n' + '=' * 80)
    logger.info('CONSOLIDATION COMPLETE!')
    logger.info('=' * 80)
    logger.info('Output directory: %s', output_dir)
    logger.info('Folders consolidated: %d', len(results))
    logger.info('Total files: %d', sum(f for f, _ in results.values()))
    logger.info('Total size: %.2f MB', sum(s for _, s in results.values()) / (1024 * 1024))
    logger.info('=' * 80 + '\n')
    
    return 0 if results else 1


if __name__ == '__main__':
    sys.exit(main())
