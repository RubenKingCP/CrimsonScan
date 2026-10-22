import { Navbar } from "../components/navbar/Navbar";
import "@/styles/globals.css";

// Root layout: wraps every page with <html>, fonts and the Navbar.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
