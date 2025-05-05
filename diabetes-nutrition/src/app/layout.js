"use client";

import Link from "next/link";
import "../styles/global.css";

export default function Layout({ children }) {
  return (
    <html lang="he">
      <body className="bg-gray-100 font-sans leading-relaxed min-h-screen flex flex-col">
        <header className="bg-blue-600 p-4 text-white shadow-md mb-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-3xl font-extrabold text-center md:text-left">
              חישוב פחמימות
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-blue-300">
                    בית
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-300">
                    עלינו
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-300">
                    צור קשר
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-8 bg-white shadow-lg rounded-lg mt-6 flex-1">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-8">
          <p className="text-center">
            &copy; 2025 חישוב פחמימות. כל הזכויות שמורות.
          </p>
        </footer>
      </body>
    </html>
  );
}
