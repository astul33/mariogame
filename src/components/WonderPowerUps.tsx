import React, { useState } from 'react';
import { POWER_UPS } from '../data/wonderData';
import { PowerUpInfo } from '../types/game';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Check, Play, Waves, Hammer, Wind } from 'lucide-react';
import { sound } from '../utils/audio';

export const WonderPowerUps: React.FC = () => {
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('elephant');
  const [demoEffect, setDemoEffect] = useState<string>('');

  const activePower = POWER_UPS.find((p) => p.id === activeTab) || POWER_UPS[0];

  const handleTestPower = (id: string) => {
    if (id === 'elephant') {
      sound.playElephantTrunk();
      setDemoEffect(isAr ? 'ضربة الخرطوم! تم تحطيم الحواجز ورش المياه!' : 'Trunk Swipe! Blocks shattered and water sprayed!');
    } else if (id === 'bubble') {
      sound.playBubble();
      setDemoEffect(isAr ? 'أطلقت فقاعة حابسة! الأعداء تحولوا إلى عملات!' : 'Trapped enemies in gleaming bubbles -> Coins!');
    } else if (id === 'drill') {
      sound.playStomp();
      setDemoEffect(isAr ? 'غصت في باطن الأرض! حماية كاملة من العقبات!' : 'Burrowed into the ground! Safe from hazards!');
    } else {
      sound.playWonderEffect();
      setDemoEffect(isAr ? 'تأثير العجائب نشط! الأنابيب تتحرك وتتراقص!' : 'WONDER EFFECT ACTIVE! Pipes are undulating!');
    }

    setTimeout(() => {
      setDemoEffect('');
    }, 3500);
  };

  return (
    <section id="powerups" className="py-12 px-4 max-w-6xl mx-auto border-t border-slate-800">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="text-xs font-semibold text-purple-400 tracking-wider uppercase mb-1">
          {isAr ? 'الابتكارات والتحولات الجديدة' : 'Revolutionary Power-Ups'}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display">
          {isAr ? 'قوى وتحولات سوبر ماريو وندر الجديدة' : 'New Powers & The Wonder Flower'}
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {isAr
            ? 'أضافت لعبة Super Mario Bros. Wonder ثلاثة تحولات ثورية جديدة كلياً بجانب تأثير زهرة العجائب الخارق!'
            : 'Explore the 3 brand-new gameplay power-ups alongside the mind-bending Wonder Flower effect.'}
        </p>
      </div>

      {/* Segmented Control for Power-Ups */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {POWER_UPS.map((power) => {
          const isActive = power.id === activeTab;
          return (
            <button
              key={power.id}
              onClick={() => {
                setActiveTab(power.id);
                sound.playJump();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{power.icon}</span>
              <span>{isAr ? power.nameAr : power.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Feature Spotlight Card with High-Res Image Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl items-stretch">
        {/* Left Column: Rich Artwork */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner group">
            {activePower.id === 'elephant' ? (
              <img
                src="/assets/images/mario_elephant_power_1794394999184.jpg"
                alt={isAr ? 'ماريو الفيل' : 'Elephant Mario'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : activePower.id === 'fire' ? (
              <img
                src="/assets/images/wonder_flower_psychedelic_1794394998982.jpg"
                alt={isAr ? 'زهرة العجائب' : 'Wonder Flower'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-center">
                <span className="text-7xl mb-4 animate-float-gentle">{activePower.icon}</span>
                <span className="text-xl font-bold text-white font-display">
                  {isAr ? activePower.itemAr : activePower.itemEn}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  {isAr ? 'عنصر قوة حصري في مملكة الزهور' : 'Exclusive Flower Kingdom Power Item'}
                </span>
              </div>
            )}

            {/* In-game Tag overlay */}
            <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-white border border-slate-700 flex items-center gap-1.5">
              <span>{activePower.icon}</span>
              <span>{isAr ? activePower.itemAr : activePower.itemEn}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Breakdown & Abilities */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span>{isAr ? 'التحول الخارق' : 'Signature Transformation'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-purple-400 font-semibold">{isAr ? activePower.itemAr : activePower.itemEn}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-display">
              {isAr ? activePower.nameAr : activePower.nameEn}
            </h3>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              {isAr ? activePower.summaryAr : activePower.summaryEn}
            </p>

            {/* List of 4 Specific In-Game Abilities */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {isAr ? 'أبرز القدرات والمزايا الميدانية:' : 'Key Tactical Abilities in Course:'}
              </h4>
              <ul className="space-y-2.5">
                {(isAr ? activePower.keyAbilitiesAr : activePower.keyAbilitiesEn).map((ability, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{ability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Test Action */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => handleTestPower(activePower.id)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isAr ? `اختبر صوت وقدرة ${activePower.nameAr}` : `Test ${activePower.nameEn} Sound & Effect`}</span>
            </button>

            {demoEffect && (
              <div className="text-xs font-semibold text-emerald-400 animate-pulse text-center sm:text-start">
                ✨ {demoEffect}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
