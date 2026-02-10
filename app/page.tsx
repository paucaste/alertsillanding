import Header from '../components/Header';
import Hero from '../components/Hero';
import AlertDemo from '../components/AlertDemo';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AlertDemo />
      <Features />
      <Pricing />
      <CallToAction />
      <ContactForm />
      <Footer />
    </main>
  );
}