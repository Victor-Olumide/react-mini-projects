import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "React Mini Projects",
  description: "Volts react mini projects(BMI Calculator, Character Counter, Password Generator, Quiz App, Tic Tac Toe) created by Victor-Olumide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="VO React" />
      </head>
      
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
