import { CharacterInfo, PowerUpInfo, BadgeInfo, QuizQuestion } from '../types/game';

export const CHARACTERS: CharacterInfo[] = [
  {
    id: 'mario',
    nameEn: 'Mario',
    nameAr: 'ماريو',
    titleEn: 'The Hero of the Mushroom Kingdom',
    titleAr: 'بطل مملكة الفطر والمغامر الأسطوري',
    color: '#E52521',
    secondaryColor: '#002688',
    avatarColor: 'bg-red-600',
    isInvulnerable: false,
    speed: 5.2,
    jumpForce: 11.5,
    descriptionEn: 'The balanced all-rounder! Responsive movement, crisp aerial control, and iconic style across Flower Kingdom.',
    descriptionAr: 'الشخصية المتوازنة ذات التحكم المتقن! توازن مثالي بين سرعة الجري وقوة القفز في ربوع مملكة الزهور.',
    difficultyEn: 'Standard',
    difficultyAr: 'قياسي',
  },
  {
    id: 'luigi',
    nameEn: 'Luigi',
    nameAr: 'لويجي',
    titleEn: 'The High-Jumping Brother',
    titleAr: 'الأخ صاحب القفزة المرتفعة والرفيق الوفي',
    color: '#00A651',
    secondaryColor: '#002688',
    avatarColor: 'bg-emerald-600',
    isInvulnerable: false,
    speed: 5.0,
    jumpForce: 12.3, // Higher jump
    descriptionEn: 'Leaps slightly higher with his signature flutter scuttle in mid-air. Perfect for reaching high platforms.',
    descriptionAr: 'يقفز لارتفاع أعلى قليلاً مع ركلة ساقية خفيفة في الهواء، ممتاز للوصول إلى المنصات المرتفعة.',
    difficultyEn: 'Standard',
    difficultyAr: 'قياسي',
  },
  {
    id: 'peach',
    nameEn: 'Princess Peach',
    nameAr: 'الأميرة بيتش',
    titleEn: 'The Royal Sovereign of Mushroom Kingdom',
    titleAr: 'أميرة مملكة الفطر ذات القفزة الانسيابية',
    color: '#F48FB1',
    secondaryColor: '#EC407A',
    avatarColor: 'bg-pink-400',
    isInvulnerable: false,
    hasParasolGlide: true,
    speed: 5.0,
    jumpForce: 11.2,
    descriptionEn: 'Can gently hover and glide through the air by holding the jump button, making tricky gap crossings easy.',
    descriptionAr: 'تستطيع التحليق والانزلاق الانسيابي في الهواء عند الاستمرار بالضغط على زر القفز لتجاوز الفجوات بسهولة.',
    difficultyEn: 'Standard',
    difficultyAr: 'قياسي',
  },
  {
    id: 'daisy',
    nameEn: 'Princess Daisy',
    nameAr: 'الأميرة ديزي',
    titleEn: 'The Energetic Sarasaland Princess',
    titleAr: 'أميرة ساراسالاند المفعمة بالطاقة والحيوية',
    color: '#F59E0B',
    secondaryColor: '#EA580C',
    avatarColor: 'bg-amber-500',
    isInvulnerable: false,
    hasDoubleJump: true,
    speed: 5.3,
    jumpForce: 11.2,
    descriptionEn: 'Energetic and spirited! Can perform a handy double-jump flutter recovery in tricky platform situations.',
    descriptionAr: 'شخصية حيوية ورشيقة، تتميز بقفزة ثانية تعويضية تمنحك مرونة إضافية أثناء التحليق بين العقبات.',
    difficultyEn: 'Standard',
    difficultyAr: 'قياسي',
  },
  {
    id: 'yoshi',
    nameEn: 'Yoshi (Green)',
    nameAr: 'يوشي (الأخضر)',
    titleEn: 'The Loyal Dinosaur Companion',
    titleAr: 'الديناصور الوفي الصديق للمبتدئين والعائلات',
    color: '#22C55E',
    secondaryColor: '#FFFFFF',
    avatarColor: 'bg-green-500',
    isInvulnerable: true, // Takes no enemy damage!
    hasFlutterJump: true,
    speed: 5.1,
    jumpForce: 12.0,
    descriptionEn: 'Takes NO damage from enemies! Has a famous flutter jump and tongue attack. Ideal for beginner and relaxed play.',
    descriptionAr: 'لا يتأثر بضربات الأعداء العاديين! يمتلك قفزة رفرفة شهيرة ولساناً يبتلع الأشياء، مصمم للعب الممتع والخالي من التوتر.',
    difficultyEn: 'Beginner',
    difficultyAr: 'للمبتدئين (سهل)',
  },
  {
    id: 'nabbit',
    nameEn: 'Nabbit',
    nameAr: 'نابيت',
    titleEn: 'The Mysterious Bag-Carrying Rascal',
    titleAr: 'اللص المقنع اللطيف غير القابل للتأذي',
    color: '#8B5CF6',
    secondaryColor: '#6D28D9',
    avatarColor: 'bg-purple-600',
    isInvulnerable: true, // Cannot take damage!
    speed: 5.5,
    jumpForce: 11.6,
    descriptionEn: 'Immune to all enemy attacks! Converts all collected power-up items into purple flower coins inside his magic sack.',
    descriptionAr: 'منيع تماماً ضد هجمات الأعداء! يحوّل أي عنصر قوة يلتقطه داخل حقيبته السحرية إلى عملات زهور بنفسجية إضافية.',
    difficultyEn: 'Beginner',
    difficultyAr: 'للمبتدئين (سهل)',
  },
  {
    id: 'blue_toad',
    nameEn: 'Blue Toad',
    nameAr: 'تود الأزرق',
    titleEn: 'The Speedy Retainer',
    titleAr: 'خادم القصر السريع والمخلص',
    color: '#3B82F6',
    secondaryColor: '#FFFFFF',
    avatarColor: 'bg-blue-600',
    isInvulnerable: false,
    speed: 5.4,
    jumpForce: 11.4,
    descriptionEn: 'Quick and nimble! Swift sprint acceleration makes Toad ideal for time attack enthusiasts.',
    descriptionAr: 'سريع ورشيق! انطلاق سريع وتسارع ممتاز يجعله المفضل لعشاق السرعة وتجاوز المراحل بأرقام قياسية.',
    difficultyEn: 'Standard',
    difficultyAr: 'قياسي',
  },
  {
    id: 'yellow_toad',
    nameEn: 'Yellow Toad',
    nameAr: 'تود الأصفر',
    titleEn: 'The Cheerful Explorer',
    titleAr: 'المستكشف المبهج المليء بالحماس',
    color: '#EAB308',
    secondaryColor: '#FFFFFF',
    avatarColor: 'bg-yellow-500',
    isInvulnerable: false,
    speed: 5.4,
    jumpForce: 11.4,
    descriptionEn: 'Always bright and smiling, tackling Flower Kingdom obstacles with swift dashes.',
    descriptionAr: 'مستكشف دائم الابتسامة يتميز بخفة الحركة وسرعة البديهة في استكشاف أسرار مملكة الزهور.',
    difficultyEn: 'Standard',
    difficultyAr: 'قياسي',
  },
];

