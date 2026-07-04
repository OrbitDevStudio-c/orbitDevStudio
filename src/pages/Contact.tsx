import { Helmet } from 'react-helmet-async';
import ContactHero from '../components/sections/ContactHero';
import HireForm from '../components/sections/HireForm';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | OrbitDevStudio</title>
        <meta name="description" content="Get in touch with OrbitDevStudio to discuss your next big digital product." />
      </Helmet>
      
      <div className="relative min-h-screen bg-white">
        <ContactHero />
        <div className="section-white">
          <HireForm />
        </div>
      </div>
    </>
  );
}
