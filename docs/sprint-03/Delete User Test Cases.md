# Admin Module - Delete User Test Cases

## TC-ADMIN-DELETE-001

### Title
Delete Existing User

### Preconditions
- Admin user logged in.
- Existing user available.

### Test Steps

1. Navigate to Admin.
2. Search existing user.
3. Click Delete.
4. Confirm deletion.

### Expected Result

- User is deleted successfully.
- Success notification is displayed.

---

## TC-ADMIN-DELETE-002

### Title
Cancel User Deletion

### Test Steps

1. Click Delete.
2. Click Cancel.

### Expected Result

- User remains available.

---

## TC-ADMIN-DELETE-003

### Title
Verify Deleted User Cannot Be Searched

### Test Steps

1. Search deleted username.

### Expected Result

- No Records Found is displayed.

---

## TC-ADMIN-DELETE-004

### Title
Verify Delete Confirmation Dialog

### Test Steps

1. Click Delete.

### Expected Result

- Confirmation popup is displayed.

---

## TC-ADMIN-DELETE-005

### Title
Verify Success Notification After Delete

### Test Steps

1. Delete user.

### Expected Result

- Success notification is displayed.