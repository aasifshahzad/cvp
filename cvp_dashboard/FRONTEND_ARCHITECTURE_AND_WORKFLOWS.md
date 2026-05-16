# CVP Dashboard - Frontend Implementation & Workflow Analysis

## 🏗️ **Frontend Architecture**

### **Technology Stack**

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: TanStack Router (file-based routing)
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI + Tailwind CSS 4
- **Form Handling**: React Hook Form + Zod validation
- **API Client**: Auto-generated from OpenAPI spec using @hey-api/openapi-ts

### **Project Structure**

```
cvp_dashboard/src/
├── client/          # Auto-generated API client from OpenAPI
├── components/      # React components organized by feature
│   ├── Admin/       # User management
│   ├── Appointments/
│   ├── Cases/
│   ├── Prescriptions/
│   ├── Medicines/
│   ├── Followups/
│   ├── Patients/
│   ├── Onsite/      # Walk-in patient workflow
│   ├── Finance/
│   ├── DoctorAvailability/
│   ├── DoctorPreferences/
│   ├── WebContent/
│   ├── Common/      # Shared components
│   └── ui/          # Shadcn UI components
├── routes/          # File-based routing
├── hooks/           # Custom React hooks
├── lib/             # Utilities (enum parsing, etc.)
└── services/        # API service wrappers
```

---

## 👥 **User Roles & Access Control**

### **1. Doctor Role** (`role: "doctor"` or `is_doctor: true`)

**Full Access to:**

- Dashboard (statistics & finance overview)
- Onsite Patient Management
- Patient Records
- Appointments
- Cases
- Prescriptions
- Follow-ups
- Reports
- Availability Management
- Remedies (Medicines)
- Web Content Management
- Finance Tracking
- Core Settings (Custom Fields & Enums)

**Sidebar Menu Order:**

1. Dashboard
2. Onsite
3. Patient
4. Appointments
5. Cases
6. Prescriptions
7. Follow-ups
8. Reports
9. Availability
10. Remedies
11. Content
12. Finance
13. Core Settings

### **2. Superuser/Admin** (`is_superuser: true`)

**Access to:**

- Dashboard (basic view)
- Admin Panel (User Management)
- All doctor features if also marked as doctor

### **3. Regular Users**

- Limited dashboard access
- No specialized features

---

## 🔄 **Application Workflows**

### **A. Authentication Flow**

1. **Login** → JWT token stored in localStorage
2. **Token Validation** → Automatic on API calls via OpenAPI client
3. **Auto-logout** → On 401/403 errors
4. **Protected Routes** → `_layout.tsx` checks `isLoggedIn()` before rendering

**Implementation:**

```typescript
// main.tsx
OpenAPI.BASE = import.meta.env.VITE_API_URL;
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || "";
};

// Error handling
const handleApiError = (error: Error) => {
  if (error instanceof ApiError && [401, 403].includes(error.status)) {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }
};
```

### **B. Onsite Patient Workflow** (Walk-in Consultation)

**4-Step Process:**

#### **Step 1: Search Patient**

- Search by phone number or name
- Real-time search results
- Options:
  - Select existing patient → Go to Step 3
  - Register new patient → Go to Step 2

#### **Step 2: Register (if new)**

- Quick registration form
- Required fields:
  - Full name
  - Phone number
  - Date of birth
  - Gender
- Optional fields:
  - Email
  - Address
  - City
- On success → Go to Step 3

#### **Step 3: Review Patient**

- Display patient information
- Show patient history:
  - Recent cases
  - Recent prescriptions
  - Recent appointments
- Actions:
  - Back to search
  - Proceed to consultation → Go to Step 4

#### **Step 4: Consultation**

**Single Atomic Operation Creates:**

1. Appointment record
2. Case record
3. Prescription with medicines
4. Follow-up schedule (optional)

**Form Fields:**

- Chief complaint
- Complaint duration
- Medicines (existing or quick-add)
- Instructions
- Dietary restrictions
- Follow-up date

**On Success:**

- Shows consultation summary
- Displays created records
- Option to start new consultation

### **C. Standard Patient Management Flow**

```
Patient → Appointment → Case → Prescription → Follow-up
```

**Guided Flow with URL Parameters:**

#### **Appointment → Case Flow**

```
/cases?openAdd=true&flow=appointment-to-case&patientId=X&appointmentId=Y
```

- Pre-fills patient information
- Links to appointment
- Streamlined case creation

#### **Case → Prescription Flow**

```
/prescriptions?openAdd=true&flow=case-to-prescription&caseId=X
```

- Pre-fills case information
- Streamlined prescription creation
- Suggests follow-up creation

