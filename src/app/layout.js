import "../styles/globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import LayoutWithSidebar from "./LayoutWithSidebar";
import { AuthProvider } from "./context/AuthContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Task Management System",
  description: "Generated by Task Management System",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <LayoutWithSidebar>{children}</LayoutWithSidebar>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