export const POWER_UPS: PowerUpInfo[] = [
  {
    id: 'elephant',
    nameEn: 'Elephant Form',
    nameAr: 'قوة تحول الفيل',
    itemEn: 'Elephant Fruit',
    itemAr: 'فاكهة الفيل العجيبة',
    color: 'from-blue-500 to-indigo-600',
    icon: '🐘',
    summaryEn: 'Transforms Mario & friends into an adorable heavy elephant that crushes obstacles, swipes enemies with its trunk, and sprays water!',
    summaryAr: 'يحوّل ماريو وأصدقاءه إلى فيل لطيف وضخم قادر على سحق الكتل الصلبة، واستخدام خرطومه لضرب الأعداء ورش الماء!',
    keyAbilitiesEn: [
      'Trunk Attack: Swipe the trunk to defeat enemies and reflect projectiles',
      'Block Smashing: Break through solid brick and metal blocks with pure weight',
      'Water Reservoir: Suck water from fountains and spray it to reveal hidden vines and secret paths',
      'Dash Across 2-Tile Gaps: Extra momentum allows walking straight across small bottomless pits'
    ],
    keyAbilitiesAr: [
      'ضربة الخرطوم: التلويح بالخرطوم للإطاحة بالأعداء وعكس القذائف',
      'تحطيم الكتل: سحق الكتل الحجرية والعوائق بضخامة وزنه وقوته البدنية',
      'خزان المياه: امتصاص الماء ورشه لإحياء الزهور الذابلة وكشف مسارات سرية',
      'عبور الفجوات: الركض السريع فوق الفجوات الصغيرة المكونة من مربعين دون السقوط'
    ]
  },
  {
    id: 'bubble',
    nameEn: 'Bubble Form',
    nameAr: 'قوة الفقاعات',
    itemEn: 'Bubble Flower',
    itemAr: 'زهرة الفقاعات المتوهجة',
    color: 'from-pink-400 to-purple-500',
    icon: '🫧',
    summaryEn: 'Shoots bouncy magical bubbles that capture enemies even through walls, converting them into coins, and serve as temporary bouncy jump pads!',
    summaryAr: 'يطلق فقاعات سحرية براقة تحبس الأعداء حتى خلف الجدران وتحولهم إلى عملات، كما يمكن القفز فوقها كمنصات ارتداد مؤقتة!',
    keyAbilitiesEn: [
      'Wall-Piercing Bubbles: Bubbles float gently through walls to defeat hard-to-reach foes',
      'Coin Conversion: Enemies struck by bubbles instantly morph into shiny coins',
      'Stepping Stones: Jump on top of floating bubbles to reach impossible heights',
      'Long-Range Trapping: Homingly drifts toward nearby enemies in tight passages'
    ],
    keyAbilitiesAr: [
      'اختراق الجدران: تخترق الفقاعات العوائق لتطال الأعداء في الزوايا المستحيلة',
      'تحويل الأعداء إلى عملات: القضاء على الأعداء وتحويلهم فوراً إلى عملات ذهبية',
      'منصات قفز عائمة: القفز على الفقاعات في الهواء للوصول إلى أعلى الأماكن',
      'توجيه انسيابي: تنجذب الفقاعات بلطف نحو الأعداء القريبين'
    ]
  },
  {
    id: 'drill',
    nameEn: 'Drill Form',
    nameAr: 'قوة الحفر',
    itemEn: 'Drill Mushroom',
    itemAr: 'فطر الحفر الدوراني',
    color: 'from-amber-500 to-yellow-600',
    icon: '🌪️',
    summaryEn: 'Grants a spin-drill cap that burrows directly into ceilings or underground to avoid damage, crawl through narrow seams, and launch surprise attacks!',
    summaryAr: 'يمنح خوذة حفر لولبية تسمح بالغطس في باطن الأرض أو السقف للتنقل خفية، وتفادي الأعداء ومهاجمتهم من زوايا مباغتة!',
    keyAbilitiesEn: [
      'Underground Burrow: Dive into dirt floors to safely pass under dangerous obstacles',
      'Ceiling Crawl: Drill straight up into the ceiling to traverse inverted pathways',
      'Downward Ground Drill: Slam drill down to break tough crystals and spiked enemies',
      'Spike Protection: The drill helmet protects against falling falling spikes and spiked shells'
    ],
    keyAbilitiesAr: [
      'الحفر الأرضي: الغوص تحت الأرض والتنقل بسلاسة تحت أقدام الأعداء والعقبات',
      'التشبث بالأسقف: الحفر في سقف المرحلة والمشي مقلوباً لاستكشاف ممرات علوية سرية',
      'السقوط الحفري القاضي: الهبوط كالمثقاب لسحق الكريستالات والأعداء ذوي الأشواك',
      'درع واقٍ للرأس: الخوذة تحمي رأس اللاعب من الصخور والأشواك المتساقطة'
    ]
  },
  {
    id: 'fire',
    nameEn: 'Wonder Flower Effect',
    nameAr: 'تأثير زهرة العجائب (الوندر)',
    itemEn: 'Wonder Flower',
    itemAr: 'زهرة العجائب السحرية',
    color: 'from-cyan-400 to-purple-600',
    icon: '✨',
    summaryEn: 'The defining mechanic of the game! Touching a Wonder Flower warps reality: pipes crawl like inchworms, singing musicals erupt, gravity shifts, and skies morph!',
    summaryAr: 'الابتكار الثوري الأكبر في اللعبة! ملامسة زهرة العجائب تقلب الواقع رأساً على عقب: أنابيب تزحف كالديدان، حفلات غنائية، انعدام للجاذبية وسماء كونية مدهشة!',
    keyAbilitiesEn: [
      'Living Pipes: Static green pipes start slithering, stretching and dancing',
      'Perspective & Morph Shifts: Top-down views, giant spike balls, shadow silhouettes',
      'Wonder Seed Climax: Collecting the glowing Wonder Seed restores stage equilibrium',
      'Endless Variety: Every single stage offers a completely unique Wonder surprise'
    ],
    keyAbilitiesAr: [
      'الأنابيب الحية: تبدأ الأنابيب الخضراء بالحركة والزحف والتمدد الإيقاعي',
      'تغير المنظور والتحول: منظور علوي، تحول إلى كرة عملاقة، أو ظلال سينمائية',
      'بذور العجائب: جمع بذرة الوندر الذهبية عند نهاية التأثير لإعادة المرحلة إلى طبيعتها',
      'تنوع مذهل: كل مرحلة في اللعبة تقدم مفاجأة "وندر" فريدة لا تتكرر'
    ]
  }
];

