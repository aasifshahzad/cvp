# CVP Backend - Comprehensive Architecture Analysis

**Project**: Homeopathic Patient Management System (CVP Backend)  
**Analysis Date**: May 16, 2026  
**Python Version**: 3.12+  
**Framework**: FastAPI with SQLModel  

---

## 🎯 Executive Summary

This is a **production-grade, full-stack clinic management system** specifically designed for homeopathic practitioners. The backend provides a comprehensive RESTful API for managing patients, cases, appointments, prescriptions, medicines, and financial transactions with role-based access control.

### Key Characteristics
- **Domain**: Healthcare - Homeopathic Practice Management
- **Architecture**: Monolithic FastAPI application with modular route organization
- **Database**: PostgreSQL with SQLModel ORM
- **Authentication**: Dual authentication system (OAuth2 for staff/doctors, JWT Bearer for patients)
- **Deployment**: Docker-ready with Alembic migrations
- **Security**: Argon2 password hashing, role-based access control, rate limiting

---

## 📁 Project Structure Overview

```
cvp_backend/
├── api/                    # API layer - routing & dependencies
├── core/                   # Core configuration & security
├── models/                 # SQLModel database models
├── routes/                 # API endpoint implementations (17 modules)
├── utils/                  # Utility functions & services
├── scripts/                # Database seeding & maintenance scripts
├── tests/                  # Test suite
├── docs/                   # Comprehensive documentation (30+ files)
├── alembic/                # Database migrations
├── email-templates/        # MJML email templates
├── main.py                 # FastAPI application entry point
└── pyproject.toml          # Project dependencies
```

---

## 🏗️ Architecture Layers

### 1. **Entry Point Layer** (`main.py`)
- FastAPI application initialization
- CORS middleware configuration (production + development origins)
- Rate limiting with SlowAPI (100 requests/minute)
- Sentry integration for error tracking
- Custom OpenAPI schema with dual authentication
- Health check endpoints

**Key Features**:
- Custom unique ID generation for OpenAPI operations
- Dual security schemes (DoctorOAuth2 + PatientBearer)
- Comprehensive API documentation with role-based tags
- Rate limit exception handling

### 2. **Core Layer** (`core/`)

#### [`config.py`](core/config.py)
- Pydantic Settings for environment configuration
- Database connection settings (PostgreSQL)
- SMTP email configuration
- JWT token settings (8-day expiration)
- CORS origins management
- Security validation (enforces strong passwords, non-default secrets)

#### [`security.py`](core/security.py)
- **Password Hashing**: Argon2 (industry-standard, memory-hard)
- **JWT Token Creation**: HS256 algorithm
- Token payload includes: `sub` (user ID), `entity` (user/patient), `role`, `exp`
- Separate token creation for users and patients

#### [`db.py`](core/db.py)
- SQLModel engine initialization
- Database session management
- Initial superuser creation on startup

#### [`auth_utils.py`](core/auth_utils.py)
- Token decoding and validation
- Separate validation for user tokens vs patient tokens
- Custom authentication/authorization exceptions

### 3. **API Layer** (`api/`)

#### [`router.py`](api/router.py)
Central router aggregation - includes 17 route modules:
- **Core**: login, users, doctor_availability, public, utils, enums
- **Features**: appointments, cases, doctor_preferences, finance, followups, medicines, onsite_patient, onsite_consultation, patients, prescriptions, reports, web_content
- **Dev-only**: private (local environment only)

#### [`deps.py`](api/deps.py) - **Critical Dependency Injection**
Implements FastAPI dependency injection for authentication and authorization:

**Security Schemes**:
- `doctor_oauth2`: OAuth2PasswordBearer for doctors/staff/admin
- `patient_bearer`: HTTPBearer for patient authentication

**User Authentication Dependencies**:
- `get_current_user()`: Validates doctor/staff/admin tokens
- `get_current_active_superuser()`: Admin-only access
- `require_doctor_role()`: Doctor-only endpoints
- `require_staff_role()`: Staff-only endpoints
- `require_roles(*roles)`: Multi-role factory function

