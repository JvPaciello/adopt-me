import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Steps from './components/Steps';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { DogsProvider } from './context/DogsContext';


export default function App() {
  return (
    <DogsProvider>

        <Header />
        <Hero />
        <Gallery />
        <Steps />
        <ContactForm />
        <Footer />

    </DogsProvider>
  );
}
