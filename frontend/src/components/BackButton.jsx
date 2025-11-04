export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="mb-2 text-sm text-gray-600 hover:underline"
      aria-label="Back"
    >
      ← Back
    </button>
  );
}