**Patient Authentication Dependencies**:
- `get_current_patient()`: Validates patient tokens
- `require_patient_ownership()`: Patient-specific checks

**Type Aliases** (for clean route signatures):
- `CurrentUser`, `DoctorUser`, `StaffUser`, `SuperUser`
- `CurrentPatient`, `SessionDep`

### 4. **Models Layer** (`models/`)

**17 Model Files** organized by domain:

| Model File | Purpose | Key Tables |
|------------|---------|------------|
| [`users_model.py`](models/users_model.py) | User management | User (doctors, staff, admin) |
| [`patients_model.py`](models/patients_model.py) | Patient records | Patient |
| [`cases_model.py`](models/cases_model.py) | Homeopathic case taking | PatientCase |
| [`appointments_model.py`](models/appointments_model.py) | Appointment scheduling | Appointment |
| [`prescriptions_model.py`](models/prescriptions_model.py) | Prescriptions | Prescription, PrescriptionMedicine |
| [`medicines_model.py`](models/medicines_model.py) | Medicine catalog | Medicine, DoctorMedicinePreference |
| [`followups_model.py`](models/followups_model.py) | Follow-up tracking | FollowUp |
| [`doctor_availability_model.py`](models/doctor_availability_model.py) | Doctor schedules | DoctorAvailability |
| [`doctor_availability_exception_model.py`](models/doctor_availability_exception_model.py) | Schedule exceptions | DoctorAvailabilityException |
| [`doctor_preferences_model.py`](models/doctor_preferences_model.py) | Doctor settings | DoctorCaseFieldPreference, DoctorCaseTemplate |
| [`enum_option_model.py`](models/enum_option_model.py) | Dynamic enumerations | EnumType, EnumOption, DoctorEnumPreference |
| [`finance_model.py`](models/finance_model.py) | Financial tracking | CashBook, FinanceTransaction, CustomFields |
| [`onsite_consultation_model.py`](models/onsite_consultation_model.py) | Walk-in consultations | SequenceCounter, OnsiteConsultationAudit |
| [`web_content_model.py`](models/web_content_model.py) | Website content | AboutDoctor, HeroSection, Services, Testimonials |
| [`audit_model.py`](models/audit_model.py) | Audit logging | (Audit trails) |
| [`reports_model.py`](models/reports_model.py) | Reporting schemas | (Response models) |
| [`login_model.py`](models/login_model.py) | Authentication schemas | TokenPayload, LoginResponse |

**Model Organization Strategy**:
- Base models (without relationships) imported first
- Table models imported in dependency order
- Prevents circular import issues
- All exports managed through [`__init__.py`](models/__init__.py)

### 5. **Routes Layer** (`routes/`)

**17 Route Modules** - Each handles a specific domain:

#### Core Routes
1. **[`login.py`](routes/login.py)** (450 lines)
   - User login (OAuth2 password flow)
   - Patient simple login (phone + password)
   - Password recovery & reset
   - Email verification
   - Session management

2. **[`users.py`](routes/users.py)** (1890 lines) ⚠️ **LARGE FILE**
   - User CRUD (admin-only)
   - Self-service profile management
   - User registration & approval workflow
   - Patient registration (simple & quick-access)
   - Doctor statistics
   - User approval system with audit trails

3. **[`public.py`](routes/public.py)** (316 lines)
   - Public doctor directory
   - Public availability checking
   - Public appointment booking

#### Feature Routes
4. **[`patients.py`](routes/patients.py)** (960 lines)
   - Patient CRUD operations
   - Patient statistics
   - Patient profile management (self-service)
   - Patient appointment viewing
   - Dual router: doctor-facing + patient-facing

5. **[`cases.py`](routes/cases.py)** (348 lines)
   - Homeopathic case management
   - Auto-generated case numbers
   - Custom field validation
   - Case-prescription linking

