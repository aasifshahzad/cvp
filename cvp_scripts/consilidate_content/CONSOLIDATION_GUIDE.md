# File Consolidation Scripts - Complete Guide

## Quick Start (New Unified Approach)

**Use `consolidate_workspace.py` to consolidate all workspace folders at once:**

```bash
cd consilidate_content
python consolidate_workspace.py
```

This will consolidate all code from:
- `cvp_backend` → `consolidated_backend.txt`
- `cvp_dashboard` → `consolidated_dashboard.txt`
- `cvp_scripts` → `consolidated_scripts.txt`
- `cvp_docs` (if code files exist)
- `cvp_homeo` (if code files exist)

**Output location:** `f:\2_PROJECTS\B2_CVP\cvp\cvp_scripts\consilidate_content\`

### Options

```bash
# Custom output directory
python consolidate_workspace.py --output-dir ./backups/

# Redact sensitive patterns (API keys, secrets, etc.)
python consolidate_workspace.py --redact "API_KEY|SECRET|PASSWORD"

# Quiet mode (warnings only)
python consolidate_workspace.py --quiet

# Verbose mode (debug info)
python consolidate_workspace.py --verbose
```

---

## About This Guide

**Primary Script:** `consolidate_workspace.py`

This is the unified, recommended approach for consolidating all workspace folders. It dynamically scans your actual directories and requires no hardcoded file lists.

Previous scripts (`consolidate_dashboard_files.py`, `consolidate_backend_files.py`, `consolidate_all.py`) have been deprecated and removed as they relied on manually-maintained file lists.

## Why Consolidate Files?

- **Documentation**: Create complete snapshots of your project structure
- **Code Review**: Review entire modules in a single file
- **Backup**: Preserve project state at specific points
- **Analysis**: Understand code distribution and architecture
- **Sharing**: Send consolidated files for collaboration

---

## Script 1: consolidate_dashboard_files.py

### Purpose
Combines all 103 dashboard files (TypeScript/TSX, CSS) into a single comprehensive document.

### What It Does
- Reads all file definitions from `create_files_from_list.py`
- Merges content while maintaining file organization
- Creates organized table of contents
- Generates categorized index file
- Preserves code formatting and structure

### Usage

#### Basic Usage (Default Output)
```bash
cd utils
python consolidate_dashboard_files.py
```
**Output:**
- `consolidated_dashboard_files.txt` - Combined content of all 103 files
- `consolidated_dashboard_files_index.txt` - Organized file index

#### Custom Output Path
```bash
python consolidate_dashboard_files.py consolidated_dashboard_output.txt
```

#### With Custom Directory
```bash
python consolidate_dashboard_files.py --output ./output/dashboard_consolidated.txt
```

### Output Structure

The consolidated file includes:
```
├── Header with metadata
├── Table of Contents (numbered list of all files)
├── Files Section
│   ├── File separator with info
│   ├── File path and size
│   ├── File content
│   └── Blank lines for readability
└── End
```

### Example Output Fragment
```
════════════════════════════════════════════════════════════════════════════════
CONSOLIDATED dashboard FILES
════════════════════════════════════════════════════════════════════════════════
Generated on: 2026-03-31 15:30:45
Total files: 103
════════════════════════════════════════════════════════════════════════════════

TABLE OF CONTENTS
────────────────────────────────────────────────────────────────────────────────
  1. api/axiosInterceptorInstance.ts
  2. api/AttendaceTime/attendanceTimeAPI.ts
  3. api/Attendance/AttendanceAPI.ts
...
```

### Index File Features
- Organized by folder category
- Shows file sizes
- Visual indicators (📁 for folders, 📄 for files)
- Easy navigation reference

---

## Script 2: consolidate_backend_files.py

### Purpose
Combines all 43 backend Python files into a single comprehensive document.

### What It Does
- Reads all file definitions from `create_backend_files.py`
- Merges FastAPI routes, Pydantic schemas, and user management code
- Creates table of contents with line references
- Generates categorized index file
- Includes backend structure guide explaining architecture

### Usage

#### Basic Usage (Default Output)
```bash
cd utils
python consolidate_backend_files.py
```
**Output:**
- `consolidated_backend_files.txt` - Combined content of all 43 files
- `consolidated_backend_files_index.txt` - Organized file index
- `consolidated_backend_files_structure_guide.txt` - Architecture documentation

#### Custom Output Path
```bash
python consolidate_backend_files.py consolidated_backend_output.txt
```

### Output Files

#### 1. Main Consolidated File
Contains all backend code organized by:
- Router files (11)
- Schema files (11)
- User module files (5)
- Init files

#### 2. Index File
Shows:
- File structure by category
- File sizes
- Summary statistics

#### 3. Structure Guide
Explains:
- Folder purposes
- File contents
- Integration notes
- Architecture overview

### Example Output Fragment
```
════════════════════════════════════════════════════════════════════════════════
CONSOLIDATED BACKEND FILES
════════════════════════════════════════════════════════════════════════════════
Generated on: 2026-03-31 15:30:45
Total files: 43
════════════════════════════════════════════════════════════════════════════════

