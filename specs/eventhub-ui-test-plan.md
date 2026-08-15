# EventHub UI Test Plan

## Overview
This test plan covers UI test cases for the EventHub practice application.
It includes login, registration, authenticated home, events listing, event detail/booking, bookings page, and logout/session protection.

### Test account
- Email: `hrithik123@gmail.com`
- Password: `Hrithik@123`

---

## 1. Login Page

### Page elements
- Email input
- Password input
- `Sign In` button
- `Register` link
- page headline and instructions

### Positive test cases
1. Login with valid email and valid password.
   - Expect redirect to authenticated home page.
   - Expect user email displayed.
   - Expect navigation menu items present: `Home`, `Events`, `My Bookings`, `API Docs`, `Logout`.

### Negative test cases
2. Submit with both email and password blank.
   - Expect error messages or validation feedback.
3. Submit with blank email and valid password.
   - Expect email required validation.
4. Submit with valid email and blank password.
   - Expect password required validation.
5. Submit with invalid email format.
   - Examples: `hrithik123`, `hrithik@`, `@gmail.com`, `hrithik@gmail`.
   - Expect email format validation.
6. Submit with valid email and incorrect password.
   - Expect authentication failure message.
7. Submit with non-existent email.
   - Expect authentication failure or account not found message.
8. Enter special character or script content in inputs.
   - Expect safe validation and no page breakage.

### Edge case test cases
9. Enter email and password with leading/trailing spaces.
   - Expect either trimming or validation consistent behavior.
10. Enter extremely long values in email and password fields.
   - Expect field limit or graceful validation handling.
11. Click `Sign In` twice quickly.
   - Expect only one login submission.
12. Use browser back after logout and verify protected pages are not accessible.

---

## 2. Registration Page

### Page elements
- Email input
- Password input
- Confirm Password input
- Password strength hints:
  - At least 8 characters
  - One uppercase letter
  - One number
  - One special character
- `Create Account` button
- `Sign in` link

### Positive test cases
1. Register with valid email, valid password, and matching confirm password.
   - Expect account creation success or redirect to login.
2. Use password that satisfies all strength requirements.
   - Expect success and no validation errors.

### Negative test cases
3. Submit with all fields blank.
   - Expect validation for required fields.
4. Submit with blank email.
   - Expect email required validation.
5. Submit with blank password.
   - Expect password required validation.
6. Submit with blank confirm password.
   - Expect confirm password required validation.
7. Submit with password shorter than 8 characters.
   - Expect length validation.
8. Submit with password missing uppercase.
   - Expect uppercase requirement validation.
9. Submit with password missing number.
   - Expect number requirement validation.
10. Submit with password missing special character.
    - Expect special character requirement validation.
11. Submit with password and confirm password mismatch.
    - Expect mismatch validation.
12. Submit with invalid email format.
    - Expect email format validation.
13. Submit with an already registered email (if supported).
    - Expect account exists or duplicate email validation.

### Edge case test cases
14. Register with a password exactly 8 characters long meeting all rules.
15. Register with unusual but valid special characters.
16. Enter uppercase letters in email.
17. Use copy/paste to fill password and confirm password with mismatch.
18. Submit with inputs containing only whitespace.

---

## 3. Authenticated Home Page

### Page elements
- Page header: `Discover & Book Amazing Events`
- Quick links/buttons: `Browse Events →`, `My Bookings`
- Featured event cards
- Navigation bar with `Home`, `Events`, `My Bookings`, `API Docs`, `Admin`, user email, `Logout`

### Positive test cases
1. After successful login, verify home page content loads.
   - Expect featured events visible.
   - Expect `Browse Events →` and `My Bookings` links present.
2. Verify logged-in user email is shown in UI.
3. Verify navigation menu items are present.

### Negative/edge test cases
4. Navigate directly to `/` without login.
   - Expect redirect to login or login page shown.
5. Verify external link `API Docs` opens the Swagger page.
6. Refresh home page after login and confirm content remains available.

---

## 4. Events Listing Page

### Page elements
- Event cards list
- Each card should show title, date, venue, price, seats left
- `Book Now` links/buttons
- `View all →` or similar event navigation

### Positive test cases
1. Navigate to `/events` and verify event cards render.
2. Click on event title or `Book Now` and verify event detail page opens.
3. Verify event card format is consistent across multiple cards.

### Edge test cases
4. Verify events page loads when user is logged in.
5. Verify direct event detail URLs such as `/events/3` load correctly.
6. Validate event cards render with dates, venues, prices, and available seats.

---

## 5. Event Detail / Booking Flow

### Page elements
- Event title and description
- Date and venue
- Price and availability
- Booking CTA or button
- Event detail navigation

### Positive test cases
1. Open an event detail page and verify title, date, venue, price, and booking CTA.
2. Click the booking button and verify booking success or next steps.
3. Verify the event is added to `My Bookings` after booking.

### Negative/edge test cases
4. If event booking is blocked or sold out, verify proper message or disabled action.
5. Refresh the event detail page and verify content remains displayed.
6. Attempt booking while not logged in (if not already authenticated) and verify redirect to login.

---

## 6. My Bookings Page

### Page elements
- Booking history table or cards
- Event name, date, status, quantity
- Booking details

### Positive test cases
1. Navigate to `/bookings` and verify bookings list appears.
2. Confirm at least one valid booking row or a no-bookings state.
3. Verify the page is accessible only while authenticated.

### Edge test cases
4. Validate the no-bookings state if the account has no bookings.
5. Refresh the page and verify content remains accessible.

---

## 7. Logout and Session Protection

### Page elements
- `Logout` button
- Session-dependent navigation

### Positive test cases
1. Click `Logout` and verify redirect to login page.
2. Verify user email is not shown after logout.
3. Verify protected pages `/events` and `/bookings` require login after logout.

### Edge test cases
4. After logout, click browser back and verify authenticated page is not accessible.
5. Attempt direct URL access to `/bookings` or `/events` after logout and expect login prompt.

---

## Additional notes
- Prefer using stable locators for automation: input placeholders, button text, headings, and link text.
- Validate UI content, navigation flow, and form feedback.
- Keep the test plan focused on behavior, not implementation details.