6. **[`appointments.py`](routes/appointments.py)** (848 lines)
   - Appointment CRUD
   - Availability validation
   - Today's & upcoming appointments
   - Status management (scheduled → confirmed → in progress → completed)
   - Patient booking endpoint

7. **[`prescriptions.py`](routes/prescriptions.py)** (758 lines)
   - Prescription creation with auto-numbering
   - Medicine quick-add capability
   - Auto follow-up scheduling
   - Prescription printing

8. **[`medicines.py`](routes/medicines.py)** (566 lines)
   - Global medicine catalog
   - Advanced search (kingdom, symptoms, rubrics)
   - Bulk medicine creation
   - Doctor favorites

9. **[`followups.py`](routes/followups.py)** (657 lines)
   - Follow-up tracking
   - Due follow-ups
   - Schedule next follow-up
   - Payment confirmation
   - Case closure

10. **[`finance.py`](routes/finance.py)** (1106 lines) ⚠️ **LARGE FILE**
    - Cash book management
    - Custom field definitions
    - Transaction CRUD with running balances
    - Financial summaries & reports
    - Automatic balance recalculation

11. **[`doctor_availability.py`](routes/doctor_availability.py)** (863 lines)
    - Weekly schedule management
    - Availability exceptions (holidays, breaks)
    - Slot checking
    - Calendar view
    - Bulk schedule creation

12. **[`doctor_preferences.py`](routes/doctor_preferences.py)** (474 lines)
    - Case field preferences
    - Custom field management
    - Field toggle (enable/disable)
    - Form type support (case, follow-up)

13. **[`enums.py`](routes/enums.py)** (473 lines)
    - Dynamic enumeration system
    - Admin enum type management
    - Doctor-specific enum options
    - Preference toggling
    - Enum validation

14. **[`onsite_consultation.py`](routes/onsite_consultation.py)** (807 lines)
    - Walk-in consultation workflow
    - Atomic transaction handling
    - Idempotency support
    - Auto-generated case/prescription numbers
    - Medicine resolution

15. **[`onsite_patient.py`](routes/onsite_patient.py)** (426 lines)
    - Patient search with fuzzy matching
    - Quick patient registration
    - Match scoring algorithm

16. **[`reports.py`](routes/reports.py)** (633 lines)
    - Patient history reports
    - Medicine usage analysis
    - Appointment statistics
    - Prescription analysis
    - Financial summaries
    - Expiry alerts

17. **[`web_content.py`](routes/web_content.py)** (1077 lines) ⚠️ **LARGE FILE**
    - About doctor section
    - Hero section management
    - Services & treatments
    - Patient testimonials
    - Contact information
    - Public & authenticated endpoints

18. **[`utils_routes.py`](routes/utils_routes.py)** (87 lines)
    - Test email sending
    - Verification email
    - Health check
    - System info (admin-only)

### 6. **Utils Layer** (`utils/`)

| File | Purpose |
|------|---------|
| [`crud.py`](utils/crud.py) | User CRUD operations, authentication |
| [`utils.py`](utils/utils.py) | Email sending, token generation |
| [`time.py`](utils/time.py) | Datetime helpers |
| [`enum_service.py`](utils/enum_service.py) | Enum management service |
| [`availability_service.py`](utils/availability_service.py) | Availability checking logic |
| [`backend_pre_start.py`](utils/backend_pre_start.py) | Database initialization |
| [`initial_data.py`](utils/initial_data.py) | Seed data creation |

### 7. **Scripts Layer** (`scripts/`)

Maintenance and setup scripts:
- `seed_enums.py`: Populate enum tables
- `seed_medicines.py`: Medicine catalog seeding
- `setup_onsite_consultation.py`: Onsite feature setup
- `clean_enum_options.py`: Data cleanup
- `fix_prescription_data.py`: Data migration
- `format.sh`, `lint.sh`, `test.sh`: Development tools

### 8. **Tests Layer** (`tests/`)

Test structure:
```
tests/
├── api/routes/          # Route tests
├── crud/                # CRUD operation tests
├── scripts/             # Script tests
└── utils/               # Utility tests
```