### **D. Prescription Creation Workflow**

#### **Step 1: Select Case**

- Searchable dropdown of all cases
- Shows: Patient name, case number, chief complaint
- Required field

#### **Step 2: Set Prescription Details**

- **Prescription Type** (from PrescriptionType enum)
- **Prescription Duration** (text input, e.g., "7 days")
- **Status** (from PrescriptionStatus enum)

#### **Step 3: Add Medicines**

Two modes for each medicine:

**Mode A: Use from Catalog**

- Select existing medicine from searchable dropdown
- Shows: Name, Potency, Scale, Form
- Set quantity prescribed
- Set frequency (from RepetitionEnum)

**Mode B: Quick Add New**

- Medicine name (required)
- Potency (required)
- Scale (from ScaleEnum)
- Form (from FormEnum)
- Manufacturer (from ManufacturerEnum)
- Description (optional)
- Quantity prescribed
- Frequency (from RepetitionEnum)

**Multiple Medicines:**

- Add unlimited medicines
- Remove medicines (minimum 1 required)
- Mix catalog and quick-add medicines

#### **Step 4: Additional Information**

- Instructions (textarea)
- Follow-up advice (textarea)
- Follow-up date (date picker)
- Dietary restrictions (textarea)
- Lifestyle avoidance (textarea)
- Additional notes (textarea)

#### **Step 5: Submit**

- Validates all required fields
- Creates prescription
- Creates medicines (if quick-added)
- Creates follow-up schedule (if date provided)
- Shows success message
- Invalidates related queries

### **E. Enum-Driven Dropdowns** (Database-Driven)

**All dropdowns fetch from API:**

```
GET /enums/doctor/{enum_type_key}
```

**Enum Types Used:**

| Enum Type            | Used In       | Purpose                                    |
| -------------------- | ------------- | ------------------------------------------ |
| `AppointmentStatus`  | Appointments  | Scheduled, Confirmed, Completed, Cancelled |
| `ConsultationType`   | Appointments  | In-person, Video, Phone                    |
| `FollowupStatus`     | Follow-ups    | Pending, Completed, Cancelled              |
| `CaseStatus`         | Cases         | Open, In Progress, Closed                  |
| `ExceptionType`      | Availability  | Holiday, Emergency, Personal Leave, etc.   |
| `PrescriptionType`   | Prescriptions | Acute, Chronic, Preventive                 |
| `PrescriptionStatus` | Prescriptions | Open, Completed, Cancelled                 |
| `RepetitionEnum`     | Medicines     | Once daily, Twice daily, As needed, etc.   |
| `ScaleEnum`          | Medicines     | CH, X, LM, Q                               |
| `FormEnum`           | Medicines     | Tablet, Liquid, Pellets, Cream, etc.       |
| `ManufacturerEnum`   | Medicines     | Various manufacturers                      |

**Enum Parsing Logic** (`lib/doctorEnums.ts`):

```typescript
export interface DoctorEnumOption {
  value: string;
  label: string;
  isActive: boolean;
  sortOrder: number;
}

export const parseDoctorEnumOptions = (data: unknown): DoctorEnumOption[]
```

**Features:**

- Flexible parsing (handles various API response formats)
- Filters only active enums (`is_active: true`)
- Sorts by `sort_order` then alphabetically
- Converts snake_case to readable labels
- Handles nested data structures

**Usage Example:**

```typescript
const { data: repetitionData } = useQuery({
  queryKey: ["doctor-enum", "RepetitionEnum"],
  queryFn: () => EnumsService.readDoctorEnum("RepetitionEnum"),
})

const repetitionOptions = parseDoctorEnumOptions(repetitionData)

// Render in select
<Select>
  {repetitionOptions.map((option) => (
    <SelectItem key={option.value} value={option.value}>
      {option.label}
    </SelectItem>
  ))}
</Select>
```

### **F. Custom Fields System**

**Dynamic Form Fields for Cases and Follow-ups:**

#### **Features:**

- Doctors can add custom fields via Core Settings
- Fields stored in `DoctorPreferences` table
- Rendered dynamically in forms
- Validation based on field configuration

#### **Field Types:**

- **Text Input**: Single-line text
- **Textarea**: Multi-line text

#### **Field Properties:**

- `field_name`: Internal identifier (snake_case)
- `display_name`: User-facing label
- `field_type`: "text" or "textarea"
- `is_required`: Boolean
- `is_enabled`: Boolean (show/hide)
- `form_type`: "cases" or "followups"

#### **Implementation:**

