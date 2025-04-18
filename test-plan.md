# Test Plan for Veeam UI Automation

## Introduction

This test plan outlines the automated UI testing strategy for the Veeam website using Playwright with TypeScript. The tests validate navigation, form interactions, and error handling during user registration.

### Objective

The goal is to verify that the website's key functions, such as visiting the page, interacting with the form, and handling error scenarios, work as expected.

### Test Scope

- **Included**: UI functionality (visiting homepage, navigation, registration page, form validation).
- **Excluded**: - Non-UI functionalities (such as API testing or database validation); - Additional functionality (form fields validation such as length of username and password, special symbols, password's match).

## Test Scenarios

| Test Case ID | Test Scenario Description          | Expected Result                           | Status  |
| ------------ | ---------------------------------- | ----------------------------------------- | ------- |
| TC01         | Visit Veeam homepage, verify title | Title should contain "Veeam"              | ✅ Done |
| TC02         | Navigating to Forum page           | Navigation links/buttons are functionable | ✅ Done |
| TC03         | Register with requested data       | Error: "Public email are not allowed"     | ✅ Done |

### TC01: Visit Veeam Homepage and Verify Title

**Test Steps:**

1. Navigate to https://www.veeam.com
2. Verify the title contains the string "Veeam"

**Expected Result:**

- The page title should contain the word "Veeam".

### TC02: Navigate to Forum and pass Agreement

**Test Steps:**

1. Navigate to the Veeam homepage
2. Hover/click the "Support" link and "R&D Forums"
3. Click the "Register" link
4. Click "I agree" button to proceed to registration form

**Expected Result:**

- "Support", "R&D Forums" and "I agree" are functionable.

### TC03: Register on Forum with Requested Data

**Test Steps:**

1. Registration page has form and Submit button
2. Fill in the following data:
   - **Name:** InterviewUser
   - **Email:** inreviewuser@gmail.com
   - **Password:** InreviewUser
   - make screenshot
3. Click "Submit" to submit the registration form
4. Expect an error message that you can't use public email
   - make screenshot

**Expected Result:**

- An error message should be shown that public emails are not allowed.

## Test Strategy

### Tools and Frameworks

- **Test Framework**: Playwright
- **Programming Language**: TypeScript
- **Test Runner**: Playwright's built-in test runner
- **Browsers**: Chromium, Firefox, Safari

### Architecture

- **Test Logic**: tests/test.spec.ts
- **Helper Functions**: utils/:
  - goToForumPage.ts - navigation to forum
  - registrationClick.ts - checks the "Register" link functionality
  - iAgreeBtn.ts - checks the "I Agree" button functionality
  - constants.ts - holds the constants
  - fillForm.ts - fills in the form fields
- **Test Runner**: Playwright's built-in test runner
- **Browsers**: Chromium, Firefox, Safari.

### Execution

Tests are executed using the command:

```bash
npm run test
```
