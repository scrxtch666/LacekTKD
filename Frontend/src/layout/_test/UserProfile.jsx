import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserProfile() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <> {/* Přidán Fragment pro obalení prvků */}
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm pe-1 font-medium text-heading rounded-full hover:text-fg-brand md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="/docs/images/people/profile-picture-5.jpg"
          alt="user"
        /> {/* img musí být uzavřen */}
        Joseph McFall
        <svg
          className="w-4 h-4 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round" // camelCase
            strokeLinejoin="round" // camelCase
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu - Komentář opraven na JSX formát */}
      <div
        id="dropdownAvatarName"
        className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-72"
      >
        <div className="p-2">
          <div className="flex items-center px-2.5 p-2 space-x-1.5 text-sm bg-neutral-secondary-strong rounded">
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-5.jpg"
              alt="Rounded avatar"
            />
            <div className="text-sm">
              <div className="font-medium text-heading">{fighter.name} {fighter.surname} </div>
              <div className="truncate text-body">{user.email}</div>
            </div>
            <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded ms-auto">
              PRO
            </span>
          </div>
        </div>
        <ul
          className="px-2 pb-2 text-sm text-body font-medium"
          aria-labelledby="dropdownAvatarNameButton"
        >
          <li>
            <Link
              to="#"
              className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
              Account
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
            >
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/></svg>
              Settings
            </Link>
          </li>
          
          {/* ... další položky seznamu (zkráceno pro přehlednost) ... */}

          <li className="flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded mb-1.5">
            <Link to="#" className="inline-flex items-center">
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/></svg>
              Dark mode
            </Link>
            <label className="inline-flex items-center cursor-pointer ms-auto">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </li>

          <li className="border-t border-default-medium pt-1.5">
            <Link
              to="#"
              className="inline-flex items-center w-full p-2 text-fg-danger hover:bg-neutral-tertiary-medium rounded"
            >
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/></svg>
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserProfile;