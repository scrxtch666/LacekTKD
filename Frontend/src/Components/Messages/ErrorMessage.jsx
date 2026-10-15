import React from "react";
import { OctagonAlert } from "lucide-react";
function ErrorMessage({ message }) {
  return (
    <>
      <div className="mx-6 mt-4 mb-2">
        <div className="w-full bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 flex-shrink-0">
            <OctagonAlert size={18} className="text-red-700" />
          </div>

          <div className="text-sm text-red-800">
            <strong>Chyba:</strong> {message}
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorMessage;
