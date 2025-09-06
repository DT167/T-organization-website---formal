import React from 'react';
import { User, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-cyan-400 tracking-wider uppercase">מי אנחנו</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            הסיפור של ארגון T
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            כאן יופיע טקסט מפורט על הארגון. כרגע זהו טקסט דמה, אך ניתן להחליפו בקלות במידע אמיתי על מטרות הארגון, החזון, והאנשים שמאחוריו.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-gray-800/50 rounded-2xl border border-gray-700">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white mx-auto">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">החזון שלנו</h3>
              <p className="mt-4 text-base text-gray-300">
                פלטפורמת למידה נגישה אונליין, למידה לקראת בחינות הבגרות והתמקדות בשיעורי עזר לתלמידים.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-800/50 rounded-2xl border border-gray-700">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-500 text-white mx-auto">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">האתר</h3>
              <p className="mt-4 text-base text-gray-300">
                הצעת תגבורי עזר לתלמידים.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto">
            <p className="text-2xl text-gray-200 leading-relaxed border-t border-b border-cyan-500/30 py-8">
                ארגון T מתמקד בלימודי האלקטרוניקה ושיעורי המדע האיכותיים בבחינות הבגרות.
            </p>
        </div>
      </div>
    </div>
  );
}