```typescript
// Fetch preferences
const { data: preferencesData } = useQuery({
  queryKey: ["doctor-preferences"],
  queryFn: () => DoctorPreferencesService.getFields(),
})

// Render dynamic fields
{preferencesData?.map((customField) => (
  <FormField
    key={customField.field_name}
    name={customField.field_name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          {customField.display_name}
          {customField.is_required && <span>*</span>}
        </FormLabel>
        <FormControl>
          {customField.field_type === 'textarea' ? (
            <Textarea {...field} />
          ) : (
            <Input {...field} />
          )}
        </FormControl>
      </FormItem>
    )}
  />
))}
```

#### **Storage:**

- Custom field values stored in `custom_fields` JSON column
- Flexible schema (no database migrations needed)
- Easy to add/remove fields

---

## 🔌 **API Integration**

### **Client Generation**

**Command:**

```bash
npm run generate-client
```

**Process:**

1. Backend generates `openapi.json`
2. Frontend downloads it
3. `@hey-api/openapi-ts` generates TypeScript client
4. Output: `src/client/` directory

**Generated Files:**

- `types.gen.ts` - TypeScript interfaces
- `sdk.gen.ts` - Service classes
- `schemas.gen.ts` - JSON schemas
- Individual service files (e.g., `PatientsService.ts`)

### **API Configuration**

**Environment Variables:**

```env
VITE_API_URL=https://api.example.com
```

**OpenAPI Setup:**

```typescript
import { OpenAPI } from "./client";

OpenAPI.BASE = import.meta.env.VITE_API_URL;
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || "";
};
```

### **Query Management with TanStack Query**

**Features:**

- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states

**Example:**

```typescript
// Query
const { data, isLoading, error } = useQuery({
  queryKey: ["patients"],
  queryFn: () => PatientsService.readPatients({ skip: 0, limit: 100 }),
});

// Mutation
const mutation = useMutation({
  mutationFn: (data: PatientCreate) =>
    PatientsService.createPatient({ requestBody: data }),
  onSuccess: () => {
    showSuccessToast("Patient created");
    queryClient.invalidateQueries({ queryKey: ["patients"] });
  },
  onError: handleError,
});
```

**Query Keys Convention:**

- `["patients"]` - All patients
- `["patients", patientId]` - Single patient
- `["doctor-enum", "RepetitionEnum"]` - Specific enum
- `["doctor-preferences"]` - Doctor preferences

---

## 📊 **Dashboard Statistics**

### **Doctor Dashboard Components**

#### **1. Patient Metrics**

```typescript
<StatCard
  title="Total Patients"
  value={stats.total_patients}
  icon={<Users />}
  description="Patients under your care"
/>
```

**Metrics:**

- Total Patients
- Total Cases
- Total Appointments
- Total Prescriptions

#### **2. Finance Summary**

```typescript
<StatCard
  title="Total Income"
  value={formatCurrency(financeSummary.total_cash_in)}
  icon={<Wallet />}
  description="All cash books combined"
/>
```

**Metrics:**

- Total Income (PKR)
- Total Expenses (PKR)
- Net Balance (PKR)
- Transaction Count

#### **3. Operational Metrics**

```typescript
<StatCard
  title="Upcoming Appointments"
  value={stats.upcoming_appointments}
  icon={<CalendarClock />}
  description="Scheduled for today or later"
/>
```

**Metrics:**

- Upcoming Appointments
- Pending Follow-ups
- Low Stock Items
- Revenue This Month

### **Data Sources**

**API Endpoints:**

```typescript
// Statistics
GET / doctor - statistics / stats;

// Finance Summary
GET / finance / doctor - summary;
```

**Suspense Loading:**

```typescript
function DoctorStats() {
  return (
    <Suspense fallback={<StatsLoadingSkeleton />}>
      <DoctorStatsContent />
    </Suspense>
  )
}
```

---

## 🎨 **UI/UX Features**

### **Component Library**

#### **DataTable Component**

**Features:**

- Sortable columns
- Pagination
- Row actions menu
- Empty states
- Loading skeletons

**Usage:**

```typescript
<DataTable
  columns={columns}
  data={patients}
/>
```

#### **SearchableSelect Component**

**Features:**

- Autocomplete search
- Keyboard navigation
- Empty state message
- Custom placeholder

**Usage:**

```typescript
<SearchableSelect
  options={patients.map(p => ({ value: p.id, label: p.name }))}
  value={selectedId}
  onValueChange={setSelectedId}
  placeholder="Search patients..."
  searchPlaceholder="Type to search..."
  emptyMessage="No patients found."
/>
```

#### **Dialog Modals**

**Features:**

- Responsive sizing
- Scroll handling
- Close on escape
- Backdrop click

