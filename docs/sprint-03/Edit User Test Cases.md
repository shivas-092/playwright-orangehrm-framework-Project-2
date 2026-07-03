# Admin Module - Edit User Test Cases

## TC-ADMIN-EDIT-001

### Title
Edit Existing User Status

### Preconditions
- Admin user logged in.
- Existing user available.

### Test Steps

1. Navigate to Admin.
2. Search existing user.
3. Click Edit.
4. Change Status.
5. Click Save.

### Expected Result

- User details are updated successfully.
- Success notification is displayed.

---

## TC-ADMIN-EDIT-002

### Title
Update User Role

### Test Steps

1. Search user.
2. Click Edit.
3. Change User Role.
4. Click Save.

### Expected Result

- User Role is updated successfully.

---

## TC-ADMIN-EDIT-003

### Title
Cancel User Update

### Test Steps

1. Search user.
2. Click Edit.
3. Modify values.
4. Click Cancel.

### Expected Result

- Changes are discarded.

---

## TC-ADMIN-EDIT-004

### Title
Verify Updated User Information

### Test Steps

1. Search updated user.

### Expected Result

- Updated values are displayed correctly.

---

## TC-ADMIN-EDIT-005

### Title
Mandatory Field Validation During Edit

### Test Steps

1. Clear mandatory fields.
2. Click Save.

### Expected Result

- Validation messages are displayed.