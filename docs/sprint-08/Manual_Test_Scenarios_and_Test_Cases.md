# Sprint 8 – My Info Manual Test Scenarios and Test Cases

## 1. Test Scenarios

| Scenario ID | Module Area | Test Scenario |
|---|---|---|
| TS_MYINFO_001 | Navigation | Verify employee can navigate from Dashboard to My Info |
| TS_MYINFO_002 | Personal Details | Verify employee can update editable Personal Details fields |
| TS_MYINFO_003 | Contact Details | Verify employee can update address, country, telephone, and alternate email details |
| TS_MYINFO_004 | Emergency Contacts | Verify employee can add an emergency contact |
| TS_MYINFO_005 | Dependents | Verify employee can add a dependent |
| TS_MYINFO_006 | Qualifications | Verify employee can add Work Experience |
| TS_MYINFO_007 | Memberships | Verify employee can add a membership |
| TS_MYINFO_008 | Validation | Verify required-field validation appears when mandatory fields are empty |
| TS_MYINFO_009 | Navigation | Verify employee can move between all supported My Info tabs |
| TS_MYINFO_010 | Data Verification | Verify newly created records appear in the correct tables |

---

## 2. Manual Test Cases

### TC_MYINFO_NAV_001 – Navigate to My Info

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_NAV_001 |
| Title | Verify employee can navigate to My Info |
| Preconditions | Employee is logged in and Dashboard is displayed |
| Test Steps | 1. Locate the My Info link in the side menu.<br>2. Click My Info.<br>3. Observe the redirected page. |
| Expected Result | Personal Details page should open and the My Info navigation tabs should be visible. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_PERSONAL_002 – Update Personal Details

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_PERSONAL_002 |
| Title | Verify employee can update Personal Details |
| Preconditions | Employee is on My Info → Personal Details |
| Test Data | Middle Name, Other ID, Driver License Number |
| Test Steps | 1. Enter a valid Middle Name.<br>2. Enter a valid Other ID.<br>3. Enter a valid Driver License Number.<br>4. Click Save.<br>5. Observe the values after saving. |
| Expected Result | The entered values should remain visible in the respective fields after the update operation. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_CONTACT_003 – Update Contact Details

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_CONTACT_003 |
| Title | Verify employee can update Contact Details |
| Preconditions | Employee is on My Info → Contact Details |
| Test Data | Address, country, phone numbers, alternate email |
| Test Steps | 1. Enter Street 1 and Street 2.<br>2. Enter City, State/Province, and Zip/Postal Code.<br>3. Select Country.<br>4. Enter Home, Mobile, and Work Telephone.<br>5. Enter Other Email.<br>6. Click Save. |
| Expected Result | Contact Details should be updated and the entered values should remain visible. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_CONTACT_004 – Preserve Work Email

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_CONTACT_004 |
| Title | Verify Work Email is not modified while updating other contact details |
| Preconditions | Employee has an existing Work Email |
| Test Steps | 1. Note the existing Work Email.<br>2. Update all other Contact Details fields.<br>3. Click Save.<br>4. Recheck Work Email. |
| Expected Result | Work Email should remain unchanged. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_EMERGENCY_005 – Add Emergency Contact

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_EMERGENCY_005 |
| Title | Verify employee can add an emergency contact |
| Preconditions | Employee is on My Info → Emergency Contacts |
| Test Data | Name, Relationship, Home Telephone, Mobile, Work Telephone |
| Test Steps | 1. Click Add under Assigned Emergency Contacts.<br>2. Enter Name.<br>3. Enter Relationship.<br>4. Enter telephone details.<br>5. Click Save.<br>6. Review the Assigned Emergency Contacts table. |
| Expected Result | A new emergency-contact row should appear with the entered name and relationship. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_EMERGENCY_006 – Mandatory Emergency Contact Fields

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_EMERGENCY_006 |
| Title | Verify mandatory-field validation for emergency contact |
| Preconditions | Add Emergency Contact form is open |
| Test Steps | 1. Leave required fields empty.<br>2. Click Save. |
| Expected Result | Required validation messages should appear and the record should not be saved. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_DEPENDENT_007 – Add Dependent

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_DEPENDENT_007 |
| Title | Verify employee can add a dependent |
| Preconditions | Employee is on My Info → Dependents |
| Test Data | Name: unique dependent name; Relationship: Child |
| Test Steps | 1. Click Add under Assigned Dependents.<br>2. Enter Name.<br>3. Select Relationship.<br>4. Click Save.<br>5. Review the Assigned Dependents table. |
| Expected Result | A new dependent row should appear with the entered name and selected relationship. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_DEPENDENT_008 – Required Dependent Fields

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_DEPENDENT_008 |
| Title | Verify required validation when adding a dependent |
| Preconditions | Add Dependent form is displayed |
| Test Steps | 1. Leave Name empty.<br>2. Do not select Relationship.<br>3. Click Save. |
| Expected Result | Required validation should appear for Name and Relationship. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_QUALIFICATION_009 – Add Work Experience

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_QUALIFICATION_009 |
| Title | Verify employee can add Work Experience |
| Preconditions | Employee is on My Info → Qualifications |
| Test Data | Company, Job Title, Comment |
| Test Steps | 1. Click Add under Work Experience.<br>2. Enter Company.<br>3. Enter Job Title.<br>4. Enter Comment.<br>5. Click Save.<br>6. Review the Work Experience table. |
| Expected Result | A new Work Experience row should appear with the entered company and job title. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_QUALIFICATION_010 – Work Experience Required Fields

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_QUALIFICATION_010 |
| Title | Verify required validation for Work Experience |
| Preconditions | Add Work Experience form is displayed |
| Test Steps | 1. Leave Company empty.<br>2. Leave Job Title empty.<br>3. Click Save. |
| Expected Result | Required validation should appear for Company and Job Title. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_MEMBERSHIP_011 – Add Membership

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_MEMBERSHIP_011 |
| Title | Verify employee can add a membership |
| Preconditions | Employee is on My Info → Memberships |
| Test Data | Membership: ACCA; Paid By: Company; Amount: 10000; Currency: Indian Rupee |
| Test Steps | 1. Click Add under Assigned Memberships.<br>2. Select ACCA.<br>3. Select Company under Subscription Paid By.<br>4. Enter Subscription Amount.<br>5. Select Indian Rupee.<br>6. Click Save.<br>7. Review the Assigned Memberships table. |
| Expected Result | A new membership row should appear with ACCA and the selected subscription information. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_MEMBERSHIP_012 – Membership Required Field

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_MEMBERSHIP_012 |
| Title | Verify Membership is mandatory |
| Preconditions | Add Membership form is displayed |
| Test Steps | 1. Leave Membership unselected.<br>2. Click Save. |
| Expected Result | A required validation message should appear and no membership should be saved. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_NAV_013 – Navigate Between My Info Tabs

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_NAV_013 |
| Title | Verify employee can navigate between covered My Info tabs |
| Preconditions | Employee is on any My Info page |
| Test Steps | 1. Open Personal Details.<br>2. Open Contact Details.<br>3. Open Emergency Contacts.<br>4. Open Dependents.<br>5. Open Qualifications.<br>6. Open Memberships. |
| Expected Result | Each selected page should load with the correct heading and URL. |
| Actual Result | To be updated during execution |
| Status | Not Executed |

### TC_MYINFO_DATA_014 – Verify New Records by Unique Data

| Field | Details |
|---|---|
| Test Case ID | TC_MYINFO_DATA_014 |
| Title | Verify newly created records can be identified using unique data |
| Preconditions | Emergency Contact, Dependent, Work Experience, and Membership have been created |
| Test Steps | 1. Open each respective My Info section.<br>2. Search visually for the newly entered unique values.<br>3. Compare the row values with the submitted data. |
| Expected Result | Each created record should appear in the correct table with matching values. |
| Actual Result | To be updated during execution |
| Status | Not Executed |