TABLE OF CONTENTS
────────────────────────────────────────────────────────────────────────────────
  1. router/__init__.py
  2. router/adm_del.py
  3. router/admin_create_user.py
...

BACKEND STRUCTURE GUIDE
════════════════════════════════════════════════════════════════════════════════

📁 ROUTER FOLDER
   Location: ./router/
   Purpose: FastAPI route handlers and endpoint definitions
   ...
```

---

## Script 3: consolidate_all.py

### Purpose
Master script that orchestrates consolidation of both dashboard and backend files with comprehensive documentation.

### What It Does
- Imports and runs both `consolidate_dashboard_files.py` and `consolidate_backend_files.py`
- Organizes all outputs in a single directory
- Creates comprehensive README with project overview
- Provides unified reporting and progress tracking

### Usage

#### Basic Usage (Creates files in current directory)
```bash
cd utils
python consolidate_all.py
```

#### With Custom Output Directory
```bash
python consolidate_all.py --output-dir ./consolidated_output/
```

#### Alternative Syntax
```bash
python consolidate_all.py ./my_consolidation_folder/
```

### Output Structure

```
output_directory/
├── consolidated_dashboard_files.txt          (dashboard code - all 103 files)
├── consolidated_dashboard_files_index.txt    (dashboard index and structure)
├── consolidated_backend_files.txt           (Backend code - all 43 files)
├── consolidated_backend_files_index.txt     (Backend index and structure)
├── consolidated_backend_files_structure_guide.txt  (Architecture guide)
└── README.md                                (Complete documentation)
```

### Console Output Example
```
════════════════════════════════════════════════════════════════════════════════
MASTER FILE CONSOLIDATION TOOL
════════════════════════════════════════════════════════════════════════════════
Started at: 2026-03-31 15:30:45

STEP 1: Consolidating dashboard Files
────────────────────────────────────────────────────────────────────────────────
Consolidating dashboard files...
✅ Consolidated: api/axiosInterceptorInstance.ts (2456 bytes)
✅ Consolidated: api/AttendaceTime/attendanceTimeAPI.ts (1234 bytes)
...
✅ dashboard Index file created successfully

════════════════════════════════════════════════════════════════════════════════
STEP 2: Consolidating Backend Files
────────────────────────────────────────────────────────────────────────────────
Consolidating backend files...
✅ Consolidated: router/__init__.py (0 bytes)
✅ Consolidated: router/adm_del.py (545 bytes)
...
✅ Backend Index file created successfully
✅ Structure guide created successfully

════════════════════════════════════════════════════════════════════════════════
STEP 3: Creating Documentation
────────────────────────────────────────────────────────────────────────────────
✅ README created: ./output_directory/README.md

════════════════════════════════════════════════════════════════════════════════
CONSOLIDATION COMPLETE!
════════════════════════════════════════════════════════════════════════════════

Output Directory: g:\GitHub\mms_general\utils\./

Files Created:
  ✅ consolidated_dashboard_files.txt (2.34 MB)
  ✅ consolidated_dashboard_files_index.txt
  ✅ consolidated_backend_files.txt (0.87 MB)
  ✅ consolidated_backend_files_index.txt
  ✅ consolidated_backend_files_structure_guide.txt
  ✅ README.md

Completed at: 2026-03-31 15:30:47
════════════════════════════════════════════════════════════════════════════════
```

---

## Complete Workflow

### Step 1: Generate Files (if needed)
```bash
# Create all dashboard files
python create_files_from_list.py

