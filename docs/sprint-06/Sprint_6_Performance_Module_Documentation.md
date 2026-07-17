# Sprint 6 – Performance Module Test Scenarios

## KPI Management Scenarios

| Scenario ID | Test Scenario                                               |
| ----------- | ----------------------------------------------------------- |
| TS_PER_001  | Verify Admin can navigate to the KPI page                   |
| TS_PER_002  | Verify Admin can create a new KPI with valid details        |
| TS_PER_003  | Verify the created KPI is displayed in the KPI list         |
| TS_PER_004  | Verify Admin can search KPIs using Job Title                |
| TS_PER_005  | Verify Admin can edit an existing KPI                       |
| TS_PER_006  | Verify updated KPI details are displayed correctly          |
| TS_PER_007  | Verify Admin can delete an existing KPI                     |
| TS_PER_008  | Verify the deleted KPI is removed from the KPI list         |
| TS_PER_009  | Verify required-field validation on the Add KPI form        |
| TS_PER_010  | Verify Minimum Rating cannot be greater than Maximum Rating |
| TS_PER_011  | Verify the Cancel button returns the user to the KPI list   |
| TS_PER_012  | Verify the Make Default Scale toggle can be enabled         |

## Performance Tracker Scenarios

| Scenario ID | Test Scenario                                                 |
| ----------- | ------------------------------------------------------------- |
| TS_PER_013  | Verify Admin can navigate to the Performance Trackers page    |
| TS_PER_014  | Verify Admin can open the Add Performance Tracker page        |
| TS_PER_015  | Verify Admin can create a tracker with valid details          |
| TS_PER_016  | Verify Employee Name autocomplete displays matching employees |
| TS_PER_017  | Verify Reviewer autocomplete displays matching employees      |
| TS_PER_018  | Verify Admin can select an employee from autocomplete         |
| TS_PER_019  | Verify Admin can select a reviewer from autocomplete          |
| TS_PER_020  | Verify Admin can search a tracker using Employee Name         |
| TS_PER_021  | Verify the created tracker is displayed in search results     |
| TS_PER_022  | Verify required-field validation on the Add Tracker form      |
| TS_PER_023  | Verify the Cancel button returns the user to the Tracker list |
| TS_PER_024  | Verify duplicate tracker handling for the same employee       |

---

# Sprint 6 – Performance Module Test Cases

## TC_PER_001 – Navigate to KPI Page

| Field           | Details                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------ |
| Test Case ID    | TC_PER_001                                                                                 |
| Test Scenario   | Verify Admin can navigate to the KPI page                                                  |
| Preconditions   | Admin is logged in                                                                         |
| Test Data       | Not required                                                                               |
| Steps           | 1. Open OrangeHRM.<br>2. Navigate to Performance.<br>3. Open Configure.<br>4. Click KPIs.  |
| Expected Result | KPI page should open and display the heading **Key Performance Indicators for Job Title**. |
| Priority        | High                                                                                       |
| Type            | Functional                                                                                 |
| Status          | Not Executed                                                                               |

## TC_PER_002 – Create KPI with Valid Details

| Field           | Details                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_002                                                                                                                            |
| Test Scenario   | Verify Admin can create a new KPI                                                                                                     |
| Preconditions   | Admin is logged in and is on the KPI page                                                                                             |
| Test Data       | KPI Name: Automation Quality KPI<br>Job Title: QA Engineer<br>Minimum Rating: 1<br>Maximum Rating: 5                                  |
| Steps           | 1. Click Add.<br>2. Enter KPI name.<br>3. Select Job Title.<br>4. Enter Minimum Rating.<br>5. Enter Maximum Rating.<br>6. Click Save. |
| Expected Result | KPI should be created successfully and a success confirmation should appear.                                                          |
| Priority        | High                                                                                                                                  |
| Type            | Positive                                                                                                                              |
| Status          | Passed                                                                                                                                |

## TC_PER_003 – Search KPI by Job Title

| Field           | Details                                                                            |
| --------------- | ---------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_003                                                                         |
| Test Scenario   | Verify Admin can search KPIs by Job Title                                          |
| Preconditions   | At least one KPI exists for QA Engineer                                            |
| Test Data       | Job Title: QA Engineer                                                             |
| Steps           | 1. Open the KPI page.<br>2. Select QA Engineer from Job Title.<br>3. Click Search. |
| Expected Result | Only KPIs associated with QA Engineer should be displayed.                         |
| Priority        | High                                                                               |
| Type            | Functional                                                                         |
| Status          | Passed                                                                             |

