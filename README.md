# React CRUD with localStorage

A minimal notes app: create, read, update, and delete notes, saved in the browser's localStorage.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## How it works

All logic is in `src/App.jsx`:

- **Read**: `loadNotes()` reads from localStorage as the initial state.
- **Create / Update**: the form adds a note, or saves changes when editing.
- **Delete**: removes a note by id.
- **Persist**: a `useEffect` writes `notes` to localStorage whenever they change.
