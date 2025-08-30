# SandCup DevQ Group Communication + Coding Challenge

## Goal
In groups of 4, collaborate to **make all tests pass** in the mini Contacts app. You will need to align on **specs**, **tests**, and **implementation** through clear communication.

## Files
- `index.html` — App shell and test UI
- `styles.css` — Styles
- `api.js` — Data layer (implement/adjust here)
- `app.js` — UI wiring to API
- `tests.js` — Automated tests (read-only during challenge)

## Roles (first 5 minutes are role-locked)
- **API Dev** — Owns `api.js`. Ensures contract + persistence + validation.
- **UI Dev** — Owns `index.html` & `app.js`. Ensures UI calls the right API, renders correctly

After 5 minutes, you may collaborate freely, but keep communicating *verbally* — don’t silently change files without alignment.

## What the system must do (acceptance criteria)
1. Add a contact with fields: **name**, **email**, **phone**.
2. **Validations:**
   - name: at least 2 characters
   - email: valid format
   - phone: **digits only**, length **10–13**
   - email must be **unique**
3. `getContacts()` returns **sorted by name ASC**.
4. `searchContacts(q)` is **case-insensitive** and searches **name OR email**.
5. `removeContact(email)` removes a contact by email and returns **true/false**.
6. Data is persisted in **localStorage** under key **`contacts_v1`** and survives reload.

## How to run
Open `index.html` in a modern browser (offline). Click **Run tests**. Fix code until all tests turn green.

## Tips
- Inspect console logs for hints.
- Keep the **API contract** in sync with **tests** and **UI** calls.
- Small mismatches (like a storage key) can break persistence tests.

## Scoring rubric
- 0–2 tests passed: Emerging
- 3–4: Basic
- 5–6: Solid
- All 7+: Excellent

Bonus points for:
- Clear verbal alignment (judge listens for this),
- Clean, commented code,
- Defensive coding and edge cases.
