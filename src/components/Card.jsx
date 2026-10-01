export default function Card({
  user,
  isEditing,
  setEditing,
  onDelete,
  isLocked,
}) {
  return (
    <div
      className={`border-2 p-3 flex flex-col gap-3 rounded-lg text-3xl ${isEditing ? "border-green-500" : ""}`}
    >
      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Age: {user.age}</p>

      <div className="flex gap-3">
        <button
          disabled={isLocked}
          onClick={() => setEditing(user.id)}
          className="bg-green-800"
        >
          Edit
        </button>
        <button
          disabled={isLocked}
          onClick={() => onDelete(user.id)}
          className="bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
