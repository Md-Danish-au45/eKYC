
import HomePageHeader from "./homeComponents/Header"
import ServicesSection from "./homeComponents/ServiceSection"
import PricingSection from "./homeComponents/PriceSection"
import StatsBanner from "./homeComponents/StatsBanner"
import TrustSection from "./homeComponents/TrustSection"
import CustomerReviews from "./homeComponents/CustomerReviewSection"
import LandingPageFooter from "./homeComponents/Footer"
import SubscriptionSection from "./homeComponents/SubsciptionSection"
import FAQSection from "./homeComponents/FAQSection"
import ServicesShowcase from "./homeComponents/ServiceShowCaseComponent"
import HeroSection from "./homeComponents/HeroSection"
import TopBar from "./homeComponents/TopBar"
import { useEffect } from "react"
import GoToTopButton from "./homeComponents/GoToTopButton"

export default function HomePage() {

useEffect(()=>{
     window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  },[])

  return (
    <div className="relative min-h-screen">

    

        <TopBar />
      
        <HomePageHeader />
        <HeroSection/>
        <ServicesSection/>
        <ServicesShowcase/>
        <PricingSection/>
        <StatsBanner/>
        <TrustSection/>
        <CustomerReviews/>
        <FAQSection/>
        <SubscriptionSection/>
        <LandingPageFooter/>
        <GoToTopButton/>


    </div>
  )
}