**Usage:**

```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Add Patient</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Patient</DialogTitle>
    </DialogHeader>
    {/* Form content */}
  </DialogContent>
</Dialog>
```

#### **Toast Notifications**

**Features:**

- Success/Error/Info types
- Auto-dismiss
- Rich colors
- Close button

**Usage:**

```typescript
const { showSuccessToast, showErrorToast } = useCustomToast();

showSuccessToast("Patient created successfully");
showErrorToast("Failed to create patient");
```

### **Search & Filter**

**Client-Side Search:**

```typescript
const filteredPatients = useMemo(() => {
  if (!searchQuery.trim()) return patients.data;

  const query = searchQuery.toLowerCase();
  return patients.data.filter((patient) => {
    return (
      patient.full_name?.toLowerCase().includes(query) ||
      patient.email?.toLowerCase().includes(query) ||
      patient.phone?.toLowerCase().includes(query)
    );
  });
}, [patients.data, searchQuery]);
```

**Search UI:**

```typescript
<div className="relative">
  <Search className="absolute left-2 top-2.5 h-4 w-4" />
  <Input
    placeholder="Search by name, email, phone..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-8"
  />
</div>
```

### **Responsive Design**

**Sidebar:**

- Collapsible on mobile
- Icon-only mode
- Smooth transitions

**Tables:**

- Horizontal scroll on mobile
- Responsive columns
- Touch-friendly actions

**Forms:**

- Stack on mobile
- Grid on desktop
- Adaptive spacing

### **Dark Mode**

**Implementation:**

```typescript
<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <App />
</ThemeProvider>
```

**Toggle:**

```typescript
<SidebarAppearance />
```

---

## 🔧 **Core Settings Management**

### **Three Tabs:**

#### **1. Case Fields Tab**

**Features:**

- View all case form fields
- Initialize standard fields (first-time setup)
- Add custom fields
- Edit field properties
- Toggle field visibility
- Delete custom fields

**Standard Fields:**

- Chief Complaint (Patient)
- Chief Complaint Duration
- Additional system fields

**Custom Fields:**

- Doctor-defined fields
- Text or textarea type
- Required/optional flag

#### **2. Follow-up Fields Tab**

**Features:**

- Same as Case Fields
- Separate field set for follow-ups
- Independent configuration

**Standard Fields:**

- Follow-up date
- Follow-up notes
- Status

#### **3. Dropdown Options (Enums) Tab**

**Features:**

- Manage all enum types
- Add new enum options
- Edit existing options
- Set active/inactive status
- Set sort order
- Delete options

**Enum Management:**

```typescript
<EnumManagement />
```

**Operations:**

- Select enum type from dropdown
- View all options for selected type
- Add new option with label and value
- Edit option properties
- Toggle active status
- Reorder options

---

## 📝 **Key Implementation Details**

### **Form Validation with Zod**

**Schema Definition:**

```typescript
const formSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  chief_complaint: z.string().min(1, "Chief complaint is required"),
  duration: z.string().min(1, "Duration is required"),
});

type FormData = z.infer<typeof formSchema>;
```

**Form Setup:**

```typescript
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  mode: "onBlur",
  defaultValues: {
    patient_id: "",
    chief_complaint: "",
    duration: "",
  },
});
```

**Validation Features:**

- Real-time validation
- Field-level error messages
- Required field indicators
- Custom error messages

### **Error Handling**

**Global Error Handler:**

```typescript
const handleApiError = (error: Error) => {
  if (error instanceof ApiError && [401, 403].includes(error.status)) {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleApiError }),
  mutationCache: new MutationCache({ onError: handleApiError }),
});
```

**Component-Level Error Handling:**

```typescript
const mutation = useMutation({
  mutationFn: createPatient,
  onSuccess: () => {
    showSuccessToast("Patient created");
  },
  onError: (error) => {
    handleError.call(showErrorToast, error);
  },
});
```

### **State Persistence**

**LocalStorage Usage:**

- JWT token: `access_token`
- Theme preference: `vite-ui-theme`

**No Global State Library:**

- TanStack Query handles server state
- React hooks handle local state
- No Redux/Zustand needed

### **Code Quality Tools**

