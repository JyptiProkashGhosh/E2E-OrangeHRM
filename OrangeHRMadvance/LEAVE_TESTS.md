# 🏖️ Leave Management Module - Test Documentation

## Overview

The Leave Management module provides comprehensive E2E test coverage for the OrangeHRM Leave module, including leave applications, approvals, rejections, leave balance inquiries, and entitlements management.

---

## 📋 Test Coverage

### Feature 1: Apply for Leave (Multiple Types)

**Test Cases:**
- `Should apply for Casual Leave (multiple days)` - Apply for CZL with multiple days
- `Should apply for Medical Leave` - Single day medical leave
- `Should apply for Annual Leave` - Multi-day annual leave

**Validation:**
- Leave application is successfully submitted
- Success notification is displayed
- Leave type is correctly recorded

**Tags:** `@leave`, `@smoke`

---

### Feature 2: Partial Day Leave

**Test Cases:**
- `Should apply for partial day leave (Morning)` - Morning-only leave
- `Should apply for partial day leave (Afternoon)` - Afternoon-only leave

**Validation:**
- Partial day checkbox is properly handled
- Partial option (Morning/Afternoon) is correctly selected
- Application succeeds with partial day settings

**Tags:** `@leave`

---

### Feature 3: View My Leave & Leave Balance

**Test Cases:**
- `Should view my leave requests and balance` - Display leave balance table
- `Should verify leave balance for all leave types` - Validate all leave type balances
- `Should verify minimum leave balance before applying` - Check sufficient balance exists

**Validation:**
- Leave balance table is visible and populated
- All leave types (CZL, Medical, Annual) show numeric balances
- Balance values are >= 0
- Minimum balance requirements can be verified

**Tags:** `@leave`, `@smoke`

---

### Feature 4: Search & Filter Leave Requests

**Test Cases:**
- `Should search leave requests by employee name` - Search functionality
- `Should filter leave requests by status` - Status filtering (Pending, Approved, etc.)
- `Should reset search filters` - Clear all filters

**Validation:**
- Search by employee name works correctly
- Status filter correctly narrows results
- Reset button clears all filters
- Results table is visible and populated

**Tags:** `@leave`

---

### Feature 5: Approve & Reject Leave Requests

**Test Cases:**
- `Should approve a pending leave request` - Manager/Admin approval workflow
- `Should reject a leave request with reason` - Manager/Admin rejection with reason

**Validation:**
- Pending leave requests can be approved
- Leave rejection with reason is recorded
- Success notification shown after action
- Leave status is updated correctly

**Tags:** `@leave`, `@boundary`

**Requirements:** Manager or Admin role needed for approval/rejection tests

---

### Feature 6: Leave Entitlements

**Test Cases:**
- `Should view leave entitlements configuration` - Display entitlements page
- `Should verify leave entitlements for current year` - Validate entitlement records

**Validation:**
- Entitlements page loads correctly
- Entitlement records are displayed
- Current year entitlements are accessible
- Entitlement configuration is visible

**Tags:** `@leave`, `@boundary`

---

### Feature 7: Boundary Tests & Edge Cases

**Test Cases:**
- `Should validate leave date range` - Single day leave (from date = to date)
- `Should handle consecutive leave applications` - Back-to-back leave requests
- `Should validate maximum leave duration` - Extended leave periods (30+ days)

**Validation:**
- Single day leave is accepted
- Consecutive applications are handled
- Extended leave duration validation works
- System-specific constraints are respected

**Tags:** `@leave`, `@boundary`

---

### Feature 8: Leave Request Lifecycle

**Test Cases:**
- `Should complete full leave lifecycle: Apply -> Approve` - Complete workflow

**Validation:**
- Leave can be applied for
- Applied leave appears in My Leave view
- Leave visible in Leave List for managers
- Complete end-to-end flow is functional

**Tags:** `@leave`

---

## 🚀 Running Leave Tests

### Run All Leave Tests
```bash
npm run test:leave
```

### Run Specific Leave Test Tag
```bash
# Run only smoke tests tagged with @leave
npx playwright test --grep "@leave.*@smoke"

# Run only boundary tests
npx playwright test --grep "@leave.*@boundary"
```

### Run Single Test File
```bash
npx playwright test tests/leave/leave.spec.ts
```

### Run with Debug Mode
```bash
npx playwright test tests/leave/leave.spec.ts --debug
```

### Run with Headed Browser
```bash
npx playwright test tests/leave/leave.spec.ts --headed
```

