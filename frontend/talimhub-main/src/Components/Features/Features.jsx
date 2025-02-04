import './Features.css'
import ai from '../../assets/website/ais.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
const Features = () => {
  const { t } = useTranslation()
  const { heading, cardheading, cardheading2, cardheading3, button } = t('feature')
  const FeaturesData = [
    {
      name: `${t(cardheading)}`,
      icon: (
        <svg
          className="size-20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>

      ),
      link: "#",
      aosDelay: "300",
    },
    {
      name: `${t(cardheading2)}`,

      icon: (
        <img className="size-20" id="img" fill="none" style={{ color: '', padding: '' }} src={ai} alt="ai photo" />
      ),
      link: "#",
      aosDelay: "500",
    },
    {
      name: `${t(cardheading3)}`,
      icon: (
        <svg
          className="size-20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
          />
        </svg>
      ),
      link: "#",
      aosDelay: "700",
    },
  ];
  return (
    <>
      <div className="container py-14 sm:min-h-[600px]">
        <div>
          <h1
            data-aos="fade-up"
            className="text-3xl font-bold dark:text-white text-center sm:text-4xl text-slate-600 mb-12"
          >
            {t(heading)}
          </h1>

          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {FeaturesData.map((data, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-gray-800 hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300"
              >
                <div className="grid place-items-center"> {data.icon}</div>
                <h1 className="text-2xl">{data.name}</h1>
                <p>{data.description}</p>
                <Link
                  to="/howtoworks"
                  className="text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                >
                  {t(button)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