# Create all backend files
python create_backend_files.py
```

### Step 2: Consolidate Files
```bash
# Run all consolidation in one command
python consolidate_all.py --output-dir ./project_snapshot/
```

### Step 3: Access Consolidated Files
```
project_snapshot/
├── consolidated_dashboard_files.txt          (Read for dashboard overview)
├── consolidated_backend_files.txt           (Read for backend overview)
├── README.md                                (Read for documentation)
└── *_index.txt files                        (Reference for navigation)
```

---

## File Size Reference

### dashboard Consolidation
- **Total Files:** 103
- **Expected Size:** ~2.5 MB
- **Components:**
  - API clients: ~30 KB
  - Pages: ~150 KB
  - Components: ~800 KB
  - UI Components: ~400 KB
  - Models & Utils: ~250 KB

### Backend Consolidation
- **Total Files:** 43
- **Expected Size:** ~1.2 MB
- **Components:**
  - Router files: ~250 KB
  - Schema files: ~450 KB
  - User module: ~200 KB

---

## Best Practices

### When to Use Each Script

| Use Case | Script | Command |
|----------|--------|---------|
| Review specific module (dashboard) | `consolidate_dashboard_files.py` | `python consolidate_dashboard_files.py` |
| Review specific module (backend) | `consolidate_backend_files.py` | `python consolidate_backend_files.py` |
| Complete project snapshot | `consolidate_all.py` | `python consolidate_all.py --output-dir ./snapshot/` |
| Regular documentation | `consolidate_all.py` | From CI/CD or scheduled task |

### Tips

1. **Version Control**: Add consolidated files to .gitignore if they're generated regularly
2. **Timestamps**: Use `--output-dir` with timestamps for version tracking:
   ```bash
   python consolidate_all.py --output-dir "./snapshots/$(date +%Y%m%d_%H%M%S)/"
   ```

3. **Documentation**: Generated README files are meant for reference only
4. **Size Monitoring**: Use index files to track changes in project structure
5. **Backup**: Keep monthly snapshots for documentation purposes

---

## Troubleshooting

### Issue: "Module not found" error
**Solution:** Ensure you're running from the `utils/` directory

### Issue: File not created
**Solution:** Check directory permissions and ensure output path exists

### Issue: Missing content
**Solution:** Verify source files (create_files_from_list.py, create_backend_files.py) exist and contain data

### Issue: Large file size
**Solution:** This is normal - consolidated files contain all code without compression

---

## Advanced Usage

### Generate Multiple Snapshots
```bash
for i in {1..5}; do
    python consolidate_all.py --output-dir "./snapshots/snapshot_$i/"
done
```

### Compare Snapshots
```bash
# Use diff to compare two consolidations
diff consolidated_output_1/consolidated_backend_files.txt \
     consolidated_output_2/consolidated_backend_files.txt
```

### Extract Statistics
```bash
# Get total lines of code
wc -l consolidated_backend_files.txt

# Get file count from index
grep "files" consolidated_backend_files_index.txt
```

---

## Summary

| Feature | dashboard | Backend | Master | Workspace |
|---------|----------|---------|--------|-----------|
| Consolidates dashboard | ✅ | ❌ | ✅ | ✅ |
| Consolidates backend | ❌ | ✅ | ✅ | ✅ |
| Consolidates all folders | ❌ | ❌ | ❌ | ✅ |
| Creates index | ✅ | ✅ | ✅ | ✅ |
| Creates guide | ❌ | ✅ | ✅ | ❌ |
| Creates README | ❌ | ❌ | ✅ | ✅ |
| Single command | ❌ | ❌ | ✅ | ✅ |
| Walks directories | ❌ | ❌ | ❌ | ✅ |
| .gitignore support | ❌ | ❌ | ✅ | ✅ |
| Redaction support | ❌ | ❌ | ✅ | ✅ |
| Deterministic order | ❌ | ❌ | ✅ | ✅ |

**Recommendation:** 
- Use `consolidate_workspace.py` for **complete workspace consolidation** across all folders
- Use `consolidate_all.py` for **dashboard + backend specific** project snapshots
- Use individual scripts for **focused module** consolidation

---

## Script 4: consolidate_workspace.py (NEW - UNIFIED APPROACH)

### Purpose
The new unified consolidation script that walks all workspace folders, discovers code files, and consolidates each folder independently.

**Advantages:**
- No pre-defined file lists needed
- Automatically discovers all code files via directory walking
- Handles all workspace folders: backend, dashboard, homeo, scripts, docs
- Respects .gitignore patterns automatically
- Supports redaction of sensitive data
- Deterministic, reproducible outputs
- Comprehensive workspace summary

### What It Does
- Walks each workspace folder recursively
- Identifies code files by extension (.py, .ts, .tsx, .js, .jsx, .css, .scss, .html, .json, .yaml, .md, .sql)
- Filters out standard exclude directories (.git, __pycache__, node_modules, .venv, dist, build, etc.)
- Reads .gitignore patterns from workspace root
- Excludes files matching .gitignore patterns
- Consolidates each folder into a separate output file
- Creates index and summary for each folder
- Generates comprehensive workspace README

### Usage

#### Basic Usage (Consolidates all workspace folders)
```bash
cd cvp_scripts/consilidate_content
python consolidate_workspace.py
```

**Output Location:** `f:\2_PROJECTS\B2_CVP\cvp\cvp_scripts\consilidate_content\`

**Files Created:**
- `consolidated_backend.txt` + `consolidated_backend_index.txt`
- `consolidated_dashboard.txt` + `consolidated_dashboard_index.txt`
- `consolidated_scripts.txt` + `consolidated_scripts_index.txt`
- `consolidated_docs.txt` + `consolidated_docs_index.txt` (if code files exist)
- `consolidated_homeo.txt` + `consolidated_homeo_index.txt` (if code files exist)
- `README.md` (Workspace summary)

#### Custom Output Directory
```bash
python consolidate_workspace.py --output-dir ./backups/
python consolidate_workspace.py --output-dir ../consolidated_2026_05/
```

#### Redact Sensitive Data (API Keys, Secrets, Passwords)
```bash
# Redact API keys and secrets
python consolidate_workspace.py --redact "API_KEY|SECRET|PASSWORD"