export const BADGES: BadgeInfo[] = [
  {
    id: 'parachute_cap',
    type: 'action',
    nameEn: 'Parachute Cap',
    nameAr: 'مظلة القبعة',
    icon: '🪂',
    descriptionEn: 'Press R or shake in midair to open your hat as a parachute and glide slowly down.',
    descriptionAr: 'اضغط على زر R في الهواء لتحويل قبعتك إلى مظلة هبوط انسيابية تبطئ السقوط.',
    howToUseEn: 'Hold R while airborne to glide over long bottomless pits.',
    howToUseAr: 'استمر بالضغط على زر المظلة في الهواء لتجاوز الفجوات السحيقة بأمان.'
  },
  {
    id: 'wall_climb',
    type: 'action',
    nameEn: 'Wall-Climb Jump',
    nameAr: 'قفزة تسلق الجدران',
    icon: '🧗',
    descriptionEn: 'Jump against a wall and leap straight up to gain extra vertical height before wall kicking.',
    descriptionAr: 'القفز نحو الجدار مع دفعة عمودية إضافية تمنحك ارتفاعاً أكبر قبل الركلة الجدارية.',
    howToUseEn: 'Allows climbing steep sheer cliffs without bouncing back.',
    howToUseAr: 'تتيح صعود الجدران المرتفعة مباشرة دون ارتداد بعيد عن الحائط.'
  },
  {
    id: 'dolphin_kick',
    type: 'action',
    nameEn: 'Dolphin Kick',
    nameAr: 'ركلة الدلفين المائية',
    icon: '🐬',
    descriptionEn: 'Burst forward with incredible speed when swimming underwater and break submerged blocks.',
    descriptionAr: 'اندفاعة نفاثة وسريعة للغاية أثناء السباحة تحت الماء وقدرة على تحطيم الكتل المغمورة.',
    howToUseEn: 'Press R repeatedly underwater to swim like a dolphin.',
    howToUseAr: 'اضغط زر الحركة تحت الماء لتسريع السباحة وتجاوز التيارات الجارفة.'
  },
  {
    id: 'crouch_high_jump',
    type: 'action',
    nameEn: 'Crouching High Jump',
    nameAr: 'القفزة العالية من وضع القرفصاء',
    icon: '⏫',
    descriptionEn: 'Crouch to charge up energy, then release to launch into a super-high jump.',
    descriptionAr: 'انحنِ بوضع القرفصاء لشحن الطاقة، ثم اقفز لتنطلق لارتفاع هائل.',
    howToUseEn: 'Hold Down for 1s, then press Jump for +50% jump height.',
    howToUseAr: 'استمر بالانحناء لثانية ثم اقفز لقفزة أعلى بنسبة 50% من المعتاد.'
  },
  {
    id: 'coin_magnet',
    type: 'boost',
    nameEn: 'Coin Magnet',
    nameAr: 'مغناطيس العملات',
    icon: '🧲',
    descriptionEn: 'Naturally draws nearby standard coins and flower coins directly toward the character.',
    descriptionAr: 'يجذب العملات الذهبية وعملات الزهور القريبة تلقائياً نحو الشخصية.',
    howToUseEn: 'Equip passively to vacuum coins without risking precision jumps.',
    howToUseAr: 'يعمل تلقائياً لجمع الثروات دون الحاجة للمخاطرة بالقفز الدقيق نحو الحواف.'
  },
  {
    id: 'safety_bounce',
    type: 'boost',
    nameEn: 'Safety Bounce',
    nameAr: 'ارتداد الأمان',
    icon: '🛡️',
    descriptionEn: 'Recover instantly from falling into lava, poison, or bottomless pits one time per fall.',
    descriptionAr: 'ارتداد إنقاذ تلقائي عند السقوط في الحمم أو السم أو الفجوات العميقة مرة واحدة.',
    howToUseEn: 'Bounces the character back onto safe solid ground after a misstep.',
    howToUseAr: 'ينقذ اللاعب بإعادته بنقزة قوية للأعلى نحو المنصة الصلبة عند الزلل.'
  },
  {
    id: 'jet_run',
    type: 'expert',
    nameEn: 'Jet Run',
    nameAr: 'الجري النفاث الخارق',
    icon: '⚡',
    descriptionEn: 'Dash continuously at supersonic speed, capable of running over air for a brief moment!',
    descriptionAr: 'جري مستمر بسرعة جنونية لا تتوقف مع القدرة على الركض في الهواء للحظات وجيزة!',
    howToUseEn: 'For master platformers seeking high speed and adrenaline.',
    howToUseAr: 'مخصص للمحترفين الراغبين في تجربة السرعة القصوى والتحكم فائق الدقة.'
  },
  {
    id: 'invisibility',
    type: 'expert',
    nameEn: 'Invisibility',
    nameAr: 'شارة الاختفاء الكامل',
    icon: '👻',
    descriptionEn: 'Become invisible to both enemies and yourself! Enemies ignore you completely.',
    descriptionAr: 'تصبح غير مرئي بالكامل للأعداء ولنفسك أيضاً! يتجاهلك الأعداء تماماً وعليك تتبع خطاك بذكاء.',
    howToUseEn: 'Ultimate challenge: navigate through levels by feeling your momentum.',
    howToUseAr: 'تحدٍ أسطوري لاختبار مهارتك في حفظ أبعاد المرحلة ومسارات القفز.'
  }
];

