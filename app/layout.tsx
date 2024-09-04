import type { Metadata } from "next";
import { Inter, Roboto, Raleway, Poppins } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: "900" });
const raleway = Raleway({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: "600" })

export const metadata: Metadata = {
  title: "Asset Inventory Number Generator",
  description: "Generate asset inventory numbers according to Maldivian Public Finance Regulation (PFR)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-full ${raleway.className} overflow`}>
        <h1 className={`${roboto.className} text-center text-[2rem] mt-12 mx-7`}>Generate Asset Inventory Number</h1>
        {children}

        {/* <footer className="mx-5 ">
          <div className="flex text-xs opacity-50 italic place-items-center">© 2024 Nauf's</div>
        </footer>   */}
      </body>
    </html>
  );
}
