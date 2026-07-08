# Leave Module - Manual Test Cases

## TC_Leave_01 - Create Employee with Login Credentials

**Precondition:** Admin user should be logged in.

**Steps:**
1. Navigate to PIM module.
2. Click Add Employee.
3. Enter First Name and Last Name.
4. Enable Create Login Details.
5. Enter Username, Password, and Confirm Password.
6. Click Save.

**Expected Result:**  
Employee should be created successfully with login credentials.

---

## TC_Leave_02 - Add Leave Entitlement

**Precondition:** Employee should be created successfully.

**Steps:**
1. Navigate to Leave module.
2. Go to Entitlements.
3. Open Add Leave Entitlement page.
4. Select Individual Employee.
5. Enter and select Employee Name.
6. Select Leave Type.
7. Enter Entitlement days.
8. Click Save.
9. Click Confirm if confirmation popup appears.

**Expected Result:**  
Leave entitlement should be added successfully.

---

## TC_Leave_03 - Employee Login

**Precondition:** Employee login credentials should be created.

**Steps:**
1. Open OrangeHRM login page.
2. Enter employee username.
3. Enter employee password.
4. Click Login.

**Expected Result:**  
Employee should login successfully and land on Dashboard.

---

## TC_Leave_04 - Apply Leave

**Precondition:** Employee should have leave entitlement.

**Steps:**
1. Login as Employee.
2. Navigate to Leave module.
3. Open Apply Leave page.
4. Select Leave Type.
5. Enter From Date.
6. Enter To Date.
7. Enter comments.
8. Click Apply.

**Expected Result:**  
Leave should be applied successfully.

---

## TC_Leave_05 - Search Applied Leave

**Precondition:** Employee should have applied leave.

**Steps:**
1. Navigate to My Leave page.
2. Click Search.

**Expected Result:**  
Applied leave record should be displayed in the results table.

---

## TC_Leave_06 - Verify Applied Leave Exists

**Precondition:** Applied leave record should exist.

**Steps:**
1. Navigate to My Leave page.
2. Click Search.
3. Verify leave type in the result table.

**Expected Result:**  
Leave record with selected leave type should be visible.

---

## TC_Leave_07 - Cancel Applied Leave

**Precondition:** Applied leave record should be visible in My Leave.

**Steps:**
1. Navigate to My Leave page.
2. Click Search.
3. Locate the applied leave record.
4. Click Cancel.

**Expected Result:**  
Leave should be cancelled successfully.

---

## TC_Leave_08 - Verify Cancelled Leave Status

**Precondition:** Leave should be cancelled.

**Steps:**
1. Navigate to My Leave page.
2. Click Search.
3. Verify the status of the cancelled leave.

**Expected Result:**  
Leave status should be displayed as Cancelled.

---

## TC_Leave_09 - Complete Leave E2E Workflow

**Precondition:** Admin credentials should be available.

**Steps:**
1. Login as Admin.
2. Create employee with login credentials.
3. Add leave entitlement for employee.
4. Login as Employee.
5. Apply leave.
6. Search applied leave.
7. Verify leave exists.
8. Cancel leave.
9. Verify cancelled status.

**Expected Result:**  
Complete Leave workflow should be completed successfully.