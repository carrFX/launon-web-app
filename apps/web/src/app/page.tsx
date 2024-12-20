import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AboutUs from '@/components/(home)/AboutUs';
import Carousel from '@/components/(home)/Carousel';
import ChooseUs from '@/components/(home)/ChooseUs';
import Contact from '@/components/(home)/Contact';
import HowToOrder from '@/components/(home)/HowToOrder';
import Testimonial from '@/components/(home)/Testimonial';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <Carousel />
      <AboutUs />
      <ChooseUs />
      <HowToOrder />
      <Testimonial />
      <Contact />
    </main>
  );
}
