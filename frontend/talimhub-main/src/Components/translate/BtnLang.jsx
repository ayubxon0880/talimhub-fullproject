import { useTranslation } from "react-i18next";
import { useState } from "react";

const languages = [
  { lang: "en", code: "en" },
  { lang: "uz", code: "uz" },
  { lang: "ru", code: "ru" },
];

const SwitcherBtn = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('i18nextLng'));
  const [toggle, setToggle] = useState(false);
  const { i18n } = useTranslation();

  const handleChangeLanguage = (e) => {
    localStorage.setItem('i18nextLng', e)
    setSelectedLanguage(e)
    i18n.changeLanguage(e);
    setToggle(false)
  };
  const langToggle = () => {
    setToggle(!toggle)
  }
  return (
    <div className="relative inline-block text-left mr-auto md:m-auto">
      <div>
        <button type="button" className="inline-flex w-full rounded-md justify-center gap-x-1.5  px-3 py-2" id="menu-button" aria-expanded="true" aria-haspopup="true" tabIndex="-1"
          value={selectedLanguage}
          onClick={langToggle}
        >
          {selectedLanguage}
          <svg className={`-mr-1 h-5 w-5 text-gray-400 hover:scale-105  ${toggle ? '-rotate-180' : null} transition-all duration-200`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {toggle && <div className="absolute left-0-52 md:right-0 z-10 mt-2 w-32 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-gray-900" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        <div className="py-1" role="none">
          {languages.map((lng) => (
            <button className="px-10 w-full border-none hover:text-slate-400 hover:cursor-pointer" key={lng.code} value={lng.code} onClick={e => handleChangeLanguage(e.target.value)}>
              {lng.lang}
            </button>
          ))}
        </div>
      </div>
      }
    </div>
  );
};

export default SwitcherBtn;
