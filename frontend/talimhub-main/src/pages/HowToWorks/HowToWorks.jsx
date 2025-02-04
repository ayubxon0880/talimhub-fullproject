import { GoArrowDown } from "react-icons/go";
import { useTranslation } from "react-i18next";
import HowWorks from '../../Components/HowToWorks/HowWorks';
import { Helmet } from 'react-helmet-async';
function HowToWorks() {
  const { t } = useTranslation();
  const { heading, subheading } = t("how");
  return (
    <div className='h-full w-full mt-32 container'>
      <Helmet>
        <title>Talimhub - How it works</title>
        <meta name="description" content="Talimhub offers comprehensive English learning including speaking, listening, reading and writing skills services in Uzbekistan." />
        <meta property="og:title" content="Talimhub - Your Trusted English learning Provider in Uzbekistan" />
        <meta property="og:description" content="Talimhub offers comprehensive English learning including speaking, listening, reading and writing skills services in Uzbekistan." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Talimhub - Your Trusted English learning Provider in Uzbekistan" />
        <meta name="twitter:description" content="Talimhub offers comprehensive English learning including speaking, listening, reading and writing skills services in Uzbekistan." />
      </Helmet>
      <div>
        <h1 className="text-center bg-slate-30 tracking-widest md:p-2 rounded-3xl text-[30px] md:text-[50px] lg:text-[60px] text-blue-500 font-bold">
          {t(heading)}
        </h1>
        <GoArrowDown
          size={60}
          className="text-center border-[3px] mx-auto mt- rounded-full border-blue-500 size-8 md:size-10 lg:size-15 p-2 animate-bounce text-blue-600"
        />
      </div>
      <div className="p-2 mt-2 rounded-xl">
        <p className="text-center md:text-2xl mb-2 lg:text-3xl text-[20px] md:mt-4 font-semibold">
          {t(subheading)}
        </p>
        <HowWorks />
      </div>

    </div>
  )
}

export default HowToWorks