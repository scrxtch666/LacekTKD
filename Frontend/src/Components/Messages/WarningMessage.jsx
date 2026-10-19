import { TriangleAlert } from "lucide-react";
function WarningMessage({ message }) {
  return (
    <>
      <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-yellow-100 flex-shrink-0">
          <TriangleAlert size={18} className="text-yellow-700" />
        </div>

        <div className="text-sm text-yellow-800">
          <strong>Upozornění:</strong> {message}
        </div>
      </div>
    </>
  );
}

export default WarningMessage;
