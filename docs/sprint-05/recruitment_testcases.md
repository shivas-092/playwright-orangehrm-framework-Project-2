# Recruitment Module - Test Cases

## Sprint
Sprint 5

---

### TC_REC_001

| Field | Details |
|--------|---------|
| Module | Recruitment |
| Feature | Vacancy |
| Test Case | Create Vacancy |
| Preconditions | Admin user logged in |
| Test Steps | Navigate → Recruitment → Vacancies → Add → Fill mandatory fields → Save |
| Expected Result | Vacancy should be created successfully |
| Automation Status | Automated |
| Result | Passed |

---

### TC_REC_002

| Field | Details |
|--------|---------|
| Module | Recruitment |
| Feature | Vacancy |
| Test Case | Verify Vacancy Exists |
| Preconditions | Vacancy already created |
| Test Steps | Navigate to Vacancies and verify vacancy in table |
| Expected Result | Vacancy should be visible in vacancy list |
| Automation Status | Automated |
| Result | Passed |

---

### TC_REC_003

| Field | Details |
|--------|---------|
| Module | Recruitment |
| Feature | Candidate |
| Test Case | Add Candidate |
| Preconditions | Vacancy exists |
| Test Steps | Navigate → Candidates → Add → Fill mandatory fields → Save |
| Expected Result | Candidate should be created successfully |
| Automation Status | Automated |
| Result | Passed |

---

### TC_REC_004

| Field | Details |
|--------|---------|
| Module | Recruitment |
| Feature | Candidate |
| Test Case | Search Candidate |
| Preconditions | Candidate exists |
| Test Steps | Search using candidate name |
| Expected Result | Candidate should appear in search results |
| Automation Status | Automated |
| Result | Passed |

---

### TC_REC_005

| Field | Details |
|--------|---------|
| Module | Recruitment |
| Feature | Candidate |
| Test Case | Shortlist Candidate |
| Preconditions | Candidate exists |
| Test Steps | Open candidate profile → Click Shortlist → Save |
| Expected Result | Candidate status should become Shortlisted |
| Automation Status | Automated |
| Result | Passed |

---

# Sprint 5 Automation Summary

## Module

Recruitment

## Features Automated

- Recruitment navigation
- Vacancy creation
- Vacancy verification
- Candidate creation
- Candidate search
- Candidate shortlisting

## Components Created

```
components/
└── recruitment/
    ├── recruitment.component.ts
    ├── vacancy.component.ts
    └── candidate.component.ts
```

## Test Files

```
tests/
└── Recruitment/
    └── recruitment.e2e.spec.ts
```

## Test Data

```
test-data/
├── vacancy.data.ts
└── candidate.data.ts
```

## Execution Status

✅ Passed

## Sprint Result

Sprint 5 completed successfully.
