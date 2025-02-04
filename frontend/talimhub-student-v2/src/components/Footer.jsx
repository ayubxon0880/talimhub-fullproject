import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Birinchi qator: kompaniya haqida ma'lumot */}
          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-lg font-bold mb-2">Biz haqimizda</h2>
            <p className="text-sm">
              Bizning platforma ta'lim sohasida xizmat
              ko'rsatadi. Maqsadimiz sizga eng yaxshi xizmatni taqdim etish.
            </p>
          </div>

          {/* Ikkinchi qator: ijtimoiy tarmoqlar */}
          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-lg font-bold mb-2">Ijtimoiy tarmoqlar</h2>
            <ul>
              <li>
                <a
                  href="https://t.me/talimhub"
                  className="text-blue-400 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/ayubxonobidov"
                  className="text-blue-400 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </li>
              {/* <li>
                <a
                  href="https://twitter.com"
                  className="text-blue-300 hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-pink-400 hover:text-pink-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li> */}
            </ul>
          </div>

          {/* Uchinchi qator: bog'lanish */}
          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-lg font-bold mb-2">Bog'lanish. Platforma bo'yicha muammo va takliflar uchun</h2>
            <p className="text-sm">Telefon: +998 90 362 34 45</p>
            <p className="text-sm">Email: ayubxonnt@gmail.com</p>
            <p className="text-sm">Email: wifvpersonal@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-4 text-center">
          <p className="text-sm">
            © 2024 Talimhub. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
