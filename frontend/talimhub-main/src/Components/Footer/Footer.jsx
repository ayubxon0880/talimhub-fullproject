import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaMobileAlt,
  FaTelegram,
} from "react-icons/fa";
import ScrollTop from "../Scrool/ScroolTop";
import logo from "../../assets/website/logo.png";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  const { heading, location } = t("footer");
  return (
    <>
      <div className="footer bg-gray-200 dark:bg-gray-800 mt-14 rounded relative bottom-0">
        <div data-aos="fade" className="container ">
          <div className="grid md:grid-cols-3 py-4">
            {/* company Details */}
            <div className="py-8 px-4">
              <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                <img className="md:h-16 h-12 object-cover" src={logo} alt="" />
              </h1>
              <p className="text-md">
                {t(heading)}
              </p>
              <br />
              {/* contact section */}
              <div>
                {/* <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>
                    {t(location)}
                  </p>
                </div> */}
                <div className="flex items-center gap-3">
                  <FaMobileAlt />
                  <a href="tel:903623445">+998903623445</a>
                </div>
              </div>
              {/* social handle */}
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.instagram.com/ayubxon.1401/">
                  <FaInstagram className="text-3xl hover:text-primary duration-300" />
                </a>
                <a href="https://t.me/talimhub">
                  <FaTelegram className="text-3xl hover:text-primary duration-300" />
                </a>
              </div>
            </div>
            {/* Footer Links section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
    </>
  );
};

export default Footer;