## TC_PER_004 – Verify Created KPI

| Field           | Details                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_004                                                                                        |
| Test Scenario   | Verify the newly created KPI appears in the list                                                  |
| Preconditions   | KPI has been created successfully                                                                 |
| Test Data       | Created KPI name                                                                                  |
| Steps           | 1. Search using the related Job Title.<br>2. Locate the created KPI in the result table.          |
| Expected Result | The created KPI should be visible with the correct Job Title, Minimum Rating, and Maximum Rating. |
| Priority        | High                                                                                              |
| Type            | Verification                                                                                      |
| Status          | Passed                                                                                            |

## TC_PER_005 – Edit Existing KPI

| Field           | Details                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_005                                                                                                                                               |
| Test Scenario   | Verify Admin can edit an existing KPI                                                                                                                    |
| Preconditions   | KPI exists                                                                                                                                               |
| Test Data       | Updated KPI Name: Updated Automation KPI<br>Minimum Rating: 2<br>Maximum Rating: 10                                                                      |
| Steps           | 1. Search for the KPI.<br>2. Click the Edit icon.<br>3. Update the KPI name.<br>4. Update Minimum Rating.<br>5. Update Maximum Rating.<br>6. Click Save. |
| Expected Result | KPI should be updated successfully and the updated values should appear in the list.                                                                     |
| Priority        | High                                                                                                                                                     |
| Type            | Positive                                                                                                                                                 |
| Status          | Passed                                                                                                                                                   |

## TC_PER_006 – Delete Existing KPI

| Field           | Details                                                                     |
| --------------- | --------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_006                                                                  |
| Test Scenario   | Verify Admin can delete an existing KPI                                     |
| Preconditions   | KPI exists                                                                  |
| Test Data       | Updated KPI name                                                            |
| Steps           | 1. Search for the KPI.<br>2. Click the Delete icon.<br>3. Confirm deletion. |
| Expected Result | KPI should be deleted successfully and removed from the table.              |
| Priority        | High                                                                        |
| Type            | Positive                                                                    |
| Status          | Passed                                                                      |

## TC_PER_007 – Required Validation on KPI Form

| Field           | Details                                                                   |
| --------------- | ------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_007                                                                |
| Test Scenario   | Verify validation for mandatory KPI fields                                |
| Preconditions   | Admin is on the Add KPI page                                              |
| Test Data       | Blank values                                                              |
| Steps           | 1. Leave all mandatory fields blank.<br>2. Click Save.                    |
| Expected Result | Required validation messages should appear and KPI should not be created. |
| Priority        | Medium                                                                    |
| Type            | Negative                                                                  |
| Status          | Not Executed                                                              |

## TC_PER_008 – Invalid KPI Rating Range

| Field           | Details                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_008                                                                                                                            |
| Test Scenario   | Verify validation when Minimum Rating is greater than Maximum Rating                                                                  |
| Preconditions   | Admin is on the Add KPI page                                                                                                          |
| Test Data       | Minimum Rating: 10<br>Maximum Rating: 5                                                                                               |
| Steps           | 1. Enter valid KPI Name.<br>2. Select Job Title.<br>3. Enter Minimum Rating as 10.<br>4. Enter Maximum Rating as 5.<br>5. Click Save. |
| Expected Result | Validation should be displayed and the KPI should not be saved.                                                                       |
| Priority        | Medium                                                                                                                                |
| Type            | Negative                                                                                                                              |
| Status          | Not Executed                                                                                                                          |

## TC_PER_009 – Navigate to Performance Trackers

| Field           | Details                                                          |
| --------------- | ---------------------------------------------------------------- |
| Test Case ID    | TC_PER_009                                                       |
| Test Scenario   | Verify Admin can navigate to the Performance Trackers page       |
| Preconditions   | Admin is logged in                                               |
| Test Data       | Not required                                                     |
| Steps           | 1. Open Performance.<br>2. Open Configure.<br>3. Click Trackers. |
| Expected Result | Performance Trackers page should open successfully.              |
| Priority        | High                                                             |
| Type            | Functional                                                       |
| Status          | Passed                                                           |

## TC_PER_010 – Create Performance Tracker

