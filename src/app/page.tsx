import Hero from '@/components/Hero';
import About from '@/components/About';
import PersonalShowcase from '@/components/PersonalShowcase';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PersonalShowcase />
      <Contact />
    </main>
  );
}
