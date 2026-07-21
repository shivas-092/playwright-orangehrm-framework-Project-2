# Sprint 8 – My Info Module Documentation

## 1. Sprint Overview

**Sprint:** 8  
**Module:** My Info  
**Application:** OrangeHRM Open Source Demo  
**Automation Tool:** Playwright with TypeScript  
**Framework Pattern:** Component-based Page Object Model  
**Test Execution Style:** Single end-to-end test flow  
**Status:** Completed and Passed

## 2. Sprint Objective

The objective of Sprint 8 was to automate important employee self-service operations available under the **My Info** module. The automation validates that an employee can update personal and contact information and add related records such as emergency contacts, dependents, work experience, and memberships.

The implementation uses reusable component classes, centralized test data, and common form utilities.

## 3. Scope Covered

The following My Info areas were automated:

1. Personal Details
2. Contact Details
3. Emergency Contacts
4. Dependents
5. Qualifications – Work Experience
6. Memberships

The following areas were intentionally not included in Sprint 8:

- Immigration
- Job
- Salary
- Report-to
- Attachments
- Education
- Skills
- Languages
- Licenses

## 4. Automated End-to-End Flow

The final Playwright test performs the following sequence:

1. Navigate to the OrangeHRM dashboard.
2. Open the **My Info** module.
3. Update Personal Details.
4. Navigate to Contact Details and update address, telephone, country, and alternate email information.
5. Navigate to Emergency Contacts and add a new contact.
6. Navigate to Dependents and add a new dependent.
7. Navigate to Qualifications and add Work Experience.
8. Navigate to Memberships and add a membership record.
9. Verify the newly created records in their respective tables.

## 5. Project Structure

```text
components/
└── my-info/
    ├── my-info.component.ts
    ├── personal-details.component.ts
    ├── contact-details.component.ts
    ├── emergency-contact.component.ts
    ├── dependents.component.ts
    ├── qualification.component.ts
    └── membership.component.ts

test-data/
└── my-info.data.ts

tests/
└── MyInfo/
    └── my-info.e2e.spec.ts

utils/
└── form.util.ts
```

## 6. Component Responsibilities

### 6.1 MyInfoComponent

Responsible for navigation between My Info sections.

Main methods:

```ts
navigateToMyInfo()
navigateToPersonalDetails()
navigateToContactDetails()
navigateToEmergencyContacts()
navigateToDependents()
navigateToQualifications()
navigateToMemberships()
```

The component validates the expected URL and heading after each navigation action.

### 6.2 PersonalDetailsComponent

Responsible for updating:

- Middle Name
- Other ID
- Driver License Number

The component verifies that the entered values are retained in the form after the update action.

### 6.3 ContactDetailsComponent

Responsible for updating:

- Street 1
- Street 2
- City
- State/Province
- Zip/Postal Code
- Country
- Home Telephone
- Mobile Telephone
- Work Telephone
- Other Email

The Work Email field is intentionally not modified.

### 6.4 EmergencyContactComponent

Responsible for adding an emergency contact with:

- Name
- Relationship
- Home Telephone
- Mobile Telephone
- Work Telephone

The component verifies the contact by locating the created record in the emergency-contact table.

### 6.5 DependentComponent

Responsible for adding a dependent with:

- Name
- Relationship

The optional date-of-birth field was not automated to avoid unnecessary date-field instability in the shared demo environment.

### 6.6 QualificationComponent

Responsible for adding Work Experience with:

- Company
- Job Title
- Comment

The optional From and To date fields were not included.

### 6.7 MembershipComponent

Responsible for adding a membership with:

- Membership
- Subscription Paid By
- Subscription Amount
- Currency

The subscription commence and renewal dates were not included.

## 7. Test Data Strategy

Dynamic data is generated using the last six digits of the current timestamp.

```ts
private static readonly uniqueId = Date.now().toString().slice(-6);
```

This reduces conflicts in the shared OrangeHRM environment.

Examples of generated data:

```text
Automation Street 123456
Emergency Contact 123456
Automation Child 123456
Automation Company 123456
```

Static dropdown values used in the final implementation include:

```text
Country: India
Dependent Relationship: Child
Membership: ACCA
Subscription Paid By: Company
Currency: Indian Rupee
```

## 8. Utility Usage

The shared `FormUtil` supports reusable form actions such as:

```ts
FormUtil.fill()
FormUtil.selectDropdownByText()
FormUtil.waitForLoader()
```

Benefits:

- Reduces repeated locator and waiting logic.
- Improves readability.
- Provides consistent handling of OrangeHRM dropdowns and loaders.
- Makes future form components easier to maintain.

## 9. Locator Strategy

The Sprint 8 implementation follows these locator practices:

- Role-based locators for headings, links, and buttons.
- Exact label matching for form fields.
- Heading-based section scoping.
- Table-row filtering using unique generated values.
- URL verification after navigation.
- Avoidance of index-based table verification where unique data is available.

Example:

```ts
const row = page.locator('.oxd-table-card').filter({ hasText: company });
await expect(row).toBeVisible();
```

## 10. Issues Resolved

### 10.1 Duplicate Add Buttons

Several pages contained an **Add** button for the main section and another for Attachments. Broad button locators caused Playwright strict-mode violations.

The locator was corrected by starting from the relevant section heading and selecting the first following button.

```ts
const addButton = page
  .getByRole('heading', { name: 'Assigned Dependents', exact: true })
  .locator('xpath=following::button[1]');
```

### 10.2 Temporary Toast Messages

The OrangeHRM success toast was sometimes missed because it disappeared quickly or was inconsistent in the shared demo environment.

Stable validation focused on:

- Successful Save interaction.
- Form completion.
- Updated field values.
- Created row verification.

### 10.3 Multiple Similar Labels

The Contact Details page contained labels such as **Work** and **Work Email**.

Exact-label matching was used to prevent the wrong input from being selected.

### 10.4 Shared Demo Data

The application is used by multiple users. Existing rows and employee values may change during test execution.

The solution was to:

- Generate unique values.
- Verify records by unique text.
- Avoid relying on row count or fixed row position.

## 11. Final Test File

```text
tests/MyInfo/my-info.e2e.spec.ts
```

Test suite:

```ts
test.describe.serial('My Info Module', () => {
  test('Employee can manage My Info details', async ({ page }) => {
    // Complete My Info end-to-end flow
  });
});
```

## 12. Execution Commands

```bash
npx playwright test tests/MyInfo/my-info.e2e.spec.ts
```

```bash
npx playwright test tests/MyInfo/my-info.e2e.spec.ts --headed
```

```bash
npx playwright test tests/MyInfo/my-info.e2e.spec.ts --debug
```

## 13. Expected Result

The complete My Info test should:

- Navigate successfully through all covered tabs.
- Update Personal Details.
- Update Contact Details.
- Add an Emergency Contact.
- Add a Dependent.
- Add Work Experience.
- Add a Membership.
- Verify newly created records.
- Complete without Playwright failures.

## 14. Sprint Completion

Sprint 8 is complete after:

- Local test execution passed.
- All My Info components were integrated into the single E2E test.
- Dynamic test data was implemented.
- Flaky and duplicate locators were corrected.
- Manual test scenarios and cases were documented.
- GitHub Actions validation is completed before tagging the sprint.

Recommended Git commit:

```bash
git add .
git commit -m "feat: automate OrangeHRM My Info module for sprint 8"
git push origin main
```

Recommended tag after CI is green:

```bash
git tag sprint-8
git push origin sprint-8
```