| Field           | Details                                                                                                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_010                                                                                                                                                                                                                               |
| Test Scenario   | Verify Admin can create a performance tracker                                                                                                                                                                                            |
| Preconditions   | Employee and reviewer records exist                                                                                                                                                                                                      |
| Test Data       | Tracker Name: Automation Performance Tracker<br>Employee: Dynamically created employee<br>Reviewer: Dynamically created reviewer                                                                                                         |
| Steps           | 1. Open Performance Trackers.<br>2. Click Add.<br>3. Enter Tracker Name.<br>4. Type Employee Name.<br>5. Select the employee from autocomplete.<br>6. Type Reviewer Name.<br>7. Select the reviewer from autocomplete.<br>8. Click Save. |
| Expected Result | Tracker should be created successfully and the Tracker list page should be displayed.                                                                                                                                                    |
| Priority        | High                                                                                                                                                                                                                                     |
| Type            | Positive                                                                                                                                                                                                                                 |
| Status          | Passed                                                                                                                                                                                                                                   |

## TC_PER_011 – Employee Autocomplete

| Field           | Details                                                                             |
| --------------- | ----------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_011                                                                          |
| Test Scenario   | Verify Employee Name autocomplete shows matching records                            |
| Preconditions   | Employees exist                                                                     |
| Test Data       | First few letters of employee name                                                  |
| Steps           | 1. Open Add Performance Tracker.<br>2. Type the first few letters in Employee Name. |
| Expected Result | A list of matching employee names should appear.                                    |
| Priority        | High                                                                                |
| Type            | Functional                                                                          |
| Status          | Passed                                                                              |

## TC_PER_012 – Reviewer Autocomplete

| Field           | Details                                                                         |
| --------------- | ------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_012                                                                      |
| Test Scenario   | Verify Reviewer autocomplete shows matching records                             |
| Preconditions   | Reviewer employee exists                                                        |
| Test Data       | First few letters of reviewer name                                              |
| Steps           | 1. Open Add Performance Tracker.<br>2. Type the first few letters in Reviewers. |
| Expected Result | A list of matching employee names should appear.                                |
| Priority        | High                                                                            |
| Type            | Functional                                                                      |
| Status          | Passed                                                                          |

## TC_PER_013 – Search Tracker by Employee Name

| Field           | Details                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_013                                                                                                              |
| Test Scenario   | Verify Admin can search tracker using Employee Name                                                                     |
| Preconditions   | Performance tracker has been created                                                                                    |
| Test Data       | Employee name assigned to tracker                                                                                       |
| Steps           | 1. Navigate to Performance Trackers.<br>2. Enter Employee Name.<br>3. Select the matching employee.<br>4. Click Search. |
| Expected Result | Trackers assigned to the selected employee should be displayed.                                                         |
| Priority        | High                                                                                                                    |
| Type            | Functional                                                                                                              |
| Status          | Passed                                                                                                                  |

## TC_PER_014 – Verify Created Tracker

| Field           | Details                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------ |
| Test Case ID    | TC_PER_014                                                                                 |
| Test Scenario   | Verify created tracker appears in search results                                           |
| Preconditions   | Tracker has been created                                                                   |
| Test Data       | Created tracker name                                                                       |
| Steps           | 1. Search using the assigned employee.<br>2. Verify the tracker name in the results table. |
| Expected Result | The created tracker should be visible with the correct employee and reviewer details.      |
| Priority        | High                                                                                       |
| Type            | Verification                                                                               |
| Status          | Passed                                                                                     |

## TC_PER_015 – Required Validation on Tracker Form

| Field           | Details                                                                           |
| --------------- | --------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_015                                                                        |
| Test Scenario   | Verify mandatory field validation on Add Tracker form                             |
| Preconditions   | Admin is on Add Performance Tracker page                                          |
| Test Data       | Blank fields                                                                      |
| Steps           | 1. Leave Tracker Name, Employee Name, and Reviewers blank.<br>2. Click Save.      |
| Expected Result | Required validation messages should appear and the tracker should not be created. |
| Priority        | Medium                                                                            |
| Type            | Negative                                                                          |
| Status          | Not Executed                                                                      |

## TC_PER_016 – Cancel Tracker Creation

| Field           | Details                                                                               |
| --------------- | ------------------------------------------------------------------------------------- |
| Test Case ID    | TC_PER_016                                                                            |
| Test Scenario   | Verify Cancel button on Add Tracker page                                              |
| Preconditions   | Admin is on Add Performance Tracker page                                              |
| Test Data       | Any partial tracker data                                                              |
| Steps           | 1. Enter partial tracker details.<br>2. Click Cancel.                                 |
| Expected Result | User should return to the Performance Trackers page and no tracker should be created. |
| Priority        | Low                                                                                   |
| Type            | Functional                                                                            |
| Status          | Not Executed                                                                          |