### Run with UI Mode (Interactive)
```bash
npx playwright test tests/leave/leave.spec.ts --ui
```

---

## 📊 Test Statistics

| Metric | Value |
|--------|-------|
| Total Test Cases | 19 |
| Smoke Tests | 3 |
| Boundary Tests | 4 |
| Feature Coverage | 8 |
| Leave Types Covered | 3 (CZL, Medical, Annual) |
| Partial Day Options | 2 (Morning, Afternoon) |

---

## 🔑 Key Page Object Methods

### LeavePage Class

#### Navigation
- `navigateToApplyLeave()` - Go to Apply Leave tab
- `navigateToMyLeave()` - Go to My Leave tab
- `navigateToLeaveList()` - Go to Leave List (manager view)
- `navigateToEntitlements()` - Go to Leave Entitlements

#### Leave Application
- `applyForLeave(type, fromDate, toDate, comment?)` - Apply for full-day leave
- `applyForPartialLeave(type, date, option, comment?)` - Apply for partial day leave

#### Leave Balance
- `getLeaveBalance(leaveType)` - Get balance for specific leave type
- `expectLeaveBalanceGreaterThan(type, minBalance)` - Verify minimum balance

#### Search & Filter
- `searchLeaveByEmployeeName(name)` - Search by employee
- `filterLeaveByStatus(status)` - Filter by status
- `resetSearchFilters()` - Clear all filters

#### Approval & Rejection
- `approveLeaveRequest(employeeName)` - Approve leave
- `rejectLeaveRequest(employeeName, reason?)` - Reject with optional reason

#### Verification
- `expectLeaveApplicationSuccess()` - Verify success notification
- `expectLeaveRequestInTable(name, shouldExist?)` - Verify leave in table
- `getPendingLeaveCount()` - Count pending leave requests

---

## 📝 Test Data

### Leave Types Supported
- **CZL** - Casual Leave
- **Medical Leave** - Medical/sick leave
- **Annual Leave** - Vacation/annual leave

### Leave Date Calculations
Tests automatically calculate future dates for leave applications:
- **futureDate** - Tomorrow (for immediate leave)
- **futureDate2** - 7 days from today (for longer leave)
- Dynamic date generation for edge case testing

### Comments
All leave applications include meaningful comments describing the leave reason (e.g., "Medical checkup appointment", "Annual leave for vacation").

---

## ⚙️ Environment Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Playwright browsers installed

### Installation
```bash
cd OrangeHRMadvance
npm install
npx playwright install
```

### Test Credentials
Default credentials from `.env.local`:
- **Username:** Admin (or set via ADMIN_USERNAME env var)
- **Password:** admin123 (or set via ADMIN_PASSWORD env var)

---

## 🔍 Debugging Failed Tests

### View Test Report
```bash
npm run test:report
```

### Enable Trace Viewer
```bash
npx playwright show-trace path/to/trace.zip
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Leave type not found | Verify leave types are configured in system (CZL, Medical, Annual) |
| Date validation error | Ensure dates are in YYYY-MM-DD format and are future dates |
| "Leave List" tab not visible | May require manager/admin role |
| Approval tests fail | Ensure logged-in user has manager/approval permissions |
| Balance shows as 0 | Check leave entitlements are configured for the user |

---

## 🎯 Best Practices

1. **Date Handling:** Tests automatically calculate future dates to avoid conflicts with past dates
2. **Dynamic Data:** Leave applications use unique identifiers to prevent duplicates
3. **State Isolation:** Each test is independent and doesn't rely on previous test results
4. **Error Handling:** Tests gracefully handle optional features (e.g., if entitlements are not visible)
5. **Logging:** Comprehensive console logging tracks each action for debugging

---

## 📈 Future Enhancements

- [ ] API-based leave application for faster testing
- [ ] Leave carryforward & holiday management tests
- [ ] Leave policy configuration tests
- [ ] Leave analytics & reporting tests
- [ ] Multi-user leave conflict detection tests
- [ ] Leave quota vs. application validation tests
- [ ] Leave deduction & balance calculation verification
- [ ] Holiday calendar integration tests

---

## 📞 Support

For issues or questions about leave tests:
1. Check the Playwright trace viewer output
2. Review test logs in the HTML report
3. Run with `--debug` flag for step-by-step debugging
4. Ensure all prerequisites are installed and configured

---

**Last Updated:** 2026-06-15  
**Module Version:** 1.0.0  
**Status:** ✅ Production Ready
