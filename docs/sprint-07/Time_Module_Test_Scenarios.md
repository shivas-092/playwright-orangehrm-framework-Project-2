
# Sprint 7 – Time Module Test Scenarios

## Module Scope

Sprint 7 covers the **Time Module – Project Information** functionality in OrangeHRM.

The automated scope includes:

- Customer creation and verification
- Project creation using an existing customer
- Project update
- Verification of the updated project

Timesheet automation was removed because the public OrangeHRM demo data changes frequently and caused unstable test execution.

---

## Test Scenarios

| Scenario ID | Feature | Test Scenario | Priority | Automation Status |
|---|---|---|---|---|
| TS_TIME_001 | Customer | Verify that the admin user can navigate to the Customers page | High | Automated |
| TS_TIME_002 | Customer | Verify that the Customers page displays the Add button and customer records table | Medium | Covered within automation flow |
| TS_TIME_003 | Customer | Verify that the admin user can open the Add Customer form | High | Automated |
| TS_TIME_004 | Customer | Verify that the admin user can create a customer with valid details | High | Automated |
| TS_TIME_005 | Customer | Verify that the newly created customer is displayed in the customer table | High | Automated |
| TS_TIME_006 | Customer | Verify validation when the customer name is left blank | High | Manual reference |
| TS_TIME_007 | Customer | Verify that duplicate customer names are handled correctly | Medium | Manual reference |
| TS_TIME_008 | Customer | Verify that the customer description accepts valid text | Low | Covered within automation flow |
| TS_TIME_009 | Project | Verify that the admin user can navigate to the Projects page | High | Automated |
| TS_TIME_010 | Project | Verify that the admin user can open the Add Project form | High | Automated |
| TS_TIME_011 | Project | Verify that the admin user can create a project using an existing customer | High | Automated |
| TS_TIME_012 | Project | Verify that a valid project administrator can be selected | High | Automated |
| TS_TIME_013 | Project | Verify that the newly created project is displayed in the project table | High | Covered within automation flow |
| TS_TIME_014 | Project | Verify validation when the project name is left blank | High | Manual reference |
| TS_TIME_015 | Project | Verify validation when the customer is not selected | High | Manual reference |
| TS_TIME_016 | Project | Verify validation when a project administrator is not selected | Medium | Manual reference |
| TS_TIME_017 | Project | Verify that the admin user can edit an existing project | High | Automated |
| TS_TIME_018 | Project | Verify that the project name and description can be updated | High | Automated |
| TS_TIME_019 | Project | Verify that the updated project is displayed in the project table | High | Automated |
| TS_TIME_020 | Project | Verify that project search returns the correct record | Medium | Covered during project selection and verification |
| TS_TIME_021 | Security | Verify that unauthorized users cannot access Project Information administration pages | High | Manual reference |
| TS_TIME_022 | UI | Verify that success messages are displayed after customer and project operations | Medium | Covered within component flow where available |
| TS_TIME_023 | Reliability | Verify that loaders disappear before the next action is performed | Medium | Automated through reusable waits |
| TS_TIME_024 | Data | Verify that dynamically generated customer and project names prevent duplicate-data conflicts | High | Automated |

---

## Automated End-to-End Scenario

### TS_TIME_E2E_001 – Create and Update Project Information

**Objective:**  
Verify that an authenticated admin user can create a customer, create a project for that customer, update the project, and verify the updated information.

**Flow:**

1. Log in as an admin user through the authentication setup.
2. Navigate to Time → Project Info → Customers.
3. Open the Add Customer form.
4. Enter a dynamically generated customer name and description.
5. Save the customer.
6. Verify that the customer appears in the customer table.
7. Navigate to Time → Project Info → Projects.
8. Open the Add Project form.
9. Select the newly created customer.
10. Enter a dynamically generated project name and description.
11. Select a valid project administrator.
12. Save the project.
13. Locate and open the created project.
14. Update the project name and description.
15. Save the changes.
16. Verify that the customer and updated project name appear in the project table.

**Expected Result:**  
The customer and project should be created successfully, the project should be updated successfully, and the updated project information should be visible in the project table.