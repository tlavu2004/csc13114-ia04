import { useNavigate } from "react-router-dom";

export default function BackButton({ to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      window.history.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-blue-600 hover:text-blue-800 mb-4"
      aria-label="Back"
    >
      &larr; Back
    </button>
  );
}
