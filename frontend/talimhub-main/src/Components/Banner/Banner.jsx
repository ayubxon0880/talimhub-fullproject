
import i18next from 'i18next';
import { Trans, useTranslation } from 'react-i18next'
import img from '../../assets/website/analysis.png'
const Banner = () => {
  const { t } = useTranslation()

  return (
    <div className="container grid grid-cols-1 items-center  sm:grid-cols-2 md:grid-cols-2 gap-10 ">
      <img className="mx-auto object-cover" src={img} alt="" />
      <div className="order-2 sm:order-1 space-y-2 lg:pr-20 relative z-30">
        <h1 data-aos="fade-up" className="sm:text-[60px] font-semibold md:text-[20px]">
          {" "}
          <span className="bg-clip-text  text-transparent text-[30px] md:text-[34px] lg:text-[50px] leading-tight bg-gradient-to-r from-primary to-secondary">
            {t('hero')}
          </span>
        </h1>
        <p  data-aos="fade-up" data-aos-delay="300" className='md:text-[20px] dark:text-white text-slate-600'>
          {t('subhero')}
        </p>
        <div className="flex gap-6">
          <button
            data-aos="fade-up"
            data-aos-delay="500"
            className="primary-btn"
          >
            {t('click')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;