export const TECHNICAL_SPECS = {
  platform: 'Nintendo Switch',
  genreEn: '2D Platformer Adventure',
  genreAr: 'مغامرات ومنصات ثنائية الأبعاد (2D Platformer)',
  releaseDate: 'October 20, 2023',
  releaseDateAr: '20 أكتوبر 2023',
  fileSize: '3.7 GB',
  players: '1 - 4 Players (Local Co-op & Online Shadows)',
  playersAr: '1 إلى 4 لاعبين (لعب تعاوني محلي وظلال اللاعبين عبر الإنترنت)',
  modes: 'TV mode, Tabletop mode, Handheld mode',
  modesAr: 'وضع التلفزيون، وضع سطح الطاولة، وضع المحمول',
  developer: 'Nintendo EPD',
  publisher: 'Nintendo',
  esrb: 'Everyone (E)',
  esrbAr: 'مناسبة للجميع (E)',
  arabicSupportEn: 'Not officially localized into Arabic in-game',
  arabicSupportAr: 'غير معربة رسمياً داخل اللعبة، ولكن مجتمع اللاعبين العرب يعشقها',
};

export const COMPARISON_DATA = {
  titleEn: 'Super Mario Bros. Wonder vs Super Mario RPG (2023)',
  titleAr: 'مقارنة شاملة: سوبر ماريو برذرز وندر ضد سوبر ماريو آربيجي 2023',
  summaryEn: 'Both stellar Mario games arrived on Nintendo Switch in late 2023, but they deliver completely different genres and experiences!',
  summaryAr: 'كلتا اللعبتين الرائعتين صدرتا على جهاز نينتندو سويتش في أواخر عام 2023، لكنهما تنتميان إلى تصنيفين مختلفين تماماً من حيث أسلوب اللعب والقصة!',
  aspects: [
    {
      categoryEn: 'Game Genre',
      categoryAr: 'نوع اللعبة وتصنيفها',
      wonder: {
        en: '2D Side-Scrolling Platformer (Running, jumping, agility)',
        ar: 'منصات ثنائية الأبعاد حركية وسريعة (قفز، جري، تفادي عوائق)',
        badge: 'Platformer'
      },
      rpg: {
        en: 'Turn-Based Role Playing Game (Turn-based tactical combat)',
        ar: 'لعبة تقمص أدوار وتعاقب أدوار تكتيكية (RPG أدوار وهجمات استراتيجية)',
        badge: 'Turn-Based RPG'
      }
    },
    {
      categoryEn: 'Release Date',
      categoryAr: 'تاريخ الإصدار',
      wonder: {
        en: 'October 20, 2023',
        ar: '20 أكتوبر 2023',
        badge: 'Oct 2023'
      },
      rpg: {
        en: 'November 17, 2023',
        ar: '17 نوفمبر 2023',
        badge: 'Nov 2023'
      }
    },
    {
      categoryEn: 'World & Setting',
      categoryAr: 'العالم ومسرح الأحداث',
      wonder: {
        en: 'Flower Kingdom (مملكة الزهور) ruled by Prince Florian',
        ar: 'مملكة الزهور (عالم جديد كلياً يحكمه الأمير فلوريان)',
        badge: 'Flower Kingdom'
      },
      rpg: {
        en: 'Mushroom Kingdom & Star Road invasion by Smithy Gang',
        ar: 'مملكة الفطر وطريق النجوم بعد هجوم عصابة سميثي الميكانيكية',
        badge: 'Star Road'
      }
    },
    {
      categoryEn: 'Antagonist & Conflict',
      categoryAr: 'الشرير الرئيسي والصراع',
      wonder: {
        en: 'Bowser fuses with Prince Florian\'s castle to become "Castle Bowser"',
        ar: 'باوزر يسرق زهرة العجائب ويندمج مع قصر المملكة متحولاً إلى قلعة طائرة مدمرة',
        badge: 'Castle Bowser'
      },
      rpg: {
        en: 'Smithy (Bowser is actually a temporary ally in your party!)',
        ar: 'الحداد الشرير سميثي (المفاجأة: باوزر يصبح حليفاً قابلاً للعب في فريقك!)',
        badge: 'Smithy / Exor'
      }
    },
    {
      categoryEn: 'Playable Characters',
      categoryAr: 'الشخصيات القابلة للعب',
      wonder: {
        en: '12 characters (Mario, Luigi, Peach, Daisy, Toads, Yoshis, Nabbit)',
        ar: '12 شخصية (ماريو، لويجي، بيتش، ديزي، تود، يوشي بعدة ألوان، نابيت)',
        badge: '12 Characters'
      },
      rpg: {
        en: '5 Party Members (Mario, Mallow, Geno, Bowser, Princess Peach)',
        ar: 'فريق مكون من 5 أبطال (ماريو، مالو، جينو الأسطوري، باوزر، وبيتش)',
        badge: '5 Party RPG'
      }
    },
    {
      categoryEn: 'Key Innovation / Feature',
      categoryAr: 'الميزة الثورية الأساسية',
      wonder: {
        en: 'Wonder Flower morphs stages; Elephant, Bubble, Drill powers; Badges system',
        ar: 'زهرة العجائب التي تحول المراحل، قوى الفيل والفقاعات والمثقاب، وشارات المهارة',
        badge: 'Wonder Effects'
      },
      rpg: {
        en: 'Action Command timed hits, 3-person Triple Moves, faithful modern 3D remake of 1996 classic',
        ar: 'توقيت الضربات الإيقاعية (Action Commands)، الحركات الثلاثية، وإعادة بناء ثلاثية الأبعاد كاملة',
        badge: 'Timed Action RPG'
      }
    },
    {
      categoryEn: 'Multiplayer Experience',
      categoryAr: 'طور اللعب الجماعي',
      wonder: {
        en: 'Up to 4 players simultaneously local co-op + online live player ghosts & standees',
        ar: 'حتى 4 لاعبين معاً على نفس الشاشة + ميزة شبح وظلال اللاعبين الحقيقيين عبر الإنترنت',
        badge: '1-4 Players Co-op'
      },
      rpg: {
        en: 'Single-Player narrative adventure only',
        ar: 'مغامرة فردية تركز على القصة والعمق الاستراتيجي',
        badge: 'Solo Story'
      }
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionEn: 'What type of gaming experience are you looking for right now?',
    questionAr: 'ما نوع تجربة اللعب التي تفضل خوضها الآن؟',
    options: [
      {
        textEn: 'Fast-paced running, jumping, and dynamic surprise stage changes!',
        textAr: 'جري سريع، قفز بين المنصات، ومفاجآت متغيرة تقلب شكل المرحلة!',
        points: { wonder: 3, rpg: 0 }
      },
      {
        textEn: 'A deep story with turn-based strategy, leveling up, and funny party dialogue.',
        textAr: 'قصة ممتعة وحوارات ذكية مع معارك تكتيكية بالدور وتطوير لمستويات الشخصيات.',
        points: { wonder: 0, rpg: 3 }
      }
    ]
  },
  {
    id: 2,
    questionEn: 'Who will you be playing with?',
    questionAr: 'مع مَن تخطط للعب في أغلب الأوقات؟',
    options: [
      {
        textEn: 'Friends or family on the couch together (or online shadows).',
        textAr: 'مع العائلة أو الأصدقاء محلياً على نفس الجهاز للمرح والضحك الجماعي.',
        points: { wonder: 3, rpg: 0 }
      },
      {
        textEn: 'Solo, relaxing with a narrative adventure and mastering battle timing.',
        textAr: 'بمفردي، مسترخياً للاستمتاع برحلة قصصية رائعة وإتقان توقيت الضربات.',
        points: { wonder: 0, rpg: 3 }
      }
    ]
  },
  {
    id: 3,
    questionEn: 'Which unique character feature excites you most?',
    questionAr: 'أي ميزة شخصيات تثير حماسك أكثر؟',
    options: [
      {
        textEn: 'Transforming into a giant Elephant Mario with a powerful trunk or playing as Yoshi/Nabbit!',
        textAr: 'التحول إلى فيل ضخم لطيف بخرطوم ماء قوي، أو اللعب بيوشي ونابيت!',
        points: { wonder: 3, rpg: 0 }
      },
      {
        textEn: 'Recruiting Geno and having Bowser join your team as an ally!',
        textAr: 'انضمام المحارب جينو لفريقك وتحالف باوزر معك كبطل مقاتل!',
        points: { wonder: 0, rpg: 3 }
      }
    ]
  },
  {
    id: 4,
    questionEn: 'What visual art style appeals to you?',
    questionAr: 'أي أسلوب بصري يروق لذوقك الفني أكثر؟',
    options: [
      {
        textEn: 'Vibrant modern 2D cartoon physics with squash-and-stretch animations and singing flowers.',
        textAr: 'عالم كرتوني مفعم بالحياة والإيقاع والأزهار المتحدثة والحركات التعبيرية المرنة.',
        points: { wonder: 3, rpg: 0 }
      },
      {
        textEn: 'Charming isometric diorama-like 3D remake honoring retro 90s nostalgia.',
        textAr: 'عالم ثلاثي الأبعاد مصغر ومجسم بأسلوب الديوراما يحيي ذكريات كلاسيكيات التسعينات.',
        points: { wonder: 0, rpg: 3 }
      }
    ]
  }
];
