import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900"></div>
          <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-gray-800"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32">
        <div className="flex justify-center mb-8">
            <img src="/logo.jpg" alt="לוגו T" className="h-24 w-24 rounded-full shadow-2xl shadow-cyan-500/30 border-4 border-cyan-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          ברוכים הבאים לארגון <span className="text-cyan-400">T</span>
        </h1>
        <h2 className="mt-4 text-2xl text-gray-200">תגבורים ושיעורים ברמת תיכון</h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
          המקום שלך לצמיחה, למידה והתפתחות. אנו מציעים שיעורי תגבור וסדנאות במגוון רחב של נושאים.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to={createPageUrl("Lessons")}>
            <Button size="lg" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold text-lg px-8 py-6 rounded-full transition-transform duration-200 hover:scale-105">
              צפו בשיעורים הפתוחים
              <ArrowLeft className="mr-3 h-6 w-6" />
            </Button>
          </Link>
          <Link to={createPageUrl("About")}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-bold text-lg px-8 py-6 rounded-full transition-transform duration-200 hover:scale-105">
              קראו עלינו עוד
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-cyan-400">שיעורים מותאמים</h3>
                <p className="mt-2 text-gray-300">תגבורים בשיעורי תיכון לקראת בגרות.</p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-cyan-400">שלל שיעורי לימוד</h3>
                <p className="mt-2 text-gray-300">מתמקדים בנושאי מדע לקראת הבגרויות.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
