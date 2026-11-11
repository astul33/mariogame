import React from 'react';
import { TECHNICAL_SPECS } from '../data/wonderData';
import { useLanguage } from '../context/LanguageContext';
import { Tv, HardDrive, Users, Calendar, Crown, ShieldAlert, Sparkles, Gamepad } from 'lucide-react';

export const SpecsAndStory: React.FC = () => {
  const { isAr } = useLanguage();

  return (
    <section id="story" className="py-12 px-4 max-w-6xl mx-auto border-t border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Specs Card */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            {isAr ? 'المواصفات التقنية الرسمية' : 'Official Technical Specs'}
          </div>
          <h3 className="text-xl font-bold text-white font-display mb-4">
            {isAr ? 'بيانات لعبة Super Mario Bros. Wonder' : 'Super Mario Bros. Wonder Specs'}
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Gamepad className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'الجهاز والمنصة' : 'Platform'}</span>
              </span>
              <span className="font-semibold text-white">{TECHNICAL_SPECS.platform}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'حجم اللعبة' : 'File Size'}</span>
              </span>
              <span className="font-semibold text-white font-mono">{TECHNICAL_SPECS.fileSize}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'تاريخ الإصدار' : 'Release Date'}</span>
              </span>
              <span className="font-semibold text-white">
                {isAr ? TECHNICAL_SPECS.releaseDateAr : TECHNICAL_SPECS.releaseDate}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'عدد اللاعبين' : 'Players'}</span>
              </span>
              <span className="font-semibold text-white">
                {isAr ? '1–4 لاعبين محلياً + أونلاين' : '1–4 Players (Co-op & Online)'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Tv className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'أوضاع اللعب' : 'Play Modes'}</span>
              </span>
              <span className="font-semibold text-white">
                {isAr ? 'تلفزيون، طاولة، محمول' : 'TV, Tabletop, Handheld'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'المطوّر والناشر' : 'Developer & Publisher'}</span>
              </span>
              <span className="font-semibold text-white">Nintendo</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-slate-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'التصنيف العمري' : 'Age Rating'}</span>
              </span>
              <span className="font-semibold text-emerald-400">ESRB: Everyone (E)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Lore of Flower Kingdom */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              {isAr ? 'ملخص حبكة القصة' : 'The Wonder Narrative'}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-display mb-3">
              {isAr
                ? 'قصة مملكة الزهور وتحول قلعة باوزر الطائرة'
                : 'The Flower Kingdom & Castle Bowser'}
            </h3>

            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                {isAr
                  ? 'تبدأ أحداث القصة عندما تتم دعوة ماريو ولويجي والأميرة بيتش والأصدقاء من قِبل الأمير اللطيف "فلوريان" لزيارة مملكته الجميلة المجاورة: مملكة الزهور (Flower Kingdom).'
                  : 'The adventure begins as Mario, Luigi, Princess Peach and friends are cordially welcomed by the kind ruler, Prince Florian, to explore his vibrant realm: the Flower Kingdom.'}
              </p>
              <p>
                {isAr
                  ? 'لكن حفل الاستقبال يتعرض لهجوم مباغت من الشرير باوزر! يقوم باوزر بلمس "زهرة العجائب" السحرية ذات القوة الخارقة، ويندمج جسده مع قصر الأمير فلوريان ليتحول إلى حصن طائر عملاق يُعرف باسم "قلعة باوزر" (Castle Bowser)، ويبث الفوضى العجيبة في كافة أرجاء الجزر السبع!'
                  : 'However, Bowser crashes the party! Touching a magical Wonder Flower, Bowser physically fuses with Prince Florian\'s royal palace to become a flying war fortress known as "Castle Bowser", scattering wonder chaos across the kingdom.'}
              </p>
              <p>
                {isAr
                  ? 'يتعاون ماريو وأصدقاؤه مع الأمير فلوريان لجمع بذور العجائب (Wonder Seeds)، وفك الحصار السحري، وتحرير المملكة واستعادة بهجة زهورها!'
                  : 'Together with Prince Florian\'s special badge techniques, Mario and his friends set out to gather Wonder Seeds, break Bowser\'s wonder shields, and restore joy to the singing flowers!'}
              </p>
            </div>
          </div>

          {/* Worlds Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { en: 'Pipe-Rock Plateau', ar: 'هضبة الأنابيب الصخرية', emoji: '⛰️' },
              { en: 'Fluff-Puff Peaks', ar: 'قمم السحاب الهش', emoji: '☁️' },
              { en: 'Shining Falls', ar: 'الشلالات المتلألئة', emoji: '🌊' },
              { en: 'Sunbaked Desert', ar: 'الصحراء المشمسة', emoji: '☀️' },
              { en: 'Fungi Mines', ar: 'مناجم الفطر المتوهج', emoji: '🍄' },
              { en: 'Deep Magma Bog', ar: 'مستنقع الحمم السحيق', emoji: '🌋' },
            ].map((world, wIdx) => (
              <div
                key={wIdx}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-start"
              >
                <div className="text-xl mb-1">{world.emoji}</div>
                <div className="text-xs font-bold text-white">{isAr ? world.ar : world.en}</div>
                <div className="text-[10px] text-slate-400">
                  {isAr ? `العالم ${wIdx + 1}` : `World ${wIdx + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
