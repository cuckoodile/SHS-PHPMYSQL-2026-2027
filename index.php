<?php
require "config.php";
requireLogin();

$user_id = $_SESSION['user_id'];
$error = "";

// ----- Handle logout (GET) -----
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_unset();
    session_destroy();
    header("Location: login.php");
    exit();
}

// ----- Handle delete note (GET) -----
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    $note_id = (int) $_GET['id'];
    $stmt = mysqli_prepare($conn, "DELETE FROM notes WHERE id = ? AND user_id = ?");
    mysqli_stmt_bind_param($stmt, "ii", $note_id, $user_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("Location: index.php");
    exit();
}

// ----- Handle add / edit note (POST) -----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $title   = trim($_POST['title'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $note_id = isset($_POST['note_id']) ? (int) $_POST['note_id'] : 0;

    if ($title === '') {
        $error = "Title is required.";
    } else {
        if ($note_id > 0) {
            // Update existing note (only if it belongs to this user)
            $stmt = mysqli_prepare($conn, "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?");
            mysqli_stmt_bind_param($stmt, "ssii", $title, $content, $note_id, $user_id);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        } else {
            // Insert new note
            $stmt = mysqli_prepare($conn, "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)");
            mysqli_stmt_bind_param($stmt, "iss", $user_id, $title, $content);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        }
        // PRG pattern: redirect after successful POST to avoid resubmission
        header("Location: index.php");
        exit();
    }
}

// ----- If editing, load the note being edited -----
$editing_note = null;
if (isset($_GET['action']) && $_GET['action'] === 'edit' && isset($_GET['id'])) {
    $note_id = (int) $_GET['id'];
    $stmt = mysqli_prepare($conn, "SELECT id, title, content FROM notes WHERE id = ? AND user_id = ?");
    mysqli_stmt_bind_param($stmt, "ii", $note_id, $user_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $editing_note = mysqli_fetch_assoc($result);
    mysqli_stmt_close($stmt);
}

// ----- Fetch all notes for this user -----
$stmt = mysqli_prepare($conn, "SELECT id, title, content, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC");
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$notes = mysqli_fetch_all($result, MYSQLI_ASSOC);
mysqli_stmt_close($stmt);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>My Notepad</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="app-container">

    <header class="app-header">
        <h1>📝 My Notepad</h1>
        <div class="user-bar">
            <span>Hi, <?= htmlspecialchars($_SESSION['username']) ?></span>
            <a href="index.php?action=logout" class="btn btn-logout">Logout</a>
        </div>
    </header>

    <section class="note-form-section">
        <h2><?= $editing_note ? "Edit Note" : "New Note" ?></h2>

        <?php if ($error): ?>
            <p class="alert alert-error"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>

        <form method="POST" action="index.php">
            <input type="hidden" name="note_id" value="<?= $editing_note ? (int)$editing_note['id'] : 0 ?>">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" value="<?= htmlspecialchars($editing_note['title'] ?? '') ?>" required>

            <label for="content">Content</label>
            <textarea id="content" name="content" rows="5"><?= htmlspecialchars($editing_note['content'] ?? '') ?></textarea>

            <div class="form-actions">
                <button type="submit"><?= $editing_note ? "Update Note" : "Add Note" ?></button>
                <?php if ($editing_note): ?>
                    <a href="index.php" class="btn btn-cancel">Cancel</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="notes-list-section">
        <h2>Your Notes (<?= count($notes) ?>)</h2>

        <?php if (empty($notes)): ?>
            <p class="empty-state">No notes yet. Add one above!</p>
        <?php else: ?>
            <div class="notes-grid">
                <?php foreach ($notes as $note): ?>
                    <div class="note-card">
                        <h3><?= htmlspecialchars($note['title']) ?></h3>
                        <p><?= nl2br(htmlspecialchars($note['content'])) ?></p>
                        <small>Updated: <?= htmlspecialchars($note['updated_at']) ?></small>
                        <div class="note-actions">
                            <a href="index.php?action=edit&id=<?= (int)$note['id'] ?>" class="btn btn-edit">Edit</a>
                            <a href="index.php?action=delete&id=<?= (int)$note['id'] ?>"
                               class="btn btn-delete"
                               onclick="return confirm('Delete this note?');">Delete</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </section>

</div>
</body>
</html>