# Redact database credentials
python consolidate_workspace.py --redact "password=|db_password|DB_HOST"

# Redact custom patterns
python consolidate_workspace.py --redact "YOUR_PATTERN_HERE"
```

#### Logging Modes
```bash
# Quiet mode - only show warnings and errors
python consolidate_workspace.py --quiet

# Verbose mode - show debug information
python consolidate_workspace.py --verbose

# Normal mode (default) - info level
python consolidate_workspace.py
```

#### Combined Usage Example
```bash
# Consolidate with redaction and custom output location
python consolidate_workspace.py \
    --output-dir ./consolidated_snapshots/ \
    --redact "API_KEY|SECRET|PASSWORD" \
    --verbose
```

### Output Structure

#### Per-Folder Files
Each workspace folder gets:
```
consolidat_<folder>.txt        - All code files merged
consolidat_<folder>_index.txt  - File index with statistics
```

#### Workspace Summary
```
README.md                      - Consolidation report with summary table
```

### Example Output

Console output example:
```
════════════════════════════════════════════════════════════════════════════════
WORKSPACE FILE CONSOLIDATION TOOL
════════════════════════════════════════════════════════════════════════════════
Started at: 2026-05-15 14:55:43

================================================================================
CONSOLIDATING: BACKEND
================================================================================
Consolidating 176 files...
  Consolidated: alembic/env.py (1234 bytes)
  Consolidated: alembic/script.py.mako (567 bytes)
  ... (many more files)
✅ Output file: consolidated_backend.txt
✅ Index file: consolidated_backend_index.txt

────────────────────────────────────────────────────────────────────────────────
Consolidated 176 files | Total size: 1.66 MB
────────────────────────────────────────────────────────────────────────────────

================================================================================
CONSOLIDATING: dashboard
================================================================================
Consolidating 245 files...
  Consolidated: src/api/axiosInterceptorInstance.ts (2456 bytes)
  Consolidated: src/app/layout.tsx (1234 bytes)
  ... (many more files)
✅ Output file: consolidated_dashboard.txt
✅ Index file: consolidated_dashboard_index.txt

────────────────────────────────────────────────────────────────────────────────
Consolidated 245 files | Total size: 2.09 MB
────────────────────────────────────────────────────────────────────────────────

================================================================================
CONSOLIDATING: SCRIPTS
================================================================================
Consolidating 14 files...
  Consolidated: consolidate_workspace.py (4567 bytes)
  ... (more files)
✅ Output file: consolidated_scripts.txt
✅ Index file: consolidated_scripts_index.txt

────────────────────────────────────────────────────────────────────────────────
Consolidated 14 files | Total size: 0.16 MB
────────────────────────────────────────────────────────────────────────────────

════════════════════════════════════════════════════════════════════════════════
CONSOLIDATION COMPLETE!
════════════════════════════════════════════════════════════════════════════════
Output directory: f:\2_PROJECTS\B2_CVP\cvp\cvp_scripts\consilidate_content
Folders consolidated: 3
Total files: 435
Total size: 3.91 MB
════════════════════════════════════════════════════════════════════════════════
```

### Generated README.md

The workspace README includes:
- Consolidation summary table (files per folder, sizes)
- List of all generated files per folder
- Instructions on how to use the consolidated files
- Important notes about .gitignore filtering and file sorting

Example content:
```markdown
# Workspace Consolidation Report

