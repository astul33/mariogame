import React, { useState } from 'react';
import { COMPARISON_DATA, QUIZ_QUESTIONS } from '../data/wonderData';
import { useLanguage } from '../context/LanguageContext';
import { Check, HelpCircle, Sparkles, Sword, Play, RotateCcw, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const WonderVsRpgComparison: React.FC = () => {
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState<'table' | 'quiz'>('table');
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: number]: { wonder: number; rpg: number } }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (questionId: number, points: { wonder: number; rpg: number }) => {
    setQuizAnswers((prev) => {
      const next = { ...prev, [questionId]: points };
      if (Object.keys(next).length === QUIZ_QUESTIONS.length) {
        setQuizFinished(true);
        sound.playWonderSeed();
      } else {
        sound.playCoin();
      }
      return next;
    });
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizFinished(false);
  };

  // Calculate scores
  let totalWonder = 0;
  let totalRpg = 0;
  Object.values(quizAnswers).forEach((pt) => {
    totalWonder += pt.wonder;
    totalRpg += pt.rpg;
  });

  return (
    <section id="comparison" className="py-12 px-4 max-w-6xl mx-auto border-t border-slate-800">
      {/* Question Header Addressing User Prompt */}
      <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-amber-900/40 rounded-3xl p-6 md:p-8 border border-purple-500/30 mb-10 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>{isAr ? 'الإجابة عن استفسارك: وندر أم آربيجي؟' : 'Answering Your Query: Wonder vs RPG 2023'}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display">
          {isAr
            ? 'هل هذه هي لعبة ماريو التي تقصدها، أم تقصد Super Mario RPG 2023؟'
            : 'Is this the Mario game you meant, or Super Mario RPG (2023)?'}
        </h2>
        <p className="text-sm md:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {isAr
            ? 'شهد خريف عام 2023 إطلاق تحفتين استثنائيتين لماريو على جهاز Nintendo Switch! إذا كنت تبحث عن القفز السريع، والجري، وتأثيرات زهرة العجائب وتحول الفيل ومملكة الزهور، فأنت بالتأكيد تقصد Super Mario Bros. Wonder. أما إذا كنت تبحث عن قصة كلاسيكية عميقة، ومعارك أدوار استراتيجية (RPG)، وشخصيات مثل جينو ومالو وتحالف باوزر، فاللعبة هي Super Mario RPG!'
            : 'Fall 2023 saw two phenomenal Mario releases on Switch! If you want dynamic 2D platforming, Elephant Mario, and psychedelic Wonder Flowers, you mean Super Mario Bros. Wonder. If you want turn-based tactical battles, Geno, Mallow, and Bowser in your party, you mean Super Mario RPG!'}
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'table'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isAr ? 'جدول المقارنة المباشر' : 'Detailed Comparison Table'}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'اختبار: أي لعبة تناسب ذوقك؟' : 'Quiz: Which Game Fits You?'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'table' && (
        <div className="space-y-8">
          {/* Dual Visual Showcase: Wonder vs RPG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Super Mario Bros. Wonder Card */}
            <div className="rounded-2xl bg-slate-900 border border-purple-500/40 p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-slate-700 bg-slate-950">
                  <img
                    src="/assets/images/wonder_hero_banner_1794394997921.jpg"
                    alt="Super Mario Bros Wonder"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 start-2 px-2.5 py-1 rounded-md bg-purple-600/90 text-[11px] font-bold text-white">
                    20 Oct 2023
                  </div>
                </div>

                <div className="text-xs text-purple-400 font-bold mb-1">
                  {isAr ? 'مغامرات ومنصات 2D (Platformer)' : '2D Side-Scrolling Adventure'}
                </div>
                <h3 className="text-xl font-bold text-white">Super Mario Bros. Wonder</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {isAr
                    ? 'عالم جديد كلياً (مملكة الزهور)، أزهار عجائب تغير الواقع، تحول الفيل والفقاعات والمثقاب، 12 شخصية قابلة للعب، ودعم حتى 4 لاعبين محلياً.'
                    : 'All-new Flower Kingdom, reality-warping Wonder Flowers, Elephant/Bubble/Drill forms, 12 characters, and 4-player couch co-op.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-purple-300 font-semibold">
                <span>{isAr ? 'مثالية للعب العائلي السريع والإثارة' : 'Best for High Energy & Couch Fun'}</span>
                <span>3.7 GB</span>
              </div>
            </div>

            {/* Super Mario RPG Card */}
            <div className="rounded-2xl bg-slate-900 border border-amber-500/40 p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-slate-700 bg-slate-950">
                  <img
                    src="/assets/images/mario_rpg_comparison_1794394999678.jpg"
                    alt="Super Mario RPG"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 start-2 px-2.5 py-1 rounded-md bg-amber-600/90 text-[11px] font-bold text-white">
                    17 Nov 2023
                  </div>
                </div>

                <div className="text-xs text-amber-400 font-bold mb-1">
                  {isAr ? 'تقمص أدوار وتعاقب أدوار (Turn-Based RPG)' : 'Turn-Based RPG Classic Remake'}
                </div>
                <h3 className="text-xl font-bold text-white">Super Mario RPG (2023)</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {isAr
                    ? 'إعادة بناء ثلاثية الأبعاد كاملة لكلاسيكية عام 1996، قتال بالدور، توقيت الضربات التكتيكية، قصة إنقاذ طريق النجوم، وبطلان أسطوريان: جينو ومالو!'
                    : 'Complete 3D visual remake of the 1996 SNES classic, turn-based battle mechanics with Action Commands, Star Road storyline, and iconic party members Geno & Mallow!'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>{isAr ? 'مثالية لعشاق القصص والتكتيك الفردي' : 'Best for Story & Tactical Depth'}</span>
                <span>6.4 GB</span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Specs Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-semibold">{isAr ? 'وجه المقارنة' : 'Aspect'}</th>
                    <th className="py-3 px-4 font-bold text-purple-400">
                      Super Mario Bros. Wonder
                    </th>
                    <th className="py-3 px-4 font-bold text-amber-400">
                      Super Mario RPG (2023)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {COMPARISON_DATA.aspects.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-300 whitespace-nowrap">
                        {isAr ? row.categoryAr : row.categoryEn}
                      </td>
                      <td className="py-3.5 px-4 text-slate-200">
                        {isAr ? row.wonder.ar : row.wonder.en}
                      </td>
                      <td className="py-3.5 px-4 text-slate-200">
                        {isAr ? row.rpg.ar : row.rpg.en}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quiz Mode */}
      {activeTab === 'quiz' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl">
          {!quizFinished ? (
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="text-xs font-semibold text-purple-400">
                  {isAr
                    ? `السؤال ${Object.keys(quizAnswers).length + 1} من ${QUIZ_QUESTIONS.length}`
                    : `Question ${Object.keys(quizAnswers).length + 1} of ${QUIZ_QUESTIONS.length}`}
                </div>
                <div className="text-xs text-slate-400">
                  {isAr ? 'أجب لتعرف أي لعبة تلائمك بدقة' : 'Answer to find your match'}
                </div>
              </div>

              <div className="space-y-6">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const answered = quizAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-xl border transition-all ${
                        answered
                          ? 'bg-slate-800/60 border-slate-700'
                          : 'bg-slate-900/80 border-slate-800'
                      }`}
                    >
                      <h4 className="text-base font-bold text-white mb-4">
                        {idx + 1}. {isAr ? q.questionAr : q.questionEn}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt, optIdx) => {
                          const isPicked = answered && answered.wonder === opt.points.wonder;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, opt.points)}
                              className={`p-4 rounded-xl text-start text-xs sm:text-sm font-medium border transition-all flex items-start gap-3 ${
                                isPicked
                                  ? 'bg-purple-900/40 border-purple-500 text-white ring-1 ring-purple-400'
                                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                                {isPicked ? '✓' : optIdx + 1}
                              </span>
                              <span>{isAr ? opt.textAr : opt.textEn}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl bg-purple-600/20 border border-purple-500 text-purple-300">
                ⭐
              </div>

              <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                {isAr ? 'نتيجة الاختبار المخصصة' : 'Your Personalized Match'}
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white font-display mb-3">
                {totalWonder >= totalRpg
                  ? isAr
                    ? 'اللعبة المناسبة لك تماماً هي: Super Mario Bros. Wonder!'
                    : 'Your Perfect Match is: Super Mario Bros. Wonder!'
                  : isAr
                  ? 'اللعبة المناسبة لك تماماً هي: Super Mario RPG (2023)!'
                  : 'Your Perfect Match is: Super Mario RPG (2023)!'}
              </h3>

              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
                {totalWonder >= totalRpg
                  ? isAr
                    ? 'بناءً على تفضيلك للسرعة والمرح الحركي والمفاجآت غير المتوقعة، ستعشق القفز والركض في مملكة الزهور واكتشاف زهور العجائب مع ماريو الفيل وأصدقائه!'
                    : 'Based on your love for agility, playful dynamic surprises, and fast platforming, you will adore sprinting through the Flower Kingdom and transforming into Elephant Mario!'
                  : isAr
                  ? 'بناءً على حبك للقصة والاستراتيجية وتطور الشخصيات، ستستمتع برحلة تقمص الأدوار الكلاسيكية الأسطورية مع جينو ومالو وهزيمة عصابة سميثي!'
                  : 'Based on your love for storyline, tactical depth, and character progression, you will cherish the isometric adventure of Geno, Mallow, and timed hits in Super Mario RPG!'}
              </p>

              <button
                onClick={resetQuiz}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isAr ? 'إعادة الاختبار' : 'Retake Quiz'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
