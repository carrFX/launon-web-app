import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from '@/redux/StoreProvider';
const inter = Inter({ subsets: ['latin'] });
import dotenv from 'dotenv';
dotenv.config();
export const metadata: Metadata = {
  title: 'LaunON.',
  description: 'Owned and operated by LaunON Style',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          <Header/>
          {children}
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            closeOnClick
            draggable
          />
        </StoreProvider>
      </body>
    </html>
  );
}