**Generated:** 2026-05-15 14:55:43

## Consolidation Summary

| Folder | Files | Size (MB) |
|--------|-------|----------|
| backend      |   176 |     1.66 |
| dashboard     |   245 |     2.09 |
| scripts      |    14 |     0.16 |
| **TOTAL** | **435** | **3.91** |

## Generated Files

### Backend
- `consolidated_backend.txt` - All code files consolidated
- `consolidated_backend_index.txt` - File structure and index

### dashboard
- `consolidated_dashboard.txt` - All code files consolidated
- `consolidated_dashboard_index.txt` - File structure and index

... (more folders)

## How to Use

1. **Browse Index Files:** Start with `consolidated_*_index.txt` for quick reference
2. **Review Code:** Open `consolidated_*.txt` for complete code review
3. **Search:** Use Ctrl+F to find specific code patterns or files
4. **Share:** Send consolidated files for code review or documentation

## Notes

- Original files remain unchanged
- Files matching `.gitignore` patterns are excluded
- Files are sorted alphabetically for reproducibility
- Non-code files are excluded (see CODE_EXTENSIONS in script)
```

### File Discovery Logic

The script discovers code files by:
1. **Walking directories recursively** from each workspace folder
2. **Filtering by extension** - only includes: `.py`, `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`, `.html`, `.json`, `.yaml`, `.yml`, `.md`, `.sql`
3. **Excluding directories** - automatically skips: `.git`, `__pycache__`, `node_modules`, `.pytest_cache`, `dist`, `build`, `.venv`, `venv`
4. **Matching .gitignore patterns** - excludes files matching patterns from `.gitignore`
5. **Error handling** - skips unreadable files with warnings

### Supported Code File Types

```python
CODE_EXTENSIONS = {
    '.py',      # Python files
    '.ts',      # TypeScript files
    '.tsx',     # TypeScript React files
    '.js',      # JavaScript files
    '.jsx',     # JavaScript React files
    '.css',     # Stylesheets
    '.scss',    # SCSS stylesheets
    '.html',    # HTML templates
    '.json',    # JSON config/data
    '.yaml',    # YAML config
    '.yml',     # YAML config
    '.md',      # Markdown documentation
    '.sql'      # SQL files
}
```

### Use Cases

#### 1. Regular Team Documentation
```bash
# Generate monthly workspace snapshot
python consolidate_workspace.py --output-dir ./snapshots/monthly_2026_05/
```

#### 2. Code Review Archive
```bash
# Create version-tagged consolidation
python consolidate_workspace.py \
    --output-dir ./code_reviews/v1.2.3/ \
    --verbose
```

#### 3. Secure Sharing (with Redaction)
```bash
# Remove all sensitive data before sharing with external team
python consolidate_workspace.py \
    --output-dir ./share_external/ \
    --redact "API_KEY|DATABASE|PASSWORD|SECRET|TOKEN" \
    --quiet
```

#### 4. Analysis & Statistics
```bash
# Generate complete workspace snapshot for analysis
python consolidate_workspace.py --output-dir ./workspace_analysis/
# Then review README.md and index files for statistics
```

### Comparison: consolidate_workspace.py vs Others

| Aspect | Workspace | All Scripts | Individual Scripts |
|--------|-----------|-------------|-------------------|
| Discovery | Auto walk | Predefined list | Predefined list |
| Folders handled | All 5 | 2 (dashboard+backend) | 1 (specific) |
| File count | Dynamic | Fixed (103+43) | Fixed |
| Output files | Multiple | Multiple | 1-2 |
| .gitignore | Automatic | Manual support | Manual support |
| Setup effort | None | Pre-create files | Pre-create files |
| Maintenance | None needed | Update file lists | Update file lists |
| Scalability | Excellent | Limited | Limited |

---

**Best Practices:**

1. **Regular Snapshots:** Run monthly to track project growth
   ```bash
   python consolidate_workspace.py --output-dir "./snapshots/$(date +%Y_%m)/"
   ```

2. **Secure Sharing:** Always redact before external sharing
   ```bash
   python consolidate_workspace.py --redact "KEY|SECRET|PASSWORD"
   ```

3. **Version Control:** Add output directory to `.gitignore`
   ```bash
   echo "consolidated_*.txt" >> .gitignore
   echo "README.md" >> .gitignore  # if in consolidation folder
   ```

4. **Archive:** Keep quarterly snapshots for documentation
   ```bash
   python consolidate_workspace.py --output-dir ./archives/Q2_2026/
   ```

5. **Review:** Always check README.md for summary before diving into code files
