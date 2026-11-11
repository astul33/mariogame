import React, { useState } from 'react';
import { BADGES } from '../data/wonderData';
import { BadgeInfo, BadgeType } from '../types/game';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Shield, Zap, Compass, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const BadgesExplorer: React.FC = () => {
  const { isAr } = useLanguage();
  const [selectedType, setSelectedType] = useState<BadgeType | 'all'>('all');
  const [equippedBadge, setEquippedBadge] = useState<BadgeInfo>(BADGES[0]);

  const filteredBadges = BADGES.filter((b) => (selectedType === 'all' ? true : b.type === selectedType));

  const handleEquipBadge = (badge: BadgeInfo) => {
    setEquippedBadge(badge);
    sound.playPowerUp();
  };

  return (
    <section id="badges" className="py-12 px-4 max-w-6xl mx-auto border-t border-slate-800">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-semibold text-purple-400 tracking-wider uppercase mb-1">
            {isAr ? 'نظام الشارات والمهارات الإضافية' : 'Badge Mechanics'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-display">
            {isAr ? 'شارات الأمير فلوريان (Badges)' : "Prince Florian's Badge System"}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            {isAr
              ? 'تمنح الشارات اللاعبين مهارات بهلوانية واستراتيجية جديدة كلياً لتخصيص أسلوب اللعب في كل مرحلة.'
              : 'Equip unique badges to customize your movement, gain rescue nets, or challenge expert speed trials.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === 'all' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setSelectedType('action')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === 'action' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'شارات الحركة (Action)' : 'Action'}
          </button>
          <button
            onClick={() => setSelectedType('boost')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === 'boost' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'شارات التعزيز (Boost)' : 'Boost'}
          </button>
          <button
            onClick={() => setSelectedType('expert')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedType === 'expert' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAr ? 'شارات الخبراء (Expert)' : 'Expert'}
          </button>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {filteredBadges.map((badge) => {
          const isEquipped = equippedBadge.id === badge.id;
          return (
            <div
              key={badge.id}
              onClick={() => handleEquipBadge(badge)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all text-start flex flex-col justify-between ${
                isEquipped
                  ? 'bg-slate-800/90 border-purple-500 shadow-lg shadow-purple-500/20 ring-1 ring-purple-400'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-xl bg-slate-800 border border-slate-700 inline-block">
                    {badge.icon}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {badge.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {isAr ? badge.nameAr : badge.nameEn}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {isAr ? badge.descriptionAr : badge.descriptionEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {isEquipped ? (
                    <span className="text-purple-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isAr ? 'مجهزة حالياً' : 'Equipped'}</span>
                    </span>
                  ) : (
                    <span>{isAr ? 'انقر للتجهيز' : 'Equip Badge'}</span>
                  )}
                </span>
                <span className="text-xs font-mono text-purple-400">
                  {badge.type === 'action' ? 'Active' : badge.type === 'boost' ? 'Passive' : 'Pro'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Equipped Badge Detailed Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-start">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-400 flex items-center justify-center text-3xl shadow-lg shrink-0">
            {equippedBadge.icon}
          </div>
          <div>
            <div className="text-xs text-purple-300 font-semibold">
              {isAr ? 'الشارة المجهزة حالياً مع الأمير فلوريان:' : 'Active Badge Equipped with Prince Florian:'}
            </div>
            <div className="text-lg font-bold text-white">
              {isAr ? equippedBadge.nameAr : equippedBadge.nameEn}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {isAr ? equippedBadge.howToUseAr : equippedBadge.howToUseEn}
            </div>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-bold whitespace-nowrap">
          {isAr ? 'جاهزة للاستخدام في المرحلة!' : 'Ready in Course!'}
        </div>
      </div>
    </section>
  );
};
