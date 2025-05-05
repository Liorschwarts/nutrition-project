// app/layout.jsx
import { Inter } from "next/font/google";
import Link from "next/link";
import "../styles/global.css";

// Load the Inter font
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the entire site
export const metadata = {
  title: "Diabetes Carb Calculator",
  description: "Calculate insulin units based on carbohydrate content in food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 font-sans leading-relaxed min-h-screen flex flex-col`}
      >
        <header className="bg-blue-600 p-4 text-white shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-3xl font-extrabold text-center md:text-left">
              Diabetes Carb Calculator
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/food-database"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Food Database
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-300 transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg mt-6 flex-1 max-w-4xl">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="container mx-auto px-4">
            <p className="text-center">
              &copy; {new Date().getFullYear()} Diabetes Carb Calculator. All
              rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
