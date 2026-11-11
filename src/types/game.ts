export type CharacterId =
  | 'mario'
  | 'luigi'
  | 'peach'
  | 'daisy'
  | 'yoshi'
  | 'red_yoshi'
  | 'yellow_yoshi'
  | 'light_blue_yoshi'
  | 'blue_toad'
  | 'yellow_toad'
  | 'toadette'
  | 'nabbit';

export type PowerUpId = 'normal' | 'super' | 'elephant' | 'bubble' | 'drill' | 'fire';

export type BadgeType = 'action' | 'boost' | 'expert';

export interface CharacterInfo {
  id: CharacterId;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  color: string;
  secondaryColor: string;
  avatarColor: string;
  isInvulnerable: boolean; // Yoshi & Nabbit take no enemy damage
  hasFlutterJump?: boolean;
  hasParasolGlide?: boolean;
  hasDoubleJump?: boolean;
  speed: number;
  jumpForce: number;
  descriptionEn: string;
  descriptionAr: string;
  difficultyEn: 'Beginner' | 'Standard' | 'Advanced';
  difficultyAr: 'للمبتدئين (سهل)' | 'قياسي' | 'متقدم';
}

export interface PowerUpInfo {
  id: PowerUpId;
  nameEn: string;
  nameAr: string;
  itemEn: string;
  itemAr: string;
  color: string;
  icon: string;
  summaryEn: string;
  summaryAr: string;
  keyAbilitiesEn: string[];
  keyAbilitiesAr: string[];
}

export interface BadgeInfo {
  id: string;
  type: BadgeType;
  nameEn: string;
  nameAr: string;
  icon: string;
  descriptionEn: string;
  descriptionAr: string;
  howToUseEn: string;
  howToUseAr: string;
}

export interface GameEntity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  type: 'goomba' | 'koopa' | 'coin' | 'wonder_flower' | 'wonder_seed' | 'flower_coin' | 'block' | 'pipe' | 'bubble_projectile';
  isGrounded?: boolean;
  isAlive?: boolean;
  direction?: number;
  blockType?: 'question' | 'brick' | 'solid';
  hasContent?: boolean;
  content?: PowerUpId | 'coin' | 'wonder_flower';
  isHit?: boolean;
  hitOffset?: number;
  bubbleDuration?: number;
  trappedEnemy?: string;
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionAr: string;
  options: {
    textEn: string;
    textAr: string;
    points: { wonder: number; rpg: number };
  }[];
}
