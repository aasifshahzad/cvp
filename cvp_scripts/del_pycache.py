import os
import shutil
import argparse
from typing import List, Tuple


def delete_pycache_folders(root_folder: str, dry_run: bool = False) -> Tuple[int, int, int]:
    """
    Delete all __pycache__ folders recursively from the root folder.
    
    Args:
        root_folder: Root directory to start searching from
        dry_run: If True, only show what would be deleted without actually deleting
    
    Returns:
        Tuple of (found_count, deleted_count, failed_count)
    """
    found_count = 0
    deleted_count = 0
    failed_count = 0
    
    # Phase 1: Collect all __pycache__ paths first to avoid iteration issues
    pycache_paths: List[str] = []
    
    print(f"Scanning for __pycache__ folders in: {os.path.abspath(root_folder)}")
    print("-" * 80)
    
    for dirpath, dirnames, filenames in os.walk(root_folder):
        for dirname in dirnames:
            if dirname == '__pycache__':
                pycache_path = os.path.join(dirpath, dirname)
                pycache_paths.append(pycache_path)
                found_count += 1
    
    if found_count == 0:
        print("No __pycache__ folders found.")
        return found_count, deleted_count, failed_count
    
    print(f"Found {found_count} __pycache__ folder(s)")
    print("-" * 80)
    
    # Phase 2: Delete collected paths
    for pycache_path in pycache_paths:
        try:
            if dry_run:
                print(f"[DRY RUN] Would delete: {pycache_path}")
                deleted_count += 1
            else:
                print(f"Deleting: {pycache_path}")
                shutil.rmtree(pycache_path)
                deleted_count += 1
        except PermissionError:
            print(f"[ERROR] Permission denied: {pycache_path}")
            failed_count += 1
        except FileNotFoundError:
            print(f"[WARNING] Already deleted: {pycache_path}")
            # Don't count as failed since it's already gone
        except Exception as e:
            print(f"[ERROR] Failed to delete {pycache_path}: {str(e)}")
            failed_count += 1
    
    return found_count, deleted_count, failed_count


def main():
    """Main function to handle command-line arguments and execute deletion."""
    parser = argparse.ArgumentParser(
        description="Delete all __pycache__ folders recursively from a directory.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python del_pycache.py                    # Delete from current directory
  python del_pycache.py --dry-run          # Preview what would be deleted
  python del_pycache.py --root ../project  # Delete from specific directory
  python del_pycache.py --root . --dry-run # Preview from current directory
        """
    )
    
    parser.add_argument(
        '--root',
        type=str,
        default='./',
        help='Root directory to start searching (default: current directory)'
    )
    
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview what would be deleted without actually deleting'
    )
    
    args = parser.parse_args()
    
    # Validate root directory exists
    if not os.path.exists(args.root):
        print(f"[ERROR] Directory does not exist: {args.root}")
        return 1
    
    if not os.path.isdir(args.root):
        print(f"[ERROR] Path is not a directory: {args.root}")
        return 1
    
    # Execute deletion
    if args.dry_run:
        print("=" * 80)
        print("DRY RUN MODE - No files will be deleted")
        print("=" * 80)
    
    found, deleted, failed = delete_pycache_folders(args.root, args.dry_run)
    
    # Print summary
    print("-" * 80)
    print("Summary:")
    print(f"  Found:   {found} __pycache__ folder(s)")
    print(f"  {'Would delete' if args.dry_run else 'Deleted'}: {deleted} folder(s)")
    if failed > 0:
        print(f"  Failed:  {failed} folder(s)")
    
    if args.dry_run:
        print("\nRun without --dry-run to actually delete the folders.")
    elif deleted > 0:
        print("\nAll __pycache__ folders have been deleted successfully!")
    
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    exit(main())


# Windows command alternatives (for reference):
# del /s /q *.pyc
# for /d /r . %d in (__pycache__) do @if exist "%d" rd /s /q "%d"

# Made with Bob
