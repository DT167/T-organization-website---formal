import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, BookOpen, Info, ShieldCheck } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navItems = [
    { name: "Home", title: "עמוד הבית", url: createPageUrl("Home"), icon: Home },
    { name: "Lessons", title: "שיעורים", url: createPageUrl("Lessons"), icon: BookOpen },
    { name: "About", title: "אודות", url: createPageUrl("About"), icon: Info },
    { name: "Admin", title: "ניהול", url: createPageUrl("Admin"), icon: ShieldCheck },
  ];

  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.name === currentPageName);
    return currentItem ? currentItem.title : "ארגון T";
  };
  
  return (
    <div dir="rtl" className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <img src="/logo.jpg" alt="לוגו הארגון" className="h-12 w-12 rounded-full border-2 border-cyan-400" />
              <span className="text-2xl font-bold tracking-tight text-white">ארגון T</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    location.pathname === item.url
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="md:hidden">
              {/* Mobile menu can be added here if needed */}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {children}
      </main>

       <footer className="bg-gray-900 border-t border-gray-800 mt-12">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
               <p>&copy; {new Date().getFullYear()} ארגון T. כל הזכויות שמורות.</p>
               <p className="mt-2 text-sm">נבנה ועוצב מחדש על ידי base44</p>
            </div>
       </footer>
    </div>
  );
}
