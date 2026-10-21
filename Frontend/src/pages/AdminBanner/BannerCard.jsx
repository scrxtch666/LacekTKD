import { Trash2, Eye, EyeOff } from "lucide-react";

function BannerCard({
  banner,
  index,
  isDeleting,
  onDelete,
  onToggleActive,
  isToggling,
  API,
}) {
  const banNumber = index + 1;

  // Karta uživatele
  return (
    <div className="space-y-4">
      <div
        key={banner.id}
        className={`bg-customWhite rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 ${
          !banner.active ? "opacity-60" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold">
              {banNumber}
            </span>
          </div>

          <div className="flex-shrink-0 relative">
            <img
              src={`${API}${banner.img_path}`}
              alt={banner.banner_name}
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
            />
            {!banner.active && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <EyeOff className="text-white" size={32} />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-gray-500 mb-1">Název banneru</p>
            <p className="text-lg font-semibold text-gray-800">
              {banner.banner_name}
            </p>
            <div className="mt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  banner.active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {banner.active ? "Aktivní" : "Neaktivní"}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onToggleActive}
              disabled={isToggling}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                banner.active
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {banner.active ? <EyeOff size={18} /> : <Eye size={18} />}
              <span>
                {isToggling ? "..." : banner.active ? "Skrýt" : "Zobrazit"}
              </span>
            </button>

            <button
              onClick={onDelete}
              disabled={isDeleting === banner.id}
              className="deleteBtn disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
              <span>{isDeleting === banner.id ? "Mažu..." : "Smazat"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerCard;
