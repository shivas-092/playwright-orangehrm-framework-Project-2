# Admin Module - Add User Test Scenarios

## Feature
Add System User

## Module
Admin

## Preconditions
- User is logged in as Admin.
- User is on the Admin > System Users page.
- Employee already exists in the PIM module.

---

## Test Scenarios

### TS-ADMIN-ADD-001
Verify Admin can create a new system user with valid details.

### TS-ADMIN-ADD-002
Verify unique username can be created successfully.

### TS-ADMIN-ADD-003
Verify Admin Role can be selected.

### TS-ADMIN-ADD-004
Verify User Status can be selected.

### TS-ADMIN-ADD-005
Verify employee name auto-suggestion works correctly.

### TS-ADMIN-ADD-006
Verify password and confirm password accept matching values.

### TS-ADMIN-ADD-007
Verify newly created user appears in the System Users list.

### TS-ADMIN-ADD-008
Verify Save button creates the user successfully.

### TS-ADMIN-ADD-009
Verify Cancel button navigates back without creating a user.

### TS-ADMIN-ADD-010
Verify mandatory field validation messages are displayed when required fields are empty.