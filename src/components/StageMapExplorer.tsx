import React, { useState } from 'react';
import { ALL_67_STAGES, WORLDS, StageDefinition, WorldDefinition } from '../data/stagesData';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';
import {
  Sparkles,
  Play,
  CheckCircle2,
  Lock,
  Layers,
  Search,
  ChevronRight,
  Flame,
  Award,
  Compass
} from 'lucide-react';

interface StageMapExplorerProps {
  currentStageId: number;
  onSelectStage: (stageId: number) => void;
  completedStages?: number[];
}

export const StageMapExplorer: React.FC<StageMapExplorerProps> = ({
  currentStageId,
  onSelectStage,
  completedStages = [],
}) => {
  const { isAr } = useLanguage();
  const [selectedWorld, setSelectedWorld] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [diffFilter, setDiffFilter] = useState<'all' | '1-2' | '3-4' | '5'>('all');

  const activeWorld = WORLDS.find((w) => w.worldNumber === selectedWorld) || WORLDS[0];

  // Filtered Stages
  const filteredStages = ALL_67_STAGES.filter((s) => {
    // World filter
    if (selectedWorld !== 0 && s.worldNumber !== selectedWorld) return false;

    // Difficulty filter
    if (diffFilter === '1-2' && s.difficulty > 2) return false;
    if (diffFilter === '3-4' && (s.difficulty < 3 || s.difficulty > 4)) return false;
    if (diffFilter === '5' && s.difficulty !== 5) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.nameEn.toLowerCase().includes(q) || s.nameAr.includes(q);
      const matchCode = s.stageCode.toLowerCase().includes(q);
      const matchWonder = s.wonderNameEn.toLowerCase().includes(q) || s.wonderNameAr.includes(q);
      return matchName || matchCode || matchWonder;
    }

    return true;
  });

  const handleStageClick = (stage: StageDefinition) => {
    onSelectStage(stage.id);
    sound.playPowerUp();
    // Scroll up to the game canvas
    const gameCanvasElem = document.getElementById('playable-game');
    if (gameCanvasElem) {
      gameCanvasElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCleared = completedStages.length;
  const progressPercent = Math.round((totalCleared / 67) * 100);

  return (
    <section id="stages-map" className="py-12 px-4 max-w-6xl mx-auto border-t border-slate-800">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-1">
            <Layers className="w-4 h-4" />
            <span>{isAr ? 'خريطة وعوالم مملكة الزهور الكاملة' : 'Full 67 Stages Kingdom Map'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display">
            {isAr ? 'جميع مراحل اللعبة الـ 67 (8 عوالم ممتدة)' : 'All 67 Stages Across 8 Wonder Worlds'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            {isAr
              ? 'استكشف كافة العوالم الـ 8 من هضبة الأنابيب إلى العالم الخاص للمحترفين. اختر أي مرحلة لتبدأ اللعب بها فوراً في المنصة!'
              : 'Explore all 8 worlds from Pipe-Rock Plateau to Special World. Click any of the 67 stages to launch it immediately in the playable engine!'}
          </p>
        </div>

        {/* Global Progress Strip */}
        <div className="flex items-center gap-4 p-3 bg-slate-900 border border-slate-800 rounded-2xl shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">
              {isAr ? 'المراحل المنجزة' : 'Cleared Courses'}
            </div>
            <div className="text-lg font-bold text-white font-mono">
              {totalCleared} <span className="text-xs text-slate-500 font-normal">/ 67</span>
            </div>
          </div>
          <div className="w-24 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* World Tabs Switcher (Worlds 1 - 8 + All) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <button
          onClick={() => setSelectedWorld(0)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedWorld === 0
              ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <span>🌐</span>
          <span>{isAr ? 'كل الـ 67 مرحلة' : 'All 67 Stages'}</span>
        </button>

        {WORLDS.map((w) => {
          const isSelected = selectedWorld === w.worldNumber;
          return (
            <button
              key={w.worldNumber}
              onClick={() => setSelectedWorld(w.worldNumber)}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{w.icon}</span>
              <span>{isAr ? `العالم ${w.worldNumber}` : `World ${w.worldNumber}`}</span>
            </button>
          );
        })}
      </div>

      {/* Active World Banner */}
      {selectedWorld !== 0 && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-start">
            <div className="w-14 h-14 rounded-2xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-3xl shadow-lg shrink-0">
              {activeWorld.icon}
            </div>
            <div>
              <div className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                {isAr ? `العالم ${activeWorld.worldNumber} (${activeWorld.stagesCount} مراحل)` : `World ${activeWorld.worldNumber} (${activeWorld.stagesCount} Courses)`}
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                {isAr ? activeWorld.nameAr : activeWorld.nameEn}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr ? activeWorld.descriptionAr : activeWorld.descriptionEn}
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-purple-300 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 whitespace-nowrap">
            {isAr ? `${activeWorld.stagesCount} مراحل وندر` : `${activeWorld.stagesCount} Wonder Courses`}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute start-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن اسم المرحلة أو التأثير...' : 'Search course by name or effect...'}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 ps-9 pe-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 whitespace-nowrap me-1">
            {isAr ? 'الصعوبة:' : 'Difficulty:'}
          </span>
          <button
            onClick={() => setDiffFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              diffFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setDiffFilter('1-2')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              diffFilter === '1-2' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            ★ 1-2
          </button>
          <button
            onClick={() => setDiffFilter('3-4')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              diffFilter === '3-4' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            ★ 3-4
          </button>
          <button
            onClick={() => setDiffFilter('5')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
              diffFilter === '5' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3 h-3 text-red-400" />
            <span>★ 5 (Expert)</span>
          </button>
        </div>
      </div>

      {/* Grid of Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStages.map((stage) => {
          const isCurrentActive = currentStageId === stage.id;
          const isCleared = completedStages.includes(stage.id);

          return (
            <div
              key={stage.id}
              onClick={() => handleStageClick(stage)}
              className={`cursor-pointer rounded-2xl p-5 border text-start flex flex-col justify-between transition-all group ${
                isCurrentActive
                  ? 'bg-slate-800/90 border-purple-500 shadow-lg shadow-purple-500/20 ring-2 ring-purple-400'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Code, Difficulty & Completion */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-purple-900/50 text-purple-300 border border-purple-500/30">
                      {stage.stageCode}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {isAr ? stage.worldNameAr.split(':')[1] || stage.worldNameAr : stage.worldNameEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {Array.from({ length: stage.difficulty }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {isCleared && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ms-1" />
                    )}
                  </div>
                </div>

                {/* Stage Title */}
                <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {isAr ? stage.nameAr : stage.nameEn}
                </h4>

                {/* Wonder Effect Description */}
                <div className="mt-2 text-xs flex items-start gap-1.5 text-purple-300/90">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    {isAr ? `تأثير الوندر: ${stage.wonderNameAr}` : `Wonder: ${stage.wonderNameEn}`}
                  </span>
                </div>
              </div>

              {/* Bottom Quick Launch */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {isCurrentActive
                    ? isAr ? 'المرحلة النشطة حالياً' : 'Current Stage'
                    : isAr ? 'انقر للعب' : 'Click to Play'}
                </span>
                <span className="flex items-center gap-1 text-purple-400 group-hover:translate-x-0.5 transition-transform font-semibold">
                  <Play className="w-3.5 h-3.5 fill-purple-400" />
                  <span>{isAr ? 'العب الآن' : 'Play Course'}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStages.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">
          {isAr ? 'لم يتم العثور على مراحل تطابق البحث.' : 'No courses match your filter criteria.'}
        </div>
      )}
    </section>
  );
};