**Biome (Linter & Formatter):**

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "indentStyle": "space"
  }
}
```

**TypeScript Configuration:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### **Component Architecture**

**Separation of Concerns:**

```
Component/
├── AddComponent.tsx      # Create form
├── EditComponent.tsx     # Update form
├── DeleteComponent.tsx   # Delete confirmation
├── ViewComponent.tsx     # Detail view
├── columns.tsx           # Table columns
└── ActionsMenu.tsx       # Row actions
```

**Reusable Patterns:**

- Form components with validation
- Table components with actions
- Modal dialogs for CRUD operations
- Loading states with skeletons
- Empty states with illustrations

---

## 🚀 **Development Workflow**

### **Local Development**

**Start Dev Server:**

```bash
npm run dev
```

- Runs on port 3000
- Hot module replacement
- Fast refresh

**Generate API Client:**

```bash
npm run generate-client
```

- Downloads openapi.json from backend
- Generates TypeScript client
- Updates type definitions

**Lint & Format:**

```bash
npm run lint
```

- Runs Biome linter
- Auto-fixes issues
- Formats code

**Build for Production:**

```bash
npm run build
```

- TypeScript compilation
- Vite build
- Output: `dist/` directory

### **Docker Deployment**

**Dockerfile (Multi-stage):**

```dockerfile
# Stage 1: Build
FROM node:24 AS build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG VITE_API_URL
RUN npm run build

# Stage 2: Serve
FROM nginx:1
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
```

**Nginx Configuration:**

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html =404;
  }
}
```

**Environment Variables:**

- `VITE_API_URL`: Backend API URL
- Set at build time

### **Testing**

**Playwright E2E Tests:**

```bash
npx playwright test
```

**Test Structure:**

```
tests/
├── auth.setup.ts       # Authentication setup
└── *.spec.ts          # Test files
```

---

## 📚 **Best Practices**

### **1. Type Safety**

- Use TypeScript for all code
- Leverage auto-generated types from OpenAPI
- Avoid `any` type
- Use Zod for runtime validation

### **2. Performance**

- Use React.memo for expensive components
- Implement code splitting with lazy loading
- Optimize images and assets
- Use Suspense for data fetching

### **3. Accessibility**

- Use semantic HTML
- Provide ARIA labels
- Keyboard navigation support
- Screen reader friendly

### **4. Security**

- Store JWT in localStorage (consider httpOnly cookies for production)
- Validate all user inputs
- Sanitize data before rendering
- Use HTTPS in production

### **5. Code Organization**

- Group by feature, not by type
- Keep components small and focused
- Extract reusable logic to hooks
- Use consistent naming conventions

---

## 🔍 **Troubleshooting**

### **Common Issues**

#### **API Connection Failed**

- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check CORS configuration

#### **Authentication Errors**

- Clear localStorage
- Check token expiration
- Verify backend JWT configuration

#### **Type Errors After API Changes**

- Regenerate client: `npm run generate-client`
- Restart dev server
- Check TypeScript errors

#### **Build Failures**

- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node -v` (should be 24)
- Verify all dependencies are installed

---

## 📌 **Summary**

The CVP Dashboard is a **modern, type-safe, role-based medical practice management system** with:

✅ **Doctor-centric workflows** (onsite consultations, prescriptions, follow-ups)  
✅ **Database-driven enums** (no hardcoded dropdowns)  
✅ **Dynamic custom fields** (extensible forms)  
✅ **Guided multi-step flows** (appointment → case → prescription)  
✅ **Real-time statistics** (dashboard with finance integration)  
✅ **Responsive UI** (Radix UI + Tailwind CSS)  
✅ **Type-safe API** (auto-generated from OpenAPI)  
✅ **Role-based access** (doctor, admin, user)

### **Architecture Highlights**

1. **File-based Routing**: TanStack Router for intuitive navigation
2. **Server State Management**: TanStack Query for caching and synchronization
3. **Form Handling**: React Hook Form + Zod for validation
4. **UI Components**: Radix UI primitives with Tailwind styling
5. **API Integration**: Auto-generated TypeScript client from OpenAPI spec
6. **Enum System**: Database-driven dropdowns with flexible parsing
7. **Custom Fields**: Dynamic form fields without schema changes
8. **Guided Flows**: URL-based navigation for multi-step processes

### **Developer Experience**

- **Type Safety**: End-to-end TypeScript with auto-generated types
- **Hot Reload**: Fast development with Vite HMR
- **Code Quality**: Biome for linting and formatting
- **Testing**: Playwright for E2E tests
- **Documentation**: Inline comments and comprehensive docs

### **User Experience**

- **Intuitive Navigation**: Clear sidebar with role-based menus
- **Search & Filter**: Real-time search on all list views
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: System preference or manual toggle
- **Toast Notifications**: Clear feedback for all actions
- **Loading States**: Skeleton loaders for better perceived performance

The architecture emphasizes **developer experience** (TypeScript, auto-generation), **user experience** (guided flows, search), and **maintainability** (component-based, enum-driven).