### 9. **Documentation Layer** (`docs/`)

**30+ Documentation Files** organized by feature:

#### Main Documentation
- `ALL_ENDPOINTS.md`: Complete endpoint reference
- `DOCUMENTATION_INDEX.md`: Documentation navigation
- `quick_reference_card.md`: Quick API reference

#### Feature-Specific Docs
- **Onsite Consultation**: 8 files (implementation guide, endpoints, workflows)
- **Enums**: 7 files (dynamic enum system, integration guides)
- **Finance**: 2 files (frontend integration guides)
- **Doctor Features**: Availability, preferences guides
- **Admin**: User management, approval workflows
- **Follow-ups**: Status workflow, scheduling

#### Technical Docs
- `auth_analysis.md`: Authentication system analysis
- `endpoint_role_mapping.md`: Role-based access mapping
- `DATETIME_FIXES_SUMMARY.md`: Datetime handling

---

## 🔐 Security Architecture

### Authentication System (Dual)

#### 1. **Doctor/Staff/Admin Authentication**
- **Type**: OAuth2 Password Bearer
- **Endpoint**: `POST /login/access-token`
- **Token**: JWT with `entity: "user"`
- **Storage**: User table
- **Roles**: admin, doctor, staff

#### 2. **Patient Authentication**
- **Type**: HTTP Bearer (JWT)
- **Endpoint**: `POST /login/patient-simple`
- **Token**: JWT with `entity: "patient"`
- **Storage**: Patient table
- **Login**: Phone number + password

### Authorization Levels

| Level | Access | Implementation |
|-------|--------|----------------|
| **Public** | No auth required | No dependency |
| **Patient** | Patient token | `CurrentPatient` dependency |
| **User** | Any authenticated user | `CurrentUser` dependency |
| **Doctor** | Doctor role only | `DoctorUser` dependency |
| **Staff** | Staff role only | `StaffUser` dependency |
| **Admin** | Superuser only | `SuperUser` dependency |

### Security Features
- **Password Hashing**: Argon2 (memory-hard, resistant to GPU attacks)
- **Token Expiration**: 8 days (configurable)
- **Rate Limiting**: 100 requests/minute per IP
- **CORS**: Whitelist-based origin control
- **SQL Injection**: Protected by SQLModel parameterization
- **Audit Trails**: User actions logged in audit tables

---

## 🗄️ Database Architecture

### Database: PostgreSQL (Neon)
- **Connection**: Pooled connection via psycopg
- **ORM**: SQLModel (Pydantic + SQLAlchemy)
- **Migrations**: Alembic

### Key Tables (20+)

#### Core Tables
- `user`: Doctors, staff, administrators
- `patient`: Patient records
- `patientcase`: Homeopathic case records
- `appointment`: Appointment scheduling
- `prescription`: Prescriptions
- `prescriptionmedicine`: Prescription-medicine junction
- `medicine`: Global medicine catalog
- `followup`: Follow-up visits

#### Feature Tables
- `doctoravailability`: Weekly schedules
- `doctoravailabilityexception`: Schedule exceptions
- `doctorcasefieldpreference`: Custom field preferences
- `enumtype`, `enumoption`: Dynamic enumerations
- `cashbook`, `financetransaction`: Financial tracking
- `sequencecounter`: Auto-numbering
- `onsiteconsultationaudit`: Onsite consultation logs

#### Web Content Tables
- `aboutdoctor`, `herosection`, `servicesandtreatments`
- `patientsuccessstories`, `contactinformation`

### Relationships
- **One-to-Many**: User → Patients, Patient → Cases, Case → Prescriptions
- **Many-to-Many**: Prescription ↔ Medicine (via PrescriptionMedicine)
- **Self-referential**: FollowUp → FollowUp (next follow-up)

---

## 🚀 Key Features

### 1. **Homeopathic-Specific Features**
- Miasm assessment in case taking
- Potency scale tracking (X, C, LM)
- Medicine kingdom classification (plant, mineral, animal)
- Modalities & concomitants recording
- Multiple prescription types (Constitutional, Classical, etc.)
- Medicine forms (Diskettes, SOM, Globules, etc.)

