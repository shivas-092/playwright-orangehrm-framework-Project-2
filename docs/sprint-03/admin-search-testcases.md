# Admin Module - Search User Test Cases

## TC-ADMIN-SEARCH-001

### Title
Search Existing User

### Preconditions
- Admin user logged in.
- Navigate to Admin > System Users.

### Test Steps

1. Enter existing username.
2. Click Search.

### Expected Result

- Matching user is displayed in the result table.

---

## TC-ADMIN-SEARCH-002

### Title
Search Non-existing User

### Preconditions

Admin user logged in.

### Test Steps

1. Enter invalid username.
2. Click Search.

### Expected Result

- No Records Found message is displayed.

---

## TC-ADMIN-SEARCH-003

### Title
Reset Search Filters

### Preconditions

Admin user logged in.

### Test Steps

1. Enter Username.
2. Click Reset.

### Expected Result

- Username field is cleared.
- Search filters are reset.

---

## TC-ADMIN-SEARCH-004

### Title
Multiple Consecutive Searches

### Preconditions

Admin user logged in.

### Test Steps

1. Search User A.
2. Search User B.

### Expected Result

- Latest search result is displayed correctly.

---

## TC-ADMIN-SEARCH-005

### Title
Search After Page Refresh

### Preconditions

Admin page opened.

### Test Steps

1. Refresh page.
2. Search existing user.

### Expected Result

- Search works successfully.