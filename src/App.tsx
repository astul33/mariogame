import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PlayableWonderGame } from './components/PlayableWonderGame';
import { StageMapExplorer } from './components/StageMapExplorer';
import { WonderCharacters } from './components/WonderCharacters';
import { WonderPowerUps } from './components/WonderPowerUps';
import { BadgesExplorer } from './components/BadgesExplorer';
import { WonderVsRpgComparison } from './components/WonderVsRpgComparison';
import { SpecsAndStory } from './components/SpecsAndStory';
import { ALL_67_STAGES } from './data/stagesData';
import { CharacterId } from './types/game';
import { Sparkles, Gamepad2, Languages, Play, Layers, MapPin } from 'lucide-react';
import { sound } from './utils/audio';

function WonderAppContent() {
  const { lang, setLang, isAr } = useLanguage();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>('mario');
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [totalWonderSeedsCollected, setTotalWonderSeedsCollected] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('wonder_cleared_stages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const activeStage = ALL_67_STAGES.find((s) => s.id === currentStageId) || ALL_67_STAGES[0];

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    sound.playCoin();
  };

  const handleSelectCharacter = (id: CharacterId) => {
    setSelectedCharacter(id);
    const gameElem = document.getElementById('playable-game');
    if (gameElem) {
      gameElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStageDrawer = () => {
    const mapElem = document.getElementById('stages-map');
    if (mapElem) {
      mapElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* 
        Top Bar Contract:
        [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
      */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display flex items-center gap-2"
          >
            <span className="text-xl">🌸</span>
            <span>Super Mario Bros. Wonder</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#playable-game" className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'المنصة واللعب' : 'Playable Game'}
            </a>
            <a href="#stages-map" className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'الـ 67 مرحلة' : '67 Stages Map'}
            </a>
            <a href="#characters" className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'الشخصيات' : 'Characters'}
            </a>
            <a href="#powerups" className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'القدرات والتحولات' : 'Power-Ups'}
            </a>
            <a href="#comparison" className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'وندر ضد آربيجي' : 'Wonder vs RPG'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLanguage}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <Languages className="w-4 h-4 text-purple-400" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-8 group aspect-[16/9] max-h-[440px]">
            <img
              src="/assets/images/wonder_hero_banner_1794394997921.jpg"
              alt="Flower Kingdom Wonder World"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold mb-2">
                <span>Nintendo Switch 2023</span>
                <span aria-hidden="true">·</span>
                <span>{isAr ? '67 مرحلة كاملة عبر 8 عوالم' : '67 Stages Across 8 Worlds'}</span>
                <span aria-hidden="true">·</span>
                <span>{isAr ? '1–4 لاعبين' : '1–4 Players'}</span>
                <span aria-hidden="true">·</span>
                <span>{isAr ? 'تحول الفيل وزهور العجائب' : 'Elephant & Wonder Effects'}</span>
              </div>

              <h1 className="text-2xl md:text-5xl font-black text-white font-display max-w-2xl text-balance drop-shadow-md">
                {isAr
                  ? 'سوبر ماريو برذرز وندر: 67 مرحلة في مملكة الزهور'
                  : 'Super Mario Bros. Wonder: 67 Stages in Flower Kingdom'}
              </h1>

              <p className="text-xs sm:text-base text-slate-200 mt-2 max-w-2xl drop-shadow">
                {isAr
                  ? 'خض مغامرة المنصات الكاملة في كافة عوالم مملكة الزهور الـ 8! اختر من بين 67 مرحلة حافلة بالأنابيب الزاحفة، والأمطار النقدية، وتحول الفيل، والمفاجآت الموسيقية.'
                  : 'Experience all 67 authentic stages across 8 Flower Kingdom worlds! Jump into inchworm pipes, coin showers, Elephant forms, and musical wonder events.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <a
                  href="#playable-game"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/40 flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isAr ? `العب المرحلة ${activeStage.stageCode} الآن` : `Play Course ${activeStage.stageCode}`}</span>
                </a>

                <a
                  href="#stages-map"
                  className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? 'تصفح خريطة الـ 67 مرحلة' : 'Explore All 67 Stages'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-800/80 text-center md:text-start">
            <div className="p-3">
              <div className="text-xs text-slate-400">{isAr ? 'إجمالي المراحل' : 'Total Stages'}</div>
              <div className="text-xl font-extrabold text-white font-display mt-0.5 font-mono">67 {isAr ? 'مرحلة' : 'Courses'}</div>
              <div className="text-[11px] text-purple-400">{isAr ? 'موزعة على 8 عوالم كاملة' : 'Across 8 Wonder Worlds'}</div>
            </div>

            <div className="p-3">
              <div className="text-xs text-slate-400">{isAr ? 'الشخصيات المتاحة' : 'Playable Heroes'}</div>
              <div className="text-xl font-extrabold text-white font-display mt-0.5">12 {isAr ? 'بطلاً' : 'Characters'}</div>
              <div className="text-[11px] text-purple-400">{isAr ? 'يوشي ونابيت للمبتدئين' : 'Includes Yoshi & Nabbit'}</div>
            </div>

            <div className="p-3">
              <div className="text-xs text-slate-400">{isAr ? 'التحولات الثورية' : 'Transformations'}</div>
              <div className="text-xl font-extrabold text-white font-display mt-0.5">3 + 1 Wonder</div>
              <div className="text-[11px] text-purple-400">{isAr ? 'الفيل والفقاعات والمثقاب' : 'Elephant, Bubble, Drill'}</div>
            </div>

            <div className="p-3">
              <div className="text-xs text-slate-400">{isAr ? 'تأثيرات العجائب' : 'Wonder Effects'}</div>
              <div className="text-xl font-extrabold text-white font-display mt-0.5">8 {isAr ? 'أنماط فريدة' : 'Unique Styles'}</div>
              <div className="text-[11px] text-purple-400">{isAr ? 'أنابيب زاحفة، انعدام جاذبية، إيقاع' : 'Living Pipes, Zero-G, Beats'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Playable Platformer Section */}
      <section id="playable-game" className="py-12 px-4 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="text-xs font-semibold text-purple-400 tracking-wider uppercase mb-1">
              {isAr ? 'محرك المنصات التفاعلي للـ 67 مرحلة' : '67-Stage 2D Platformer Engine'}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display">
              {activeStage.stageCode}: {isAr ? activeStage.nameAr : activeStage.nameEn}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {isAr
                ? `العالم: ${activeStage.worldNameAr} · تأثير زهرة العجائب: ${activeStage.wonderNameAr}`
                : `World: ${activeStage.worldNameEn} · Wonder Effect: ${activeStage.wonderNameEn}`}
            </p>
          </div>

          <PlayableWonderGame
            initialCharacter={selectedCharacter}
            currentStageId={currentStageId}
            onStageChange={(newId) => setCurrentStageId(newId)}
            onWonderSeedCollected={(seeds) => setTotalWonderSeedsCollected(seeds)}
            onOpenStageDrawer={handleOpenStageDrawer}
          />
        </div>
      </section>

      {/* Full 67 Stages Map & Explorer */}
      <StageMapExplorer
        currentStageId={currentStageId}
        onSelectStage={(id) => setCurrentStageId(id)}
        completedStages={completedStages}
      />

      {/* Playable Characters Showcase */}
      <WonderCharacters
        activeCharacterId={selectedCharacter}
        onSelectCharacter={handleSelectCharacter}
      />

      {/* Power-Ups Showcase */}
      <WonderPowerUps />

      {/* Badges Explorer */}
      <BadgesExplorer />

      {/* Wonder vs RPG Comparison & Quiz */}
      <WonderVsRpgComparison />

      {/* Technical Specs & Flower Kingdom Lore */}
      <SpecsAndStory />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🌸</span>
            <span className="font-semibold text-slate-400">Super Mario Bros. Wonder · 67 Stages Edition</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>{isAr ? 'مملكة الزهور (8 عوالم)' : 'Flower Kingdom (8 Worlds)'}</span>
            <span>·</span>
            <span>{isAr ? '67 مرحلة قابلة للعب' : '67 Playable Courses'}</span>
            <span>·</span>
            <span>Nintendo Switch</span>
          </div>

          <div className="text-[11px] text-slate-600">
            {isAr
              ? 'تطبيق استعراضي وتفاعلي شامل لـ 67 مرحلة في سوبر ماريو وندر'
              : 'Complete 67-stage interactive explorer for Super Mario Bros. Wonder'}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WonderAppContent />
    </LanguageProvider>
  );
}
