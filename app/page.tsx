import Header from '../components/Header';
import Hero from '../components/Hero';
import TargetAudience from '../components/TargetAudience';
import Features from '../components/Features';
import TrustBadges from '../components/TrustBadges';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TargetAudience />
      <Features />
      <TrustBadges />
      <Pricing />
      <CallToAction />
      <ContactForm />
      <Footer />
    </main>
  );
}