### 2. **Dynamic Enum System**
- Admin-defined enum types
- Doctor-specific enum preferences
- Semantic mapping for duplicates
- Sort order management
- Frontend integration ready

### 3. **Onsite Consultation Workflow**
- Walk-in patient registration
- Fuzzy patient matching
- Atomic consultation creation (patient + case + prescription + follow-up)
- Idempotency support
- Auto-generated numbering

### 4. **Financial Management**
- Multiple cash books per doctor
- Custom field definitions
- Running balance calculation
- Transaction categorization
- Soft delete support

### 5. **Doctor Availability**
- Weekly schedule management
- Time slot definitions
- Exception handling (holidays, breaks)
- Availability checking for appointments

### 6. **Reporting & Analytics**
- Patient history reports
- Medicine usage analysis
- Appointment statistics
- Financial summaries
- Expiry alerts

---

## 📊 API Statistics

### Endpoint Count by Module

| Module | Endpoints | Complexity |
|--------|-----------|------------|
| users | ~20 | High |
| patients | ~12 | Medium |
| appointments | ~10 | Medium |
| prescriptions | ~6 | Medium |
| cases | ~6 | Low |
| followups | ~8 | Medium |
| medicines | ~7 | Medium |
| finance | ~15 | High |
| doctor_availability | ~12 | Medium |
| enums | ~10 | Medium |
| reports | ~6 | Medium |
| web_content | ~24 | High |
| **Total** | **~150+** | - |

### HTTP Methods Distribution
- **GET**: ~60 endpoints (read operations)
- **POST**: ~50 endpoints (create operations)
- **PUT/PATCH**: ~25 endpoints (update operations)
- **DELETE**: ~15 endpoints (delete operations)

---

## 🔧 Technology Stack

### Core Dependencies
```toml
fastapi[standard] >= 0.124.2    # Web framework
sqlmodel >= 0.0.27              # ORM (Pydantic + SQLAlchemy)
alembic >= 1.17.2               # Database migrations
psycopg >= 3.3.2                # PostgreSQL driver
pydantic-settings >= 2.12.0     # Configuration management
```

### Security
```toml
argon2-cffi >= 25.1.0           # Password hashing
PyJWT >= 2.8.0                  # JWT tokens
passlib >= 1.7.4                # Password utilities
bcrypt >= 5.0.0                 # Backup hashing
```

### Utilities
```toml
emails >= 0.6                   # Email sending
pandas >= 2.3.3                 # Data analysis
slowapi >= 0.1.9                # Rate limiting
pytest >= 9.0.2                 # Testing
```

---

## 🎯 Design Patterns & Best Practices

### 1. **Dependency Injection**
- FastAPI's dependency system for authentication
- Reusable dependencies for common operations
- Type-annotated dependencies for IDE support

### 2. **Repository Pattern**
- CRUD operations centralized in `utils/crud.py`
- Separation of data access from business logic

### 3. **Service Layer**
- `enum_service.py`: Enum management logic
- `availability_service.py`: Availability checking logic
- Reusable business logic across routes

### 4. **DTO Pattern**
- Pydantic models for request/response validation
- Separate models for create, update, and public views
- Type safety throughout the application

### 5. **Error Handling**
- Custom exception classes (`AuthenticationError`, `AuthorizationError`)
- Consistent error responses
- HTTP status code standards

### 6. **Code Organization**
- Feature-based module organization
- Clear separation of concerns
- Modular route structure

---

## 🚦 Deployment Considerations

### Environment Variables Required
```env
# Database
POSTGRES_SERVER=
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DATABASE_URL=

# Security
SECRET_KEY=
FIRST_SUPERUSER=
FIRST_SUPERUSER_PASSWORD=

# Email
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
EMAILS_FROM_EMAIL=

# Application
PROJECT_NAME=
ENVIRONMENT=production
FRONTEND_HOST=
```

