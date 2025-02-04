import Hero from '../../Components/Hero/Hero'
import Quotes from '../../Components/Quotes/Quotes'
import Banner from '../../Components/Banner/Banner'
import Features from '../../Components/Features/Features'
import Features2 from '../../Components/Features/Features2'

import { Helmet } from 'react-helmet-async';
import AdsRating from '../../Components/AdsRating/AdsRating';
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Talimhub</title>
        <meta name="description" content="Talimhub offers comprehensive English learning including speaking, listening, reading and writing skills services in Uzbekistan." />
        <meta property="og:title" content="Talimhub - Your Trusted English learning Provider in Uzbekistan" />
        <meta property="og:description" content="Talimhub offers comprehensive English learning including speaking, listening, reading and writing skills services in Uzbekistan." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Talimhub - Your Trusted English learning Provider in Uzbekistan" />
        <meta name="twitter:description" content="Talimhub offers comprehensive English learning including speaking, listening, reading and writing skills services in Uzbekistan." />
      </Helmet>
      <Hero />
      <Quotes />
      <Banner />
      <br></br>
      <br></br>
      <br></br>
      <AdsRating />
      <Features />
      <Features2 />

    </>
  )
}

export default Home