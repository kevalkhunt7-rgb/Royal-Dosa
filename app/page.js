import AboutSection from "@/Component/About"
import ContactSection from "@/Component/Contactsection"
import CustomerReviews from "@/Component/Customerreviews"
import DistributorOpportunity from "@/Component/Distributoropportunity"
import Footer from "@/Component/Footer"
import HeroSection from "@/Component/Hero"
import OurGallery from "@/Component/Ourgallery"
import PremiumProduct from "@/Component/Premiumproduct"
import QualityBall from "@/Component/Qualityball"
import RetailerBenefits from "@/Component/Retailerbenefits"

function Home() {
  return (
    <div className="overflow-x-hidden w-full">
      <HeroSection />
      <AboutSection />
      <PremiumProduct />
      <QualityBall />
      <DistributorOpportunity />
      <RetailerBenefits />
      <OurGallery />
      <CustomerReviews />
      <ContactSection />
      <Footer />
    </div>
  );
}
export default Home;