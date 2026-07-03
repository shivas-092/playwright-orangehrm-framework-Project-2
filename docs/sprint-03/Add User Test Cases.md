# Admin Module - Add User Test Cases

## TC-ADMIN-ADD-001

### Title
Create New Admin User

### Preconditions
- Admin user logged in.
- Employee exists in PIM.

### Test Steps

1. Navigate to Admin.
2. Click Add.
3. Select User Role.
4. Select Employee Name.
5. Select Status.
6. Enter Username.
7. Enter Password.
8. Enter Confirm Password.
9. Click Save.

### Expected Result

- New Admin user is created successfully.
- Success toast is displayed.
- User appears in search results.

---

## TC-ADMIN-ADD-002

### Title
Create User With Existing Username

### Test Steps

1. Click Add.
2. Enter an already existing username.
3. Click Save.

### Expected Result

- Validation message is displayed.
- User is not created.

---

## TC-ADMIN-ADD-003

### Title
Mandatory Field Validation

### Test Steps

1. Click Add.
2. Leave all mandatory fields empty.
3. Click Save.

### Expected Result

- Required field validation messages are displayed.

---

## TC-ADMIN-ADD-004

### Title
Password Mismatch Validation

### Test Steps

1. Enter Password.
2. Enter different Confirm Password.
3. Click Save.

### Expected Result

- Password mismatch validation is displayed.

---

## TC-ADMIN-ADD-005

### Title
Employee Name Auto Suggestion

### Test Steps

1. Type employee name.
2. Select suggested employee.

### Expected Result

- Employee is selected successfully.

---

## TC-ADMIN-ADD-006

### Title
Cancel Add User

### Test Steps

1. Click Add.
2. Enter user details.
3. Click Cancel.

### Expected Result

- User is not created.
- Navigate back to System Users page.