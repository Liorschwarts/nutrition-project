import { Inter } from "next/font/google";
import "../styles/global.css";
import Navigation from "../components/layout/Navigation";
import { AuthProvider } from "../components/auth/AuthProvider";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Diabetes Carb Calculator",
  description: "Calculate insulin doses based on carbohydrate content in food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
              <p>
                &copy; {new Date().getFullYear()} Diabetes Carb Calculator. All
                rights reserved.
              </p>
              <p className="text-sm mt-2">
                This application is for informational purposes only and should
                not replace medical advice.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
