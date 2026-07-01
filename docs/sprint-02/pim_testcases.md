# Sprint 2 - PIM Module Test Cases

## TC_PIM_001 - Navigate to PIM Module

**Precondition:** Admin user is logged in.

**Steps:**
1. Open OrangeHRM dashboard.
2. Click PIM from sidebar.

**Expected Result:**
User should navigate to Employee List page.

---

## TC_PIM_002 - Open Add Employee Page

**Precondition:** Admin user is on PIM page.

**Steps:**
1. Click Add button.

**Expected Result:**
Add Employee page should be displayed.

---

## TC_PIM_003 - Add New Employee

**Precondition:** Admin user is on Add Employee page.

**Steps:**
1. Enter First Name.
2. Enter Last Name.
3. Enter unique Employee ID.
4. Click Save.

**Expected Result:**
Employee should be created and Personal Details page should be displayed.

---

## TC_PIM_004 - Search Employee by Employee ID

**Precondition:** Employee is created successfully.

**Steps:**
1. Navigate to Employee List.
2. Enter Employee ID.
3. Click Search.

**Expected Result:**
Created employee should be displayed in search results.

---

## TC_PIM_005 - Open Employee Details

**Precondition:** Employee is available in search results.

**Steps:**
1. Click on employee record.

**Expected Result:**
Employee Personal Details page should be opened.

---

## TC_PIM_006 - Edit Employee Gender

**Precondition:** Admin user is on Personal Details page.

**Steps:**
1. Select Gender.
2. Click Save.

**Expected Result:**
Selected gender should be saved successfully.

---

## TC_PIM_007 - Delete Employee

**Precondition:** Employee exists in Employee List.

**Steps:**
1. Search employee by Employee ID.
2. Select employee checkbox.
3. Click Delete.
4. Confirm delete.

**Expected Result:**
Employee should be deleted successfully.