### Deployment Steps
1. Set environment variables
2. Run database migrations: `alembic upgrade head`
3. Seed initial data: `python -m utils.initial_data`
4. Start application: `uvicorn main:app`

### Docker Support
- `Dockerfile.disable`: Docker configuration (currently disabled)
- `.dockerignore`: Docker build exclusions
- `Procfile`: Process management for deployment

---

## 📈 Performance Considerations

### Optimizations
- **Database Indexing**: Primary keys, foreign keys indexed
- **Query Optimization**: SQLModel select statements with filters
- **Pagination**: Skip/limit parameters on list endpoints
- **Rate Limiting**: Prevents API abuse
- **Connection Pooling**: PostgreSQL connection pooling

### Scalability
- **Stateless Design**: JWT tokens (no server-side sessions)
- **Horizontal Scaling**: Can run multiple instances
- **Database Pooling**: Supports concurrent connections

---

## 🐛 Known Limitations & Technical Debt

### Large Files
Three files exceed 1000 lines:
1. `routes/users.py` (1890 lines) - Could be split into admin/self-service modules
2. `routes/finance.py` (1106 lines) - Could separate cash book and transaction logic
3. `routes/web_content.py` (1077 lines) - Could split by content type

### Potential Improvements
- Add caching layer (Redis) for frequently accessed data
- Implement background tasks (Celery) for email sending
- Add API versioning strategy
- Implement GraphQL for complex queries
- Add WebSocket support for real-time updates

---

## 📚 Documentation Quality

### Strengths
- **Comprehensive**: 30+ documentation files
- **Well-organized**: Clear index and navigation
- **Practical**: Includes curl examples and workflows
- **Role-specific**: Guides for different user types
- **Up-to-date**: Recent updates (March 2026)

### Documentation Coverage
- ✅ API endpoints documented
- ✅ Authentication flows explained
- ✅ Database schema documented
- ✅ Deployment guides available
- ✅ Feature-specific guides
- ✅ Troubleshooting sections

---

## 🎓 Learning Resources

### For New Developers
1. Start with [`README.md`](README.md) - System overview
2. Read [`docs/DOCUMENTATION_INDEX.md`](docs/DOCUMENTATION_INDEX.md) - Documentation navigation
3. Review [`api/deps.py`](api/deps.py) - Authentication system
4. Explore [`routes/`](routes/) - API implementations

### For Frontend Developers
1. [`docs/ALL_ENDPOINTS.md`](docs/ALL_ENDPOINTS.md) - Complete API reference
2. [`docs/ENUM/FRONTEND_QUICK_START.md`](docs/ENUM/FRONTEND_QUICK_START.md) - Enum integration
3. [`docs/FINANCE_FRONTEND_INTEGRATION_GUIDE.md`](docs/FINANCE_FRONTEND_INTEGRATION_GUIDE.md) - Finance features

### For DevOps
1. [`docs/ONSITE_QUICK_START.md`](docs/ONSITE_QUICK_START.md) - Deployment checklist
2. [`alembic/`](alembic/) - Database migrations
3. [`scripts/`](scripts/) - Maintenance scripts

---

## ✅ Conclusion

This is a **well-architected, production-ready backend system** with:
- ✅ Clear separation of concerns
- ✅ Comprehensive security implementation
- ✅ Extensive documentation
- ✅ Modular, maintainable code structure
- ✅ Domain-specific features for homeopathic practice
- ✅ Scalable architecture
- ✅ Professional error handling
- ✅ Thorough testing setup

### Recommended Next Steps
1. **Code Review**: Focus on the three large files for potential refactoring
2. **Performance Testing**: Load testing for production readiness
3. **Caching Strategy**: Implement Redis for frequently accessed data
4. **Monitoring**: Add application performance monitoring (APM)
5. **CI/CD**: Set up automated testing and deployment pipelines

---

**Analysis Completed**: May 16, 2026  
**Analyst**: Bob (Planning Mode)  
**Status**: ✅ Comprehensive Analysis Complete