import React from "react";
import { Check } from "lucide-react";
function SuccessMessage({ message }) {
  return (
    <>
      <div className="mx-6 mt-4 mb-2">
        <div className="w-full bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 flex-shrink-0">
            <Check size={18} className="text-green-700" />
          </div>

          <div className="text-sm text-green-800">
            <strong>Úspěch:</strong> {message}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessMessage;
