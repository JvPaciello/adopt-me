import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Gallery from './components/Gallery';
import Steps from './components/Steps';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import DonationCTA from './components/DonationCTA';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { DogsProvider } from './context/DogsContext';


export default function App() {
  return (
    <DogsProvider>

        <Header />
        <Hero />
        <TrustBar />
        <About />
        <Gallery />
        <Steps />
        <Testimonials />
        <Faq />
        <DonationCTA />
        <ContactForm />
        <Footer />

    </DogsProvider>
  );
}
