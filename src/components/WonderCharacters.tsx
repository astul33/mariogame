import React, { useState } from 'react';
import { CHARACTERS } from '../data/wonderData';
import { CharacterInfo } from '../types/game';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Zap, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface WonderCharactersProps {
  onSelectCharacter?: (charId: CharacterInfo['id']) => void;
  activeCharacterId?: CharacterInfo['id'];
}

export const WonderCharacters: React.FC<WonderCharactersProps> = ({
  onSelectCharacter,
  activeCharacterId = 'mario',
}) => {
  const { isAr, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'standard' | 'beginner'>('all');
  const [selectedCard, setSelectedCard] = useState<CharacterInfo>(
    CHARACTERS.find((c) => c.id === activeCharacterId) || CHARACTERS[0]
  );

  const filteredCharacters = CHARACTERS.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'beginner') return c.isInvulnerable;
    return !c.isInvulnerable;
  });

  return (
    <section id="characters" className="py-12 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-semibold text-purple-400 tracking-wider uppercase mb-1">
            {isAr ? 'قائمة الشخصيات القابلة للعب' : 'Playable Roster'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display">
            {isAr ? 'أبطال مملكة الزهور (12 شخصية)' : 'Flower Kingdom Heroes (12 Characters)'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            {isAr
              ? 'تتيح لعبة سوبر ماريو وندر الاختيار بين شخصيات كلاسيكية أو شخصيات مخصصة للمبتدئين والأطفال لا تتأثر بهجمات الأعداء!'
              : 'Choose between classic challenge heroes or beginner-friendly characters (Yoshi & Nabbit) who take zero enemy damage!'}
          </p>
        </div>

        {/* Filter Segmented Control (Functional buttons conforming to frontend design rules) */}
        <div className="flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'جميع الشخصيات' : 'All Heroes'}
          </button>
          <button
            onClick={() => setFilter('standard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'standard'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'اللعب القياسي' : 'Standard'}
          </button>
          <button
            onClick={() => setFilter('beginner')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'beginner'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'المبتدئون (دون ضرر)' : 'Beginner Friendly'}
          </button>
        </div>
      </div>

      {/* Grid of Characters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredCharacters.map((char) => {
          const isCurrentActive = selectedCard.id === char.id;
          return (
            <div
              key={char.id}
              onClick={() => {
                setSelectedCard(char);
                if (onSelectCharacter) onSelectCharacter(char.id);
                sound.playJump(
                  char.id === 'luigi' ? 'luigi' : char.id === 'peach' ? 'peach' : 'mario'
                );
              }}
              className={`group cursor-pointer rounded-2xl p-4 transition-all duration-200 border text-start flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-slate-800/90 border-purple-500 shadow-lg shadow-purple-500/20 ring-1 ring-purple-400'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Character Color Chip & Category */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
                      style={{ backgroundColor: char.color }}
                    />
                    <span>{isAr ? char.difficultyAr : char.difficultyEn}</span>
                  </div>
                  {char.isInvulnerable && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isAr ? 'منيع' : 'Invulnerable'}</span>
                    </span>
                  )}
                </div>

                {/* Character Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {isAr ? char.nameAr : char.nameEn}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {isAr ? char.titleAr : char.titleEn}
                </p>
              </div>

              {/* Action Hint */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {char.hasFlutterJump
                    ? isAr ? 'رفرفة يوشي' : 'Flutter Jump'
                    : char.hasParasolGlide
                    ? isAr ? 'انزلاق بيتش' : 'Peach Glide'
                    : char.hasDoubleJump
                    ? isAr ? 'قفزة مزدوجة' : 'Double Jump'
                    : isAr ? 'قفز متوازن' : 'Agile Runner'}
                </span>
                <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">
                  {isCurrentActive ? (
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  ) : (
                    <span>{isAr ? 'اختر' : 'Select'}</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Spotlight Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700 p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-inner shrink-0"
          style={{ backgroundColor: selectedCard.color, color: selectedCard.secondaryColor }}
        >
          {selectedCard.nameEn[0]}
        </div>

        <div className="flex-1 text-center md:text-start">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-slate-400 mb-1">
            <span>{isAr ? selectedCard.difficultyAr : selectedCard.difficultyEn}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedCard.isInvulnerable ? (isAr ? 'لا يتأثر بهجمات الأعداء' : 'No Enemy Damage') : (isAr ? 'تحدي أصيل' : 'Standard Physics')}</span>
          </div>

          <h3 className="text-xl font-bold text-white">
            {isAr ? selectedCard.nameAr : selectedCard.nameEn} - {isAr ? selectedCard.titleAr : selectedCard.titleEn}
          </h3>

          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {isAr ? selectedCard.descriptionAr : selectedCard.descriptionEn}
          </p>

          {/* Stat Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700/60">
            <div>
              <div className="text-[11px] text-slate-400">{isAr ? 'سرعة الجري' : 'Speed'}</div>
              <div className="text-sm font-bold text-white tabular-nums">
                {Math.round(selectedCard.speed * 20)}%
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">{isAr ? 'ارتفاع القفز' : 'Jump Height'}</div>
              <div className="text-sm font-bold text-white tabular-nums">
                {Math.round((selectedCard.jumpForce / 12) * 100)}%
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">{isAr ? 'الخاصية الفريدة' : 'Special Perk'}</div>
              <div className="text-sm font-bold text-purple-300">
                {selectedCard.hasParasolGlide
                  ? isAr ? 'التحليق بالمظلة' : 'Parasol Hover'
                  : selectedCard.hasFlutterJump
                  ? isAr ? 'رفرفة الهواء' : 'Flutter Kick'
                  : selectedCard.isInvulnerable
                  ? isAr ? 'مناعة كاملة' : 'Invulnerable'
                  : isAr ? 'تحكم كلاسيكي' : 'Classic Agility'}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (onSelectCharacter) onSelectCharacter(selectedCard.id);
            sound.playJump();
          }}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-transform active:scale-95 shrink-0"
        >
          {isAr ? `العب بـ ${selectedCard.nameAr} في المنصة` : `Play as ${selectedCard.nameEn}`}
        </button>
      </div>
    </section>
  );
};
