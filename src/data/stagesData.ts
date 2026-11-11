export type WorldTheme =
  | 'plateau'
  | 'peaks'
  | 'falls'
  | 'desert'
  | 'mines'
  | 'magma'
  | 'petals'
  | 'special';

export type WonderEffectType =
  | 'worm_pipes'
  | 'coin_storm'
  | 'low_gravity'
  | 'speed_rush'
  | 'starry_sky'
  | 'giant_mode'
  | 'musical_parade'
  | 'bubble_storm';

export interface StageDefinition {
  id: number;
  stageCode: string;
  worldNumber: number;
  worldNameEn: string;
  worldNameAr: string;
  nameEn: string;
  nameAr: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  theme: WorldTheme;
  wonderEffect: WonderEffectType;
  wonderNameEn: string;
  wonderNameAr: string;
  flowerTipEn: string;
  flowerTipAr: string;
  palette: {
    skyTop: string;
    skyBottom: string;
    groundGrass: string;
    groundDirt: string;
    pipeColor: string;
    wonderSky: string;
  };
}

export interface WorldDefinition {
  worldNumber: number;
  nameEn: string;
  nameAr: string;
  icon: string;
  theme: WorldTheme;
  descriptionEn: string;
  descriptionAr: string;
  stagesCount: number;
}

export const WORLDS: WorldDefinition[] = [
  {
    worldNumber: 1,
    nameEn: 'Pipe-Rock Plateau',
    nameAr: 'العالم 1: هضبة الأنابيب الصخرية',
    icon: '⛰️',
    theme: 'plateau',
    descriptionEn: 'Rolling green hills, friendly singing flowers, and wandering inchworm pipes.',
    descriptionAr: 'تلال خضراء وارفة، أزهار متحدثة مبهجة، وأنابيب تزحف كالديدان.',
    stagesCount: 9,
  },
  {
    worldNumber: 2,
    nameEn: 'Fluff-Puff Peaks',
    nameAr: 'العالم 2: قمم السحاب الهش',
    icon: '☁️',
    theme: 'peaks',
    descriptionEn: 'High alpine snow, floating cloud bouncy platforms, and lofty winds.',
    descriptionAr: 'مرتفعات شاهقة، منصات سحابية قطنية ارتدادية، ورياح عاصفة مرحة.',
    stagesCount: 9,
  },
  {
    worldNumber: 3,
    nameEn: 'Shining Falls',
    nameAr: 'العالم 3: الشلالات المتلألئة',
    icon: '🌊',
    theme: 'falls',
    descriptionEn: 'Cascading golden waterfalls, trial sanctuaries, and swift water currents.',
    descriptionAr: 'شلالات ذهبية رقراقة، معابد التدريب المائي، وتيارات جارفة ممتعة.',
    stagesCount: 8,
  },
  {
    worldNumber: 4,
    nameEn: 'Sunbaked Desert',
    nameAr: 'العالم 4: الصحراء المشمسة',
    icon: '☀️',
    theme: 'desert',
    descriptionEn: 'Golden sand dunes, mirages, ancient sandstone ruins, and moving sands.',
    descriptionAr: 'كثبان رملية مذهبة، سراب سحري، وآثار أثرية تتحرك فيها الرمال.',
    stagesCount: 9,
  },
  {
    worldNumber: 5,
    nameEn: 'Fungi Mines',
    nameAr: 'العالم 5: مناجم الفطر المتوهج',
    icon: '🍄',
    theme: 'mines',
    descriptionEn: 'Deep bioluminescent caves, glowing spore platforms, and underground drill secrets.',
    descriptionAr: 'كهوف مضيئة ذاتياً في باطن الأرض، فطريات براقة، وممرات حفر عميقة.',
    stagesCount: 8,
  },
  {
    worldNumber: 6,
    nameEn: 'Deep Magma Bog',
    nameAr: 'العالم 6: مستنقع الحمم السحيق',
    icon: '🌋',
    theme: 'magma',
    descriptionEn: 'Volcanic caverns, rising fiery magma surges, and molten stone pathways.',
    descriptionAr: 'براكين ثائرة، بحيرات حمم نارية متدفقة، وجسور صخرية متوهجة.',
    stagesCount: 8,
  },
  {
    worldNumber: 7,
    nameEn: 'Petal Isles',
    nameAr: 'العالم 7: جزر البتلات المركزية',
    icon: '🌺',
    theme: 'petals',
    descriptionEn: 'Tropical archipelago surrounding Castle Bowser with oceanic puzzles.',
    descriptionAr: 'أرخبيل استوائي خلاب يحيط بقلعة باوزر الطائرة مع ألغاز مائية ساحرة.',
    stagesCount: 8,
  },
  {
    worldNumber: 8,
    nameEn: 'Special World (The Core)',
    nameAr: 'العالم 8: العالم الخاص السري للمحترفين',
    icon: '⭐',
    theme: 'special',
    descriptionEn: 'Extreme expert gauntlet in outer space, cosmic gravity, and ultimate Wonder trials.',
    descriptionAr: 'عالم التحديات الخارقة للمحترفين في الفضاء الكوني مع جاذبية سريالية.',
    stagesCount: 8,
  },
];

