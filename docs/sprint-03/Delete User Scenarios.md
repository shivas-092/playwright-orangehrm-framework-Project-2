# Admin Module - Delete User Test Scenarios

## Feature
Delete System User

## Module
Admin

## Preconditions
- User is logged in as Admin.
- Existing user available in System Users list.

---

## Test Scenarios

### TS-ADMIN-DELETE-001
Verify Admin can delete an existing system user.

### TS-ADMIN-DELETE-002
Verify confirmation dialog appears before deletion.

### TS-ADMIN-DELETE-003
Verify user is removed after confirming deletion.

### TS-ADMIN-DELETE-004
Verify Cancel button closes confirmation dialog without deleting user.

### TS-ADMIN-DELETE-005
Verify deleted user cannot be found through search.

### TS-ADMIN-DELETE-006
Verify success notification is displayed after deletion.