import LandingPage from '@/components/Landing';
import ChallengeSection from '@/components/Challenge';
import SolutionSection from '@/components/Solutions';
import BenefitsSection from '@/components/Benefits';
import ProductsSection from '@/components/Products';
import ServicesSection from '@/components/Services';
import ContactSection from '@/components/Contactus';
import { Navbar } from '@/ui/Navbar';

export default function Home() {
  return (
      <>
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="pt-20">
          <LandingPage />
          <ChallengeSection />
          <SolutionSection />
          <BenefitsSection />
          <ProductsSection />
          <ServicesSection />
          <ContactSection />
        </main>
      </>
  );
}