// Helper to generate the full list of 67 stages with rich Wonder parameters
const generateAll67Stages = (): StageDefinition[] => {
  const stages: StageDefinition[] = [];

  const rawStageNames: Array<{
    w: number;
    sub: number;
    en: string;
    ar: string;
    diff: 1 | 2 | 3 | 4 | 5;
    theme: WorldTheme;
    wonder: WonderEffectType;
    wEn: string;
    wAr: string;
    tipEn: string;
    tipAr: string;
    palette: StageDefinition['palette'];
  }> = [
    // World 1: 9 stages (1 to 9)
    {
      w: 1, sub: 1, en: 'Welcome to the Flower Kingdom', ar: 'مرحباً في مملكة الزهور', diff: 1, theme: 'plateau', wonder: 'worm_pipes',
      wEn: 'Moving Inchworm Pipes', wAr: 'أنابيب تزحف كالدودة', tipEn: 'Look! The green pipes are alive!', tipAr: 'انظر! الأنابيب الخضراء تدب فيها الحياة!',
      palette: { skyTop: '#38BDF8', skyBottom: '#BAE6FD', groundGrass: '#15803D', groundDirt: '#92400E', pipeColor: '#22C55E', wonderSky: '#3B0764' }
    },
    {
      w: 1, sub: 2, en: 'Piranha Plants on Parade', ar: 'موكب أزهار البيرانا الغنائي', diff: 1, theme: 'plateau', wonder: 'musical_parade',
      wEn: 'Singing Piranha Choir', wAr: 'كورال البيرانا المغرد', tipEn: 'Listen to that lovely rhythm!', tipAr: 'استمع لهذا الإيقاع الموسيقي البديع!',
      palette: { skyTop: '#60A5FA', skyBottom: '#DBEAFE', groundGrass: '#16A34A', groundDirt: '#78350F', pipeColor: '#10B981', wonderSky: '#4C1D95' }
    },
    {
      w: 1, sub: 3, en: 'Scramble Through the Stumps', ar: 'التسلق السريع بين الجذوع', diff: 2, theme: 'plateau', wonder: 'coin_storm',
      wEn: 'Skyward Golden Coins Shower', wAr: 'أمطار العملات الذهبية', tipEn: 'Keep moving and snatch every coin!', tipAr: 'واصل الركض واجمع كل عملة!',
      palette: { skyTop: '#38BDF8', skyBottom: '#E0F2FE', groundGrass: '#15803D', groundDirt: '#854D0E', pipeColor: '#22C55E', wonderSky: '#581C87' }
    },
    {
      w: 1, sub: 4, en: 'Elephant March in the Meadow', ar: 'مسيرة الفيل فوق المروج', diff: 2, theme: 'plateau', wonder: 'giant_mode',
      wEn: 'Super Elephant Weight Slam', wAr: 'سحق الحواجز بوزن الفيل', tipEn: 'Your trunk can shatter blocks!', tipAr: 'خرطومك قادر على تفتيت الصخور!',
      palette: { skyTop: '#0EA5E9', skyBottom: '#BAE6FD', groundGrass: '#047857', groundDirt: '#713F12', pipeColor: '#16A34A', wonderSky: '#312E81' }
    },
    {
      w: 1, sub: 5, en: 'Badge Trial: Parachute Cap I', ar: 'تحدي الشارة: مظلة القبعة 1', diff: 1, theme: 'plateau', wonder: 'low_gravity',
      wEn: 'Floating Drift in Midair', wAr: 'التحليق العائم في الفضاء', tipEn: 'Hold jump to glide smoothly!', tipAr: 'استمر بالضغط للقفز والتحليق!',
      palette: { skyTop: '#38BDF8', skyBottom: '#E0F2FE', groundGrass: '#16A34A', groundDirt: '#854D0E', pipeColor: '#22C55E', wonderSky: '#1E1B4B' }
    },
    {
      w: 1, sub: 6, en: 'Swamp of the Slither Pipes', ar: 'مستنقع الأنابيب الثعبانية', diff: 2, theme: 'plateau', wonder: 'worm_pipes',
      wEn: 'Undulating Slither Pipes', wAr: 'أنابيب تتموج كالتموجات', tipEn: 'Ride the bending pipes!', tipAr: 'اركب فوق الأنابيب المتموجة!',
      palette: { skyTop: '#0284C7', skyBottom: '#BAE6FD', groundGrass: '#15803D', groundDirt: '#78350F', pipeColor: '#10B981', wonderSky: '#4338CA' }
    },
    {
      w: 1, sub: 7, en: 'Cosmic Hillside Run', ar: 'عدو التلال الكوني السريع', diff: 2, theme: 'plateau', wonder: 'speed_rush',
      wEn: 'Supersonic Sprint Momentum', wAr: 'سرعة نفاثة خارقة', tipEn: 'Sprint without touching the brakes!', tipAr: 'انطلق بأقصى سرعة دون توقف!',
      palette: { skyTop: '#6366F1', skyBottom: '#E0E7FF', groundGrass: '#059669', groundDirt: '#713F12', pipeColor: '#10B981', wonderSky: '#2E1065' }
    },
    {
      w: 1, sub: 8, en: 'Bulrush Coming Through!', ar: 'احذر هجوم الثيران البرية!', diff: 3, theme: 'plateau', wonder: 'speed_rush',
      wEn: 'Riding the Stampeding Bulrush', wAr: 'امتطاء قطيع الثيران الهادر', tipEn: 'Jump on their backs for a wild ride!', tipAr: 'اقفز فوق ظهورها لركوب مثير!',
      palette: { skyTop: '#F59E0B', skyBottom: '#FEF3C7', groundGrass: '#65A30D', groundDirt: '#78350F', pipeColor: '#16A34A', wonderSky: '#701A75' }
    },
    {
      w: 1, sub: 9, en: 'Pipe-Rock Fortress Showdown', ar: 'معركة قلعة الأنابيب الصخرية', diff: 3, theme: 'plateau', wonder: 'starry_sky',
      wEn: 'Wonder Bowser Castle Spores', wAr: 'أبواغ قلعة باوزر السحرية', tipEn: 'Collect the golden Wonder Seed!', tipAr: 'اجمع بذرة العجائب لاستعادة القصر!',
      palette: { skyTop: '#1E293B', skyBottom: '#475569', groundGrass: '#334155', groundDirt: '#1E293B', pipeColor: '#475569', wonderSky: '#0F172A' }
    },

    // World 2: 9 stages (10 to 18)
    {
      w: 2, sub: 1, en: 'Outmaway Valley Snowdrift', ar: 'وادي الثلوج المنجرفة', diff: 2, theme: 'peaks', wonder: 'low_gravity',
      wEn: 'Gliding Through Fluffy Clouds', wAr: 'الانزلاق عبر السحاب القطني', tipEn: 'These snowy slopes are bouncy!', tipAr: 'هذه المنحدرات الثلجية فائقة الارتداد!',
      palette: { skyTop: '#93C5FD', skyBottom: '#EFF6FF', groundGrass: '#E0F2FE', groundDirt: '#38BDF8', pipeColor: '#0284C7', wonderSky: '#1E3A8A' }
    },
    {
      w: 2, sub: 2, en: 'Pokey Pummel on Cloud Nine', ar: 'ملاكمة الصبار في أعالي الغيوم', diff: 2, theme: 'peaks', wonder: 'coin_storm',
      wEn: 'Floating Cloud Coin Rush', wAr: 'طوفان عملات الغيوم', tipEn: 'Bounce off the cloud trampolines!', tipAr: 'ارتد بقوة من منصات الترامبولين!',
      palette: { skyTop: '#60A5FA', skyBottom: '#DBEAFE', groundGrass: '#BAE6FD', groundDirt: '#0284C7', pipeColor: '#0EA5E9', wonderSky: '#3730A3' }
    },
    {
      w: 2, sub: 3, en: 'Jump! Jump! Jump! Rhythm Peaks', ar: 'اقفز! اقفز! قمم الإيقاع المتناغم', diff: 3, theme: 'peaks', wonder: 'musical_parade',
      wEn: 'Beat-Synced Disappearing Blocks', wAr: 'كتل تختفي وتظهر مع الإيقاع', tipEn: 'Jump strictly on the music beats!', tipAr: 'اقفز بدقة مع دقات الموسيقى!',
      palette: { skyTop: '#A855F7', skyBottom: '#F3E8FF', groundGrass: '#C084FC', groundDirt: '#6B21A8', pipeColor: '#9333EA', wonderSky: '#581C87' }
    },
    {
      w: 2, sub: 4, en: 'Fluff-Puff Mountain Skybridge', ar: 'جسر قمم السحاب المعلق', diff: 2, theme: 'peaks', wonder: 'low_gravity',
      wEn: 'Soaring High in Zero G', wAr: 'التحليق بانعدام الجاذبية', tipEn: 'Float gently above the abyss!', tipAr: 'حلق برقة فوق الهاوية السحيقة!',
      palette: { skyTop: '#38BDF8', skyBottom: '#E0F2FE', groundGrass: '#E2E8F0', groundDirt: '#64748B', pipeColor: '#0284C7', wonderSky: '#1E1B4B' }
    },
    {
      w: 2, sub: 5, en: 'Badge Trial: Wall-Climb Jump I', ar: 'تحدي الشارة: تسلق الجدران 1', diff: 2, theme: 'peaks', wonder: 'speed_rush',
      wEn: 'High-Altitude Vertical Scaling', wAr: 'تسلق القمم العمودية الشاهقة', tipEn: 'Scale sheer icy walls with ease!', tipAr: 'اصعد الجدران الثلجية العمودية بيسر!',
      palette: { skyTop: '#60A5FA', skyBottom: '#E0F2FE', groundGrass: '#CBD5E1', groundDirt: '#475569', pipeColor: '#38BDF8', wonderSky: '#0F172A' }
    },
    {
      w: 2, sub: 6, en: 'Condarts Away! High Flight', ar: 'سهام الطيور الحوامة في الأعالي', diff: 3, theme: 'peaks', wonder: 'bubble_storm',
      wEn: 'Floating Shield Bubble Stepping', wAr: 'القفز فوق فقاعات الحماية', tipEn: 'Shoot bubbles to trap dart birds!', tipAr: 'أطلق الفقاعات لاصطياد الطيور!',
      palette: { skyTop: '#818CF8', skyBottom: '#EEF2FF', groundGrass: '#E0E7FF', groundDirt: '#4338CA', pipeColor: '#6366F1', wonderSky: '#312E81' }
    },
    {
      w: 2, sub: 7, en: 'Pole-Vaulting on the Slopes', ar: 'القفز بالزانة فوق المنحدرات', diff: 3, theme: 'peaks', wonder: 'speed_rush',
      wEn: 'Pole Launch Across Glaciers', wAr: 'انطلاقات بهلوانية فوق الجليد', tipEn: 'Time your pole release for maximum air!', tipAr: 'اضبط توقيت الإفلات لتحقيق أقصى مدى!',
      palette: { skyTop: '#38BDF8', skyBottom: '#BAE6FD', groundGrass: '#F1F5F9', groundDirt: '#0369A1', pipeColor: '#0284C7', wonderSky: '#1E1B4B' }
    },
    {
      w: 2, sub: 8, en: 'Up \'n\' Down with Spring Feet', ar: 'صعود وهبوط بالأقدام الزنبركية', diff: 4, theme: 'peaks', wonder: 'giant_mode',
      wEn: 'Trampoline Giant Bounce', wAr: 'قفزات زنبركية عملاقة', tipEn: 'Don\'t panic, bounce continuously!', tipAr: 'لا ترتبك، واصل الارتداد المتتابع!',
      palette: { skyTop: '#A78BFA', skyBottom: '#EDE9FE', groundGrass: '#DDD6FE', groundDirt: '#5B21B6', pipeColor: '#7C3AED', wonderSky: '#4C1D95' }
    },
    {
      w: 2, sub: 9, en: 'Fluff-Puff Palace Airship Siege', ar: 'حصار المنطاد الطائر في قمم السحاب', diff: 4, theme: 'peaks', wonder: 'starry_sky',
      wEn: 'Mecha-Bowser Cannon Storm', wAr: 'عاصفة مدافع ميكا-باوزر', tipEn: 'Dodge the guided missile fire!', tipAr: 'تفادَ صواريخ المدفعية الموجهة!',
      palette: { skyTop: '#1E293B', skyBottom: '#334155', groundGrass: '#475569', groundDirt: '#0F172A', pipeColor: '#64748B', wonderSky: '#020617' }
    },

    // World 3: 8 stages (19 to 26)
    {
      w: 3, sub: 1, en: 'The Angle Fish Rapids', ar: 'منحدرات أسماك الزوايا المائية', diff: 2, theme: 'falls', wonder: 'bubble_storm',
      wEn: 'Water Sphere Floating Bubbles', wAr: 'فقاعات مائية عائمة قابلة للسباحة', tipEn: 'Swim inside the floating water bubbles!', tipAr: 'اسبح داخل فقاعات الماء العائمة!',
      palette: { skyTop: '#2DD4BF', skyBottom: '#CCFBF1', groundGrass: '#0D9488', groundDirt: '#115E59', pipeColor: '#14B8A6', wonderSky: '#042F2E' }
    },
    {
      w: 3, sub: 2, en: 'Master Poplin\'s Waterfall Trail', ar: 'درب شلالات بوبلين الحكيم', diff: 2, theme: 'falls', wonder: 'coin_storm',
      wEn: 'Golden Waterfall Currency Surge', wAr: 'تدفق الذهب من الشلالات', tipEn: 'Dive into the spray for flower coins!', tipAr: 'اغطس في الرذاذ لجلب عملات الزهور!',
      palette: { skyTop: '#06B6D4', skyBottom: '#CFFAFE', groundGrass: '#0891B2', groundDirt: '#155E75', pipeColor: '#0E7490', wonderSky: '#083344' }
    },
    {
      w: 3, sub: 3, en: 'Spike\'s Sunken Caverns', ar: 'كهوف سبايك الغارقة بالأسرار', diff: 3, theme: 'falls', wonder: 'low_gravity',
      wEn: 'Aquatic Weightless Current', wAr: 'تيار سباحة منعدم الوزن', tipEn: 'Elephant trunk can reflect spike balls!', tipAr: 'خرطوم الفيل يعكس كرات الأشواك!',
      palette: { skyTop: '#0284C7', skyBottom: '#E0F2FE', groundGrass: '#0369A1', groundDirt: '#075985', pipeColor: '#0284C7', wonderSky: '#0C4A6E' }
    },
    {
      w: 3, sub: 4, en: 'Trial of the Dolphin Kick', ar: 'اختبار شارة ركلة الدلفين', diff: 2, theme: 'falls', wonder: 'speed_rush',
      wEn: 'Hyper Dolphin Jet Surge', wAr: 'اندفاعة الدلفين النفاثة', tipEn: 'Burst forward to smash stone walls!', tipAr: 'اندفع بقوة لسحق الجدران الحجرية!',
      palette: { skyTop: '#38BDF8', skyBottom: '#BAE6FD', groundGrass: '#0284C7', groundDirt: '#0369A1', pipeColor: '#0EA5E9', wonderSky: '#082F49' }
    },
    {
      w: 3, sub: 5, en: 'Resplendent Lotus Pools', ar: 'برك زهور اللوتس البراقة', diff: 3, theme: 'falls', wonder: 'musical_parade',
      wEn: 'Lotus Lilypad Rhythm Concert', wAr: 'حفل أوراق اللوتس الإيقاعي', tipEn: 'Lotus pads open to the melody!', tipAr: 'أوراق اللوتس تتفتح مع النغمات!',
      palette: { skyTop: '#F472B6', skyBottom: '#FCE7F3', groundGrass: '#DB2777', groundDirt: '#831843', pipeColor: '#EC4899', wonderSky: '#500724' }
    },
    {
      w: 3, sub: 6, en: 'Zip Line Water Falls', ar: 'حبال الانزلاق فوق الشلال', diff: 3, theme: 'falls', wonder: 'speed_rush',
      wEn: 'Supersonic Zip Wire Descent', wAr: 'هبوط نفاث فائق السرعة بالحبال', tipEn: 'Hold onto the lines and slide!', tipAr: 'تمسك بالحبال وتزحلق فوق الهاوية!',
      palette: { skyTop: '#22D3EE', skyBottom: '#CFFAFE', groundGrass: '#0891B2', groundDirt: '#164E63', pipeColor: '#06B6D4', wonderSky: '#164E63' }
    },
    {
      w: 3, sub: 7, en: 'Spike-Bar Geyser Ascent', ar: 'صعود نواعير الأعمدة الشوكية', diff: 4, theme: 'falls', wonder: 'worm_pipes',
      wEn: 'Fountain Geyser Elevators', wAr: 'مصاعد النوافير المائية المتموجة', tipEn: 'Ride the gushing water geysers!', tipAr: 'امتطِ نوافير المياه المندفعة للأعلى!',
      palette: { skyTop: '#38BDF8', skyBottom: '#E0F2FE', groundGrass: '#0284C7', groundDirt: '#0C4A6E', pipeColor: '#0369A1', wonderSky: '#082F49' }
    },
    {
      w: 3, sub: 8, en: 'The Royal Falls Trial Sanctum', ar: 'محراب التدريب الملكي في الشلالات', diff: 4, theme: 'falls', wonder: 'starry_sky',
      wEn: 'Waterfall Starry Climax', wAr: 'تتويج الشلالات الكوني النجمي', tipEn: 'Earn the Master Poplin\'s blessing!', tipAr: 'نل مباركة المعلم بوبلين وبذرة العجائب!',
      palette: { skyTop: '#1E293B', skyBottom: '#0F172A', groundGrass: '#0891B2', groundDirt: '#155E75', pipeColor: '#06B6D4', wonderSky: '#020617' }
    },

    // World 4: 9 stages (27 to 35)
    {
      w: 4, sub: 1, en: 'Armads on the Sand Dunes', ar: 'كائنات الأرماد فوق الكثبان الرملية', diff: 2, theme: 'desert', wonder: 'giant_mode',
      wEn: 'Rolling Spike Boulder Morph', wAr: 'التحول إلى كرة شوكية عملاقة متدحرجة', tipEn: 'Roll over everything in your path!', tipAr: 'تدحرج واسحق كل شيء يعترض طريقك!',
      palette: { skyTop: '#FBBF24', skyBottom: '#FEF3C7', groundGrass: '#D97706', groundDirt: '#92400E', pipeColor: '#B45309', wonderSky: '#78350F' }
    },
    {
      w: 4, sub: 2, en: 'Secrets of the Mirage Oasis', ar: 'أسرار واحة السراب السحرية', diff: 2, theme: 'desert', wonder: 'starry_sky',
      wEn: 'Illusionary Mirage Transformation', wAr: 'تحولات السراب الخادعة للبصر', tipEn: 'Things are not what they seem!', tipAr: 'الأشياء في الواحة تختلف عما تبدو!',
      palette: { skyTop: '#F59E0B', skyBottom: '#FDE68A', groundGrass: '#10B981', groundDirt: '#78350F', pipeColor: '#059669', wonderSky: '#451A03' }
    },
    {
      w: 4, sub: 3, en: 'Badge Trial: Crouching High Jump', ar: 'تحدي الشارة: قفزة القرفصاء العالية', diff: 2, theme: 'desert', wonder: 'low_gravity',
      wEn: 'Sky-High Vaulting Charge', wAr: 'قفزات شاهقة تتحدى الجاذبية', tipEn: 'Duck down, charge up, and rocket up!', tipAr: 'انحنِ بوضع القرفصاء واشحن ثم انطلق!',
      palette: { skyTop: '#F59E0B', skyBottom: '#FEF3C7', groundGrass: '#D97706', groundDirt: '#B45309', pipeColor: '#92400E', wonderSky: '#7C2D12' }
    },
    {
      w: 4, sub: 4, en: 'Sinking Sand and Snifits', ar: 'الرمال المتحركة وجنود السنيفيت', diff: 3, theme: 'desert', wonder: 'speed_rush',
      wEn: 'Quicksand High-Speed Sprint', wAr: 'ركض نفاث فوق الرمال المتحركة', tipEn: 'Don\'t stand still or you\'ll sink!', tipAr: 'لا تقف ثابتاً كي لا تبتلعك الرمال!',
      palette: { skyTop: '#D97706', skyBottom: '#FDE68A', groundGrass: '#B45309', groundDirt: '#78350F', pipeColor: '#92400E', wonderSky: '#451A03' }
    },
    {
      w: 4, sub: 5, en: 'Rolling Iron Spikes Ruins', ar: 'أطلال الأعمدة الحديدية المتدحرجة', diff: 3, theme: 'desert', wonder: 'worm_pipes',
      wEn: 'Bending Sandstone Columns', wAr: 'أعمدة رملية حية تنحني وتلتف', tipEn: 'Use Drill power to burrow safely!', tipAr: 'استخدم قوة الحفر للغوص وتفادي الخطر!',
      palette: { skyTop: '#F59E0B', skyBottom: '#FFFBEB', groundGrass: '#92400E', groundDirt: '#78350F', pipeColor: '#B45309', wonderSky: '#7C2D12' }
    },
    {
      w: 4, sub: 6, en: 'Sunbaked Pyramid Chambers', ar: 'سراديب الأهرامات المشمسة', diff: 3, theme: 'desert', wonder: 'coin_storm',
      wEn: 'Pharaoh Wonder Coin Tempest', wAr: 'عاصفة الكنوز والعملات الفرعونية', tipEn: 'Burrow in ceilings to find hidden tombs!', tipAr: 'احفر في السقف لكشف المقابر السرية!',
      palette: { skyTop: '#B45309', skyBottom: '#FDE68A', groundGrass: '#78350F', groundDirt: '#451A03', pipeColor: '#92400E', wonderSky: '#2E1065' }
    },
    {
      w: 4, sub: 7, en: 'Mummy Pokey Party', ar: 'حفلة المومياوات الشوكية', diff: 4, theme: 'desert', wonder: 'musical_parade',
      wEn: 'Mummy Dance Beat Fiesta', wAr: 'رقصة المومياوات الإيقاعية الساخرة', tipEn: 'Unravel the mummy wraps with your run!', tipAr: 'فك لفائف المومياء بحركتك السريعة!',
      palette: { skyTop: '#F59E0B', skyBottom: '#FEF3C7', groundGrass: '#B45309', groundDirt: '#78350F', pipeColor: '#D97706', wonderSky: '#701A75' }
    },
    {
      w: 4, sub: 8, en: 'Desert Oasis Mirage Labyrinth', ar: 'متاهة واحة السراب الخادعة', diff: 4, theme: 'desert', wonder: 'low_gravity',
      wEn: 'Upside-Down Desert Mirage', wAr: 'انقلاب الجاذبية وعالم السراب المعكوس', tipEn: 'Walk upside down on ceilings!', tipAr: 'امشِ مقلوباً فوق أسقف المتاهة!',
      palette: { skyTop: '#EA580C', skyBottom: '#FFEDD5', groundGrass: '#9A3412', groundDirt: '#7C2D12', pipeColor: '#C2410C', wonderSky: '#431407' }
    },
    {
      w: 4, sub: 9, en: 'Sunbaked Fortress: Bowser\'s Sieve', ar: 'قلعة الصحراء: مصفاة باوزر النارية', diff: 4, theme: 'desert', wonder: 'starry_sky',
      wEn: 'Lava-Sand Fortress Collapse', wAr: 'انهيار قلعة الرمال المتوهجة', tipEn: 'Escape before the sands engulf the gate!', tipAr: 'اهرب قبل أن تبتلع الرمال البوابة!',
      palette: { skyTop: '#1E293B', skyBottom: '#78350F', groundGrass: '#451A03', groundDirt: '#1C1917', pipeColor: '#78350F', wonderSky: '#0F172A' }
    },

    // World 5: 8 stages (36 to 43)
    {
      w: 5, sub: 1, en: 'Upshroom Glowing Cavern', ar: 'كهف الفطر الصاعد المتوهج', diff: 2, theme: 'mines', wonder: 'low_gravity',
      wEn: 'Floating Spore Gravity Shift', wAr: 'تحليق خفيف مع أبواغ الفطر المنعدم الجاذبية', tipEn: 'Bounce from glowing cap to cap!', tipAr: 'تنقل بالقفز بين قبعات الفطر المشعة!',
      palette: { skyTop: '#1E1B4B', skyBottom: '#312E81', groundGrass: '#4338CA', groundDirt: '#1E1B4B', pipeColor: '#6366F1', wonderSky: '#020617' }
    },
    {
      w: 5, sub: 2, en: 'Drill Deep in the Biolum Mines', ar: 'الحفر العميق في مناجم النور الحيوي', diff: 3, theme: 'mines', wonder: 'worm_pipes',
      wEn: 'Living Crystal Drill Worms', wAr: 'ديدان الكريستال الحية الحفارة', tipEn: 'Drill into ceilings to bypass abysses!', tipAr: 'احفر في السقف لتخطي الفجوات السحيقة!',
      palette: { skyTop: '#0F172A', skyBottom: '#1E293B', groundGrass: '#06B6D4', groundDirt: '#0891B2', pipeColor: '#0E7490', wonderSky: '#164E63' }
    },
    {
      w: 5, sub: 3, en: 'Spore-Spitting Fungus Garden', ar: 'حديقة الفطريات قاذفة الأبواغ', diff: 3, theme: 'mines', wonder: 'coin_storm',
      wEn: 'Luminescent Spore Coin Eruption', wAr: 'انفجار عملات الأبواغ المشعة', tipEn: 'Watch out for spore clouds!', tipAr: 'احذر من سحب الأبواغ العاطسة!',
      palette: { skyTop: '#3B0764', skyBottom: '#581C87', groundGrass: '#A855F7', groundDirt: '#3B0764', pipeColor: '#C084FC', wonderSky: '#2E1065' }
    },
    {
      w: 5, sub: 4, en: 'Badge Trial: Grappling Vine', ar: 'تحدي الشارة: نبتة الخطاف المتسلقة', diff: 3, theme: 'mines', wonder: 'speed_rush',
      wEn: 'Tarzan Vine Swing Rush', wAr: 'أرجحة الحبال المتسلقة السريعة', tipEn: 'Shoot your vine to latch onto walls!', tipAr: 'أطلق نبتتك لتلتصق بالجدران وتتأرجح!',
      palette: { skyTop: '#14532D', skyBottom: '#166534', groundGrass: '#22C55E', groundDirt: '#14532D', pipeColor: '#16A34A', wonderSky: '#052E16' }
    },
    {
      w: 5, sub: 5, en: 'Light the Mine-Cart Way', ar: 'إنارة مسار عربة المنجم المظلمة', diff: 3, theme: 'mines', wonder: 'starry_sky',
      wEn: 'Silhouette Shadow-Puppet Mario', wAr: 'عالم الظلال والسلويت السينمائي', tipEn: 'You are now a sleek shadow!', tipAr: 'تحولت الآن إلى خيال ظل رشيق وأنيق!',
      palette: { skyTop: '#020617', skyBottom: '#0F172A', groundGrass: '#1E293B', groundDirt: '#020617', pipeColor: '#334155', wonderSky: '#000000' }
    },
    {
      w: 5, sub: 6, en: 'Tox-Shroom Swamp Underground', ar: 'مستنقع الفطر السام السري', diff: 4, theme: 'mines', wonder: 'bubble_storm',
      wEn: 'Toxic Mist Floating Protection Bubbles', wAr: 'فقاعات واقية عائمة فوق السم', tipEn: 'Bounce on bubbles to avoid the purple ooze!', tipAr: 'اقفز فوق الفقاعات لتفادي السائل السام!',
      palette: { skyTop: '#581C87', skyBottom: '#701A75', groundGrass: '#A21CAF', groundDirt: '#4A044E', pipeColor: '#C026D3', wonderSky: '#2E1065' }
    },
    {
      w: 5, sub: 7, en: 'The Great Crystal Dig', ar: 'الحفريات الكريستالية الكبرى', diff: 4, theme: 'mines', wonder: 'giant_mode',
      wEn: 'Giant Spiked Crystal Crusher', wAr: 'تفتيت الكريستال العملاق الثقيل', tipEn: 'Drill through solid amethyst!', tipAr: 'احفر عبر صخور الجمشت الصلبة!',
      palette: { skyTop: '#1E1B4B', skyBottom: '#312E81', groundGrass: '#818CF8', groundDirt: '#3730A3', pipeColor: '#6366F1', wonderSky: '#1E1B4B' }
    },
    {
      w: 5, sub: 8, en: 'Fungi Citadel: The Royal Spore Engine', ar: 'قلعة الفطر: محرك الأبواغ الملكي', diff: 4, theme: 'mines', wonder: 'musical_parade',
      wEn: 'Mechanical Clockwork Spore March', wAr: 'موكب تروس الساعة الفطرية الميكانيكية', tipEn: 'Time your jumps with the swinging clockwork!', tipAr: 'انسجم مع تروس الساعة المتأرجحة واظفر بالبذرة!',
      palette: { skyTop: '#0F172A', skyBottom: '#1E293B', groundGrass: '#475569', groundDirt: '#0F172A', pipeColor: '#64748B', wonderSky: '#020617' }
    },

    // World 6: 8 stages (44 to 51)
    {
      w: 6, sub: 1, en: 'Deep Magma Basin Incline', ar: 'منحدر حوض الحمم البركانية السحيق', diff: 3, theme: 'magma', wonder: 'speed_rush',
      wEn: 'Rising Lava Tide Escape', wAr: 'الهروب الخاطف من طوفان الحمم الصاعدة', tipEn: 'Run! The molten lava is rising fast!', tipAr: 'اركض! الحمم المنصهرة تصعد بسرعة!',
      palette: { skyTop: '#7F1D1D', skyBottom: '#991B1B', groundGrass: '#DC2626', groundDirt: '#450A0A', pipeColor: '#EF4444', wonderSky: '#450A0A' }
    },
    {
      w: 6, sub: 2, en: 'Hot-Foot Hurdles on Basalt', ar: 'حواجز الأقدام الساخنة فوق البازلت', diff: 3, theme: 'magma', wonder: 'worm_pipes',
      wEn: 'Molten Elastic Rubber Pipes', wAr: 'أنابيب مطاطية منصهرة تتلوى كالأفاعي', tipEn: 'Watch out for hot rocks that scorch your soles!', tipAr: 'احذر الصخور الساخنة التي تلسع أقدامك!',
      palette: { skyTop: '#991B1B', skyBottom: '#B91C1C', groundGrass: '#EA580C', groundDirt: '#431407', pipeColor: '#F97316', wonderSky: '#7C2D12' }
    },
    {
      w: 6, sub: 3, en: 'Wavy Firebars in the Deep', ar: 'قضبان اللهب الدوارة في الأعماق', diff: 4, theme: 'magma', wonder: 'low_gravity',
      wEn: 'Floating Through the Firestorms', wAr: 'التحليق العائم بين العواصف النارية', tipEn: 'Duck under the spinning firebars!', tipAr: 'انحنِ بذكاء تحت قضبان النار الدوارة!',
      palette: { skyTop: '#7C2D12', skyBottom: '#9A3412', groundGrass: '#C2410C', groundDirt: '#431407', pipeColor: '#EA580C', wonderSky: '#2E1065' }
    },
    {
      w: 6, sub: 4, en: 'Badge Trial: Invisibility I', ar: 'تحدي الشارة: شارة الاختفاء 1', diff: 4, theme: 'magma', wonder: 'starry_sky',
      wEn: 'Ghostly Invisible Navigation', wAr: 'الملاحة الشبحية الخفية بالكامل', tipEn: 'You are completely invisible! Sense your steps!', tipAr: 'أنت غير مرئي تماماً! استشعر خطواتك بذكاء!',
      palette: { skyTop: '#1E1B4B', skyBottom: '#312E81', groundGrass: '#4338CA', groundDirt: '#1E1B4B', pipeColor: '#6366F1', wonderSky: '#020617' }
    },
    {
      w: 6, sub: 5, en: 'Dragon\'s Breath Magma Chasm', ar: 'هوة أنفاس التنين الحارقة', diff: 4, theme: 'magma', wonder: 'giant_mode',
      wEn: 'Giant Bowser Meteor Shower', wAr: 'أمطار نيازك باوزر المتوهجة', tipEn: 'Elephant trunk can spray water to freeze lava!', tipAr: 'خرطوم الفيل يرش الماء لتجميد الحمم!',
      palette: { skyTop: '#450A0A', skyBottom: '#7F1D1D', groundGrass: '#B91C1C', groundDirt: '#18181B', pipeColor: '#EF4444', wonderSky: '#000000' }
    },
    {
      w: 6, sub: 6, en: 'Rolling Obsidian Spikes', ar: 'صخور الزجاج البركاني المتدحرجة', diff: 4, theme: 'magma', wonder: 'speed_rush',
      wEn: 'Obsidian Avalanche Downhill', wAr: 'انهيار صخور الأوبسيديان المتدحرجة', tipEn: 'Sprint over collapsing volcanic bridges!', tipAr: 'اركض بسرعة فوق الجسور البركانية المنهارة!',
      palette: { skyTop: '#18181B', skyBottom: '#27272A', groundGrass: '#71717A', groundDirt: '#09090B', pipeColor: '#52525B', wonderSky: '#450A0A' }
    },
    {
      w: 6, sub: 7, en: 'Crucible of the Fire Snakes', ar: 'محرقة أفاعي اللهب المتوهجة', diff: 5, theme: 'magma', wonder: 'musical_parade',
      wEn: 'Fiery Lava Snake Symphony', wAr: 'سيمفونية أفاعي النار الراقصة', tipEn: 'Leap between the fiery serpents in rhythm!', tipAr: 'اقفز بين أفاعي النار المتراقصة بتناغم!',
      palette: { skyTop: '#7F1D1D', skyBottom: '#991B1B', groundGrass: '#DC2626', groundDirt: '#450A0A', pipeColor: '#EF4444', wonderSky: '#701A75' }
    },
    {
      w: 6, sub: 8, en: 'Castle Bowser Core: Magma Engine', ar: 'قلب قلعة باوزر: المحرك البركاني', diff: 5, theme: 'magma', wonder: 'starry_sky',
      wEn: 'Castle Bowser Final Blast', wAr: 'الانفجار النهائي لقلعة باوزر البركانية', tipEn: 'Smash the power core with your ground drill!', tipAr: 'حطم المولد بالطحن الحفري واظفر بالنصر!',
      palette: { skyTop: '#09090B', skyBottom: '#18181B', groundGrass: '#DC2626', groundDirt: '#000000', pipeColor: '#991B1B', wonderSky: '#000000' }
    },

    // World 7: 8 stages (52 to 59)
    {
      w: 7, sub: 1, en: 'Leaping Dolphins in the Coral Bay', ar: 'دلافين خليج المرجان القافزة', diff: 2, theme: 'petals', wonder: 'bubble_storm',
      wEn: 'Whale-Ride Water Surface Flight', wAr: 'ركوب الحيتان والتحليق فوق سطح الماء', tipEn: 'Ride with the joyous sea creatures!', tipAr: 'امرح مع كائنات البحر الزاهية!',
      palette: { skyTop: '#06B6D4', skyBottom: '#CFFAFE', groundGrass: '#0891B2', groundDirt: '#155E75', pipeColor: '#0E7490', wonderSky: '#083344' }
    },
    {
      w: 7, sub: 2, en: 'Angelfish Archipelago Islands', ar: 'جزر أسماك الملاك الاستوائية', diff: 2, theme: 'petals', wonder: 'coin_storm',
      wEn: 'Tropical Flower Coin Rain', wAr: 'أمطار عملات الزهور الاستوائية', tipEn: 'Snatch flower coins amidst gentle tides!', tipAr: 'اقتنص عملات الزهور بين المد والجزر اللطيف!',
      palette: { skyTop: '#38BDF8', skyBottom: '#E0F2FE', groundGrass: '#10B981', groundDirt: '#065F46', pipeColor: '#059669', wonderSky: '#1E1B4B' }
    },
    {
      w: 7, sub: 3, en: 'Petal Breeze Floating Sanctuary', ar: 'محراب نسيم البتلات العائم', diff: 3, theme: 'petals', wonder: 'low_gravity',
      wEn: 'Floating Petal Gliding Zephyr', wAr: 'التحليق مع نسيم البتلات المتطايرة', tipEn: 'Princess Peach glides endlessly on these breezes!', tipAr: 'الأميرة بيتش تنزلق بسلاسة مع هذا النسيم!',
      palette: { skyTop: '#F472B6', skyBottom: '#FCE7F3', groundGrass: '#EC4899', groundDirt: '#9D174D', pipeColor: '#DB2777', wonderSky: '#701A75' }
    },
    {
      w: 7, sub: 4, en: 'Missile Snifits on the Beach', ar: 'قذائف السنيفيت فوق الشاطئ الذهبي', diff: 3, theme: 'petals', wonder: 'speed_rush',
      wEn: 'Sand-Skimming Jetboard Rush', wAr: 'اندفاعة التزلج النفاث فوق الرمال المائية', tipEn: 'Dodge the incoming fireworks!', tipAr: 'تفادَ الألعاب النارية المنطلقة!',
      palette: { skyTop: '#FBBF24', skyBottom: '#FEF3C7', groundGrass: '#F59E0B', groundDirt: '#B45309', pipeColor: '#D97706', wonderSky: '#78350F' }
    },
    {
      w: 7, sub: 5, en: 'Underwater Bubble Coral Reef', ar: 'شعاب المرجان الفقاعية الغاطسة', diff: 3, theme: 'petals', wonder: 'bubble_storm',
      wEn: 'Coral Giant Bubble Trampoline', wAr: 'ترامبولين الفقاعات المرجانية العملاقة', tipEn: 'Use Bubble form to trap electric eels!', tipAr: 'استخدم الفقاعات لاحتجاز ثعابين البحر الكهربائية!',
      palette: { skyTop: '#0284C7', skyBottom: '#BAE6FD', groundGrass: '#0369A1', groundDirt: '#075985', pipeColor: '#0284C7', wonderSky: '#0C4A6E' }
    },
    {
      w: 7, sub: 6, en: 'Spike-Bar Island Crossing', ar: 'عبور جزيرة القضبان الشوكية', diff: 4, theme: 'petals', wonder: 'worm_pipes',
      wEn: 'Slithering Coral Pipe Bridges', wAr: 'جسور الأنابيب المرجانية الزاحفة', tipEn: 'Cross the open sea on crawling pipes!', tipAr: 'اعبر البحر المفتوح فوق الأنابيب الزاحفة!',
      palette: { skyTop: '#0D9488', skyBottom: '#CCFBF1', groundGrass: '#14B8A6', groundDirt: '#115E59', pipeColor: '#0F766E', wonderSky: '#042F2E' }
    },
    {
      w: 7, sub: 7, en: 'Storm Over Petal Castle Guard', ar: 'عاصفة حرس قلعة البتلات الجوية', diff: 4, theme: 'petals', wonder: 'musical_parade',
      wEn: 'Tropical Thunderstorm Rhythm', wAr: 'إيقاع العاصفة الرعدية الاستوائية المغردة', tipEn: 'Listen to thunderclaps for safe timing!', tipAr: 'استمع لدقات الرعد لتحديد التوقيت الآمن!',
      palette: { skyTop: '#334155', skyBottom: '#64748B', groundGrass: '#0284C7', groundDirt: '#1E293B', pipeColor: '#0EA5E9', wonderSky: '#0F172A' }
    },
    {
      w: 7, sub: 8, en: 'Grand Petal Fortress Breach', ar: 'اقتحام حصن البتلات الملكي الأكبر', diff: 5, theme: 'petals', wonder: 'starry_sky',
      wEn: 'Prince Florian Grand Awakening', wAr: 'الصحوة الكبرى للأمير فلوريان وبذور العجائب', tipEn: 'Collect the master seed to unlock the Special World!', tipAr: 'اجمع البذرة الرئيسية لفتح العالم الخاص السري!',
      palette: { skyTop: '#1E1B4B', skyBottom: '#312E81', groundGrass: '#A855F7', groundDirt: '#4C1D95', pipeColor: '#9333EA', wonderSky: '#020617' }
    },

    // World 8: Special World - 8 Extreme Expert Stages (60 to 67)
    {
      w: 8, sub: 1, en: 'Special World: Pipe-Rock Climax', ar: 'العالم الخاص: ذروة الأنابيب البهلوانية', diff: 5, theme: 'special', wonder: 'worm_pipes',
      wEn: 'Hyper-Agile Worm Pipe Acrobatics', wAr: 'بهلوانيات أنابيب الديدان فائقة السرعة', tipEn: 'Every jump requires pinpoint accuracy!', tipAr: 'كل قفزة هنا تتطلب دقة متناهية بالمليمتر!',
      palette: { skyTop: '#581C87', skyBottom: '#3B0764', groundGrass: '#C084FC', groundDirt: '#3B0764', pipeColor: '#A855F7', wonderSky: '#000000' }
    },
    {
      w: 8, sub: 2, en: 'Special World: Fluff-Puff Cloud Gauntlet', ar: 'العالم الخاص: حلبة السحاب العاصف', diff: 5, theme: 'special', wonder: 'speed_rush',
      wEn: 'Jet Run Air-Sprint Over the Void', wAr: 'ركض نفاث في الهواء فوق الفراغ المطلق', tipEn: 'Never stop running across the thin air!', tipAr: 'لا تتوقف عن الركض فوق الهواء مباشرة!',
      palette: { skyTop: '#1E1B4B', skyBottom: '#4338CA', groundGrass: '#818CF8', groundDirt: '#1E1B4B', pipeColor: '#6366F1', wonderSky: '#0F172A' }
    },
    {
      w: 8, sub: 3, en: 'Special World: Shining Falls Cascade', ar: 'العالم الخاص: شلالات النور الكونية', diff: 5, theme: 'special', wonder: 'low_gravity',
      wEn: 'Weightless Golden Waterfall Soar', wAr: 'تحليق حر منعدم الجاذبية في الشلالات', tipEn: 'Maneuver through spinning energy cutters!', tipAr: 'راوغ القواطع الدورانية في الفضاء المنعدم!',
      palette: { skyTop: '#083344', skyBottom: '#0E7490', groundGrass: '#22D3EE', groundDirt: '#083344', pipeColor: '#06B6D4', wonderSky: '#020617' }
    },
    {
      w: 8, sub: 4, en: 'Special World: Sunbaked Cosmic Sands', ar: 'العالم الخاص: رمال المجرة المشمسة', diff: 5, theme: 'special', wonder: 'giant_mode',
      wEn: 'Meteorite Giant Bowling Frenzy', wAr: 'تدحرج نيزكي عملاق يسحق الحواجز', tipEn: 'Roll through titanium blocks!', tipAr: 'تدحرج كنيزك خارق يحطم التيتانيوم!',
      palette: { skyTop: '#451A03', skyBottom: '#92400E', groundGrass: '#F59E0B', groundDirt: '#451A03', pipeColor: '#D97706', wonderSky: '#000000' }
    },
    {
      w: 8, sub: 5, en: 'Special World: Fungi Deep Abyss', ar: 'العالم الخاص: هاوية الفطر السحيقة', diff: 5, theme: 'special', wonder: 'bubble_storm',
      wEn: 'Hyperspace Bubble Bounce Gauntlet', wAr: 'تتابع قفزات الفقاعات في الفضاء الخارق', tipEn: 'Bounce from bubble to bubble without touching floor!', tipAr: 'اقفز من فقاعة لأخرى دون ملامسة الأرض إطلاقاً!',
      palette: { skyTop: '#2E1065', skyBottom: '#581C87', groundGrass: '#E879F9', groundDirt: '#3B0764', pipeColor: '#D946EF', wonderSky: '#020617' }
    },
    {
      w: 8, sub: 6, en: 'Special World: Magma Inferno Trial', ar: 'العالم الخاص: جحيم الحمم البركانية', diff: 5, theme: 'special', wonder: 'speed_rush',
      wEn: 'Inferno Super-Speed Sprint', wAr: 'عدو بركاني جنوني متفجر', tipEn: 'The floor is instant defeat! Keep vaulting!', tipAr: 'الأرض هنا منصهرة تماماً! واصل الوثب العالي!',
      palette: { skyTop: '#450A0A', skyBottom: '#7F1D1D', groundGrass: '#F87171', groundDirt: '#450A0A', pipeColor: '#EF4444', wonderSky: '#000000' }
    },
    {
      w: 8, sub: 7, en: 'Special World: The Wonder Symphony', ar: 'العالم الخاص: سيمفونية العجائب الكبرى', diff: 5, theme: 'special', wonder: 'musical_parade',
      wEn: 'Orchestral Wonder Melody Master', wAr: 'أوركسترا العجائب الإيقاعية الأسطورية', tipEn: 'The ultimate rhythmic dance of platforms and pipes!', tipAr: 'الرقصة الإيقاعية الكبرى بين المنصات والأنابيب الحية!',
      palette: { skyTop: '#1E1B4B', skyBottom: '#4C1D95', groundGrass: '#C084FC', groundDirt: '#1E1B4B', pipeColor: '#A855F7', wonderSky: '#000000' }
    },
    {
      w: 8, sub: 8, en: 'The Final-Final Test: Badge Marathon', ar: 'العالم الخاص 67: ماراثون الشارات الأسطوري الأخير', diff: 5, theme: 'special', wonder: 'starry_sky',
      wEn: 'Supreme Wonder Mastery Climax', wAr: 'التتويج الأسطوري الأكبر وإتقان كل الشارات', tipEn: 'You conquered all 67 stages of Super Mario Wonder!', tipAr: 'أنت بطل حقيقي! لقد اجتزت جميع مراحل سوبر ماريو وندر الـ 67!',
      palette: { skyTop: '#020617', skyBottom: '#1E1B4B', groundGrass: '#FBBF24', groundDirt: '#000000', pipeColor: '#F59E0B', wonderSky: '#000000' }
    },
  ];

  rawStageNames.forEach((item, index) => {
    const stageId = index + 1; // 1 to 67
    const worldObj = WORLDS.find((w) => w.worldNumber === item.w)!;

    stages.push({
      id: stageId,
      stageCode: `W${item.w}-${item.sub}`,
      worldNumber: item.w,
      worldNameEn: worldObj.nameEn,
      worldNameAr: worldObj.nameAr,
      nameEn: item.en,
      nameAr: item.ar,
      difficulty: item.diff,
      theme: item.theme,
      wonderEffect: item.wonder,
      wonderNameEn: item.wEn,
      wonderNameAr: item.wAr,
      flowerTipEn: item.tipEn,
      flowerTipAr: item.tipAr,
      palette: item.palette,
    });
  });

  return stages;
};

export const ALL_67_STAGES: StageDefinition[] = generateAll67Stages();
