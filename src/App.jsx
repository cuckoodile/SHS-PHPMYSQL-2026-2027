import { useEffect, useState } from "react";

const STORAGE_KEY = "notes";

// JSON.parse:    JSON -> JS
// JSON.stringify:    JS -> JSON

// READ: load saved notes (runs once, as the initial state)
function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem("notes")) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Persist to localStorage whenever notes change
  useEffect(() => {
    let jsonNote = JSON.stringify(notes);
    localStorage.setItem("notes", jsonNote);
    // localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // CREATE or UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    const value = text.trim();
    if (!value) return;

    if (editingId) {
      setNotes(
        notes.map((n) => (n.id === editingId ? { ...n, text: value } : n)),
      );
      setEditingId(null);
    } else {
      setNotes([{ id: Date.now(), text: value }, ...notes]);
    }

    setText("");
  };

  // Start editing: load the note into the input
  const startEdit = (note) => {
    setEditingId(note.id);
    setText(note.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setText("");
  };

  // DELETE
  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <main className="app">
      <h1>Notes</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note"
          aria-label="Note text"
        />
        <button type="submit">{editingId ? "Save changes" : "Add note"}</button>
        {editingId && (
          <button type="button" className="secondary" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {/* Ternary Operation      condition ? (if true) : (if false) */}

      {notes.length === 0 ? (
        <p className="empty">No notes yet. Add your first one above.</p>
      ) : (
        <ul className="list">
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.text}</span>
              <div className="actions">
                <button className="secondary" onClick={() => startEdit(note)}>
                  Edit
                </button>
                <button className="danger" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
