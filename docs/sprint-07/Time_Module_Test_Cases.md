# Sprint 7 – Time Module Test Cases

## Module

**OrangeHRM Time Module – Project Information**

## Preconditions

- OrangeHRM application is available.
- The admin user has valid login credentials.
- Authentication setup has generated a valid storage-state file.
- The admin user has permission to manage customers and projects.
- At least one valid employee is available to select as Project Admin.

---

## Test Cases

### TC_TIME_001 – Navigate to Customers Page

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_001 |
| Title | Verify admin user can navigate to the Customers page |
| Priority | High |
| Type | Functional / Navigation |
| Automation Status | Automated |
| Preconditions | Admin user is logged in |
| Test Data | Not applicable |
| Steps | 1. Open the Time module.<br>2. Open Project Info.<br>3. Select Customers. |
| Expected Result | The Customers page should open successfully and display the customer records section. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_002 – Open Add Customer Form

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_002 |
| Title | Verify admin user can open the Add Customer form |
| Priority | High |
| Type | Functional |
| Automation Status | Automated |
| Preconditions | Admin user is on the Customers page |
| Test Data | Not applicable |
| Steps | 1. Click the Add button.<br>2. Observe the displayed form. |
| Expected Result | The Add Customer form should be displayed with Name and Description fields and a Save button. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_003 – Create Customer with Valid Details

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_003 |
| Title | Verify admin user can create a customer with valid details |
| Priority | High |
| Type | Positive / Functional |
| Automation Status | Automated |
| Preconditions | Add Customer form is open |
| Test Data | Customer Name: Dynamically generated value<br>Description: Sprint 7 customer description |
| Steps | 1. Enter a unique customer name.<br>2. Enter a valid description.<br>3. Click Save. |
| Expected Result | The customer should be created successfully and the application should return to the Customers page. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_004 – Verify Created Customer in Table

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_004 |
| Title | Verify newly created customer is displayed in the customer table |
| Priority | High |
| Type | Functional / Verification |
| Automation Status | Automated |
| Preconditions | A new customer has been created |
| Test Data | Newly generated customer name |
| Steps | 1. Return to or remain on the Customers page.<br>2. Locate the customer table.<br>3. Search for the newly created customer name. |
| Expected Result | A customer record containing the generated customer name should be visible. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_005 – Customer Name Required Validation

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_005 |
| Title | Verify validation when customer name is blank |
| Priority | High |
| Type | Negative / Validation |
| Automation Status | Manual Reference |
| Preconditions | Add Customer form is open |
| Test Data | Customer Name: Blank<br>Description: Valid description |
| Steps | 1. Leave the Name field blank.<br>2. Enter a description.<br>3. Click Save. |
| Expected Result | The customer should not be saved and a required-field validation message should be displayed. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_006 – Duplicate Customer Validation

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_006 |
| Title | Verify handling of a duplicate customer name |
| Priority | Medium |
| Type | Negative / Data Validation |
| Automation Status | Manual Reference |
| Preconditions | A customer with the selected name already exists |
| Test Data | Existing customer name |
| Steps | 1. Open the Add Customer form.<br>2. Enter an existing customer name.<br>3. Enter a valid description.<br>4. Click Save. |
| Expected Result | The application should prevent duplicate creation or display an appropriate duplicate-record message. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_007 – Navigate to Projects Page

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_007 |
| Title | Verify admin user can navigate to the Projects page |
| Priority | High |
| Type | Functional / Navigation |
| Automation Status | Automated |
| Preconditions | Admin user is logged in |
| Test Data | Not applicable |
| Steps | 1. Open the Time module.<br>2. Open Project Info.<br>3. Select Projects. |
| Expected Result | The Projects page should open and display the project search and records sections. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_008 – Open Add Project Form

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_008 |
| Title | Verify admin user can open the Add Project form |
| Priority | High |
| Type | Functional |
| Automation Status | Automated |
| Preconditions | Admin user is on the Projects page |
| Test Data | Not applicable |
| Steps | 1. Click the Add button.<br>2. Observe the displayed form. |
| Expected Result | The Add Project form should appear with Customer Name, Project Name, Description, and Project Admin fields. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_009 – Create Project with Valid Details

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_009 |
| Title | Verify admin user can create a project using valid details |
| Priority | High |
| Type | Positive / Functional |
| Automation Status | Automated |
| Preconditions | Add Project form is open and a valid customer exists |
| Test Data | Customer: Newly created customer<br>Project Name: Dynamically generated name<br>Description: Valid project description<br>Project Admin: Valid employee |
| Steps | 1. Select the customer.<br>2. Enter a unique project name.<br>3. Enter a valid project description.<br>4. Select a valid Project Admin.<br>5. Click Save. |
| Expected Result | The project should be created successfully and the application should return to the Projects page. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_010 – Project Name Required Validation

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_010 |
| Title | Verify validation when project name is blank |
| Priority | High |
| Type | Negative / Validation |
| Automation Status | Manual Reference |
| Preconditions | Add Project form is open |
| Test Data | Customer: Valid customer<br>Project Name: Blank<br>Project Admin: Valid employee |
| Steps | 1. Select a customer.<br>2. Leave Project Name blank.<br>3. Select a valid Project Admin.<br>4. Click Save. |
| Expected Result | The project should not be saved and a required-field validation message should be displayed for Project Name. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_011 – Customer Required Validation for Project

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_011 |
| Title | Verify validation when customer is not selected during project creation |
| Priority | High |
| Type | Negative / Validation |
| Automation Status | Manual Reference |
| Preconditions | Add Project form is open |
| Test Data | Project Name: Valid unique name<br>Customer: Not selected<br>Project Admin: Valid employee |
| Steps | 1. Leave the Customer field empty.<br>2. Enter a project name.<br>3. Select a Project Admin.<br>4. Click Save. |
| Expected Result | The project should not be saved and a required-field validation message should be displayed for Customer. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_012 – Project Admin Required Validation

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_012 |
| Title | Verify validation when Project Admin is not selected |
| Priority | Medium |
| Type | Negative / Validation |
| Automation Status | Manual Reference |
| Preconditions | Add Project form is open |
| Test Data | Customer: Valid customer<br>Project Name: Valid unique name<br>Project Admin: Not selected |
| Steps | 1. Select a customer.<br>2. Enter a project name.<br>3. Leave Project Admin empty.<br>4. Click Save. |
| Expected Result | The application should apply the configured validation rule for Project Admin and prevent saving when the field is mandatory. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_013 – Edit Existing Project

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_013 |
| Title | Verify admin user can edit an existing project |
| Priority | High |
| Type | Positive / Functional |
| Automation Status | Automated |
| Preconditions | A project has already been created |
| Test Data | Existing generated project name |
| Steps | 1. Locate the created project in the Projects page.<br>2. Open the project record.<br>3. Observe the Edit Project form. |
| Expected Result | The selected project's existing details should be loaded in the edit form. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_014 – Update Project Name and Description

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_014 |
| Title | Verify admin user can update project name and description |
| Priority | High |
| Type | Positive / Functional |
| Automation Status | Automated |
| Preconditions | Edit Project form is open |
| Test Data | Updated Project Name: Dynamically generated value<br>Updated Description: Updated Sprint 7 project description |
| Steps | 1. Replace the existing project name with a new unique name.<br>2. Replace or update the description.<br>3. Click Save. |
| Expected Result | The project changes should be saved successfully. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_015 – Verify Updated Project in Table

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_015 |
| Title | Verify updated project information is displayed in the project table |
| Priority | High |
| Type | Functional / Verification |
| Automation Status | Automated |
| Preconditions | The project has been updated successfully |
| Test Data | Customer name and updated project name |
| Steps | 1. Open the Projects page.<br>2. Locate the project records table.<br>3. Search for the customer and updated project name. |
| Expected Result | The project table should display a record containing the correct customer and updated project name. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

### TC_TIME_016 – Unauthorized Access to Project Information

| Field | Details |
|---|---|
| Test Case ID | TC_TIME_016 |
| Title | Verify unauthorized user cannot manage customers and projects |
| Priority | High |
| Type | Security / Authorization |
| Automation Status | Manual Reference |
| Preconditions | User is logged in without Project Information management permission |
| Test Data | Restricted user account |
| Steps | 1. Log in as the restricted user.<br>2. Attempt to open Customers and Projects administration pages.<br>3. Attempt to access the page URLs directly. |
| Expected Result | Management options should be hidden or access should be denied according to the user's permissions. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

---

## Automated Test Mapping

| Automated Test | Covered Test Cases |
|---|---|
| Admin user can create and update project information | TC_TIME_001, TC_TIME_002, TC_TIME_003, TC_TIME_004, TC_TIME_007, TC_TIME_008, TC_TIME_009, TC_TIME_013, TC_TIME_014, TC_TIME_015 |

## Excluded Scope

Timesheet entry automation is excluded from Sprint 7 because the OrangeHRM public demo contains changing projects, activities, employees, and weekly timesheet data. This made the test dependent on external demo data and unsuitable for stable CI execution.