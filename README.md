# PHP Notepad (Mysqli, single-file forms)

A minimal notes app with login, registration, and a notepad — each page handles
its own form submissions inline (no separate `logout.php`, `add-note.php`, etc.).

## Files
- `config.php` — mysqli connection + session start + `isLoggedIn()` / `requireLogin()` helpers
- `schema.sql` — creates the `php_notepad` database with `users` and `notes` tables
- `register.php` — registration form + handling (hashed passwords, duplicate-username check)
- `login.php` — login form + handling (password_verify, session_regenerate_id)
- `index.php` — the notepad itself: add / edit / delete notes, plus logout, all via `?action=`
- `style.css` — shared styling

## How the "no extra files" part works
- **Logout**: a link to `index.php?action=logout` — index.php checks `$_GET['action']` and destroys the session.
- **Edit**: a link to `index.php?action=edit&id=N` — index.php loads that note into the form above the list.
- **Delete**: a link to `index.php?action=delete&id=N` — index.php deletes it and redirects (PRG pattern).
- **Add/Update**: same `<form method="POST" action="index.php">` — a hidden `note_id` field tells the
  handler whether to `INSERT` (id = 0) or `UPDATE` (id > 0).

## Setup
1. Import `schema.sql` into MySQL (e.g. `mysql -u root -p < schema.sql`, or paste it into phpMyAdmin).
2. Update the DB credentials at the top of `config.php` if needed (defaults assume XAMPP: `root` / no password).
3. Drop this folder into your server's web root (e.g. `htdocs/php-notepad`).
4. Visit `register.php` to create an account, then `login.php`.

## Security notes (for teaching)
- All queries use **prepared statements** (mysqli `?` placeholders) — no raw string concatenation.
- Passwords are stored with `password_hash()` / verified with `password_verify()` — never plaintext.
- `session_regenerate_id(true)` is called on login to prevent session fixation.
- Every note query filters by `user_id` too, not just note `id` — this prevents one user from
  editing/deleting another user's notes by guessing IDs (an IDOR fix).
- Output is escaped with `htmlspecialchars()` everywhere it's echoed back, to prevent XSS.
- The Post/Redirect/Get (PRG) pattern is used after every POST to avoid duplicate submissions on refresh.
