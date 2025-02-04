import { useTranslation } from "react-i18next";
import bg from "../../assets/website/logo.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="py-12 h-auto sm:py-0 duration-300 overflow-hidden ">
        <div className="container min-h-[700px] flex relative mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-10">
            {/* hero text section */}
            <div className="order-2 sm:order-1 space-y-5 lg:pr-20 relative">
              <h1
                data-aos="fade-up"
                className="text-3xl md:text-6xl font-extrabold text-gray-800 dark:text-slate-100"
              >
                {t("heading")} 
              </h1>
              <p
                className="text-[20px] text-slate-600 dark:text-white"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {t("subheading")}
              </p>
              <div className="flex gap-6 z-10">
                <Link to={'https://t.me/talimhub_bot'}
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="primary-btn"
                >
                  {t("click")}
                </Link>
              </div>
            </div>
            {/* image section */}
            <div
              data-aos="fade-up"
              data-aos-offset="0"
              className="order-1 sm:order-2"
            >
              <img src={bg} alt="" />
            </div>
          </div>

          {/* Animated Blob */}
          <div className="h-[300px] w-[300px] bg-gradient-to-r from-secondary to-primary rounded-full absolute top-20 blur-3xl animated-wrapper"></div>
        </div>
      </div >
    </>
  );
};

export default Hero;
