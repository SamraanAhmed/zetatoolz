import './globals.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Zeta Toolz | Dental, Beauty, Embroidery & Lock Picking Tools Manufacturer',
  description: 'Zeta Toolz is a manufacturer and exporter of premium dental instruments, beauty instruments, embroidery tools and lock picking tools from Sialkot, Pakistan. We provide OEM manufacturing, private label and wholesale solutions for distributors worldwide.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="flex-grow pt-52 md:pt-48 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
