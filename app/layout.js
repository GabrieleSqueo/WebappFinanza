import localFont from "next/font/local";
import "./globals.css";
import {Inter, Poppins, Shrikhand} from "next/font/google"


const poppins = Poppins({subsets:["latin"], weight:["400"]})
const inter = Inter({ subsets: ['latin'], weight: ["400","900"] })



export const metadata = {
  title: "Gestione360",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
