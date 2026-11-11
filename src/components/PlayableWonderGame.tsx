import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CharacterId, PowerUpId } from '../types/game';
import { CHARACTERS } from '../data/wonderData';
import { ALL_67_STAGES, StageDefinition } from '../data/stagesData';
import { sound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
  Layers
} from 'lucide-react';

interface PlayableWonderGameProps {
  initialCharacter?: CharacterId;
  currentStageId?: number;
  onStageChange?: (stageId: number) => void;
  onWonderSeedCollected?: (totalSeeds: number) => void;
  onOpenStageDrawer?: () => void;
}

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
}

export const PlayableWonderGame: React.FC<PlayableWonderGameProps> = ({
  initialCharacter = 'mario',
  currentStageId = 1,
  onStageChange,
  onWonderSeedCollected,
  onOpenStageDrawer,
}) => {
  const { isAr } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active Stage Object
  const currentStage: StageDefinition =
    ALL_67_STAGES.find((s) => s.id === currentStageId) || ALL_67_STAGES[0];

  // Game UI States
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>(initialCharacter);
  const [powerUp, setPowerUp] = useState<PowerUpId>('normal');
  const [coins, setCoins] = useState(0);
  const [flowerCoins, setFlowerCoins] = useState(0);
  const [wonderSeeds, setWonderSeeds] = useState(0);
  const [isWonderActive, setIsWonderActive] = useState(false);
  const [wonderTimer, setWonderTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [talkingFlowerMessage, setTalkingFlowerMessage] = useState<string>(
    isAr ? currentStage.flowerTipAr : currentStage.flowerTipEn
  );
  const [hasWon, setHasWon] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('wonder_cleared_stages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Player physics state inside ref for 60fps loop
  const pRef = useRef({
    x: 80,
    y: 280,
    vx: 0,
    vy: 0,
    width: 32,
    height: 48,
    isGrounded: false,
    facingRight: true,
    isGliding: false,
    canDoubleJump: true,
    isDrilling: false,
    isBurrowed: false,
    trunkSwipeTimer: 0,
    isGiant: false,
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const wonderActiveRef = useRef(false);
  const powerUpRef = useRef<PowerUpId>('normal');
  const charIdRef = useRef<CharacterId>(initialCharacter);
  const stageRef = useRef<StageDefinition>(currentStage);
  const bubblesRef = useRef<Bubble[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  // Keep refs in sync
  useEffect(() => {
    stageRef.current = currentStage;
    setTalkingFlowerMessage(isAr ? currentStage.flowerTipAr : currentStage.flowerTipEn);
  }, [currentStage, isAr]);

  useEffect(() => {
    wonderActiveRef.current = isWonderActive;
  }, [isWonderActive]);

  useEffect(() => {
    powerUpRef.current = powerUp;
  }, [powerUp]);

  useEffect(() => {
    charIdRef.current = selectedCharId;
    if (powerUp === 'elephant') {
      pRef.current.width = 46;
      pRef.current.height = 56;
    } else if (powerUp !== 'normal') {
      pRef.current.width = 34;
      pRef.current.height = 50;
    } else {
      pRef.current.width = 30;
      pRef.current.height = 40;
    }
  }, [selectedCharId, powerUp]);

  interface Block {
    x: number;
    y: number;
    w: number;
    h: number;
    type: 'ground' | 'brick' | 'question' | 'pipe';
    hasItem?: boolean;
    itemType?: 'coin' | 'elephant' | 'bubble' | 'drill' | 'wonder_flower';
    isHit?: boolean;
    hitBounce?: number;
    pipeHeight?: number;
  }

  interface Enemy {
    x: number;
    y: number;
    w: number;
    h: number;
    vx: number;
    isAlive: boolean;
    type: 'goomba' | 'koopa';
  }

  interface CoinItem {
    x: number;
    y: number;
    isCollected: boolean;
    isWonderCoin?: boolean;
  }

  const levelBlocksRef = useRef<Block[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const coinsRef = useRef<CoinItem[]>([]);
  const wonderSeedObjRef = useRef<{ x: number; y: number; isCollected: boolean } | null>(null);
  const flagpoleRef = useRef<{ x: number; y: number; reached: boolean }>({ x: 2500, y: 140, reached: false });

  // Procedural Level Builder per Stage
  const initLevel = useCallback(() => {
    const stage = stageRef.current;
    pRef.current.x = 80;
    pRef.current.y = 280;
    pRef.current.vx = 0;
    pRef.current.vy = 0;
    pRef.current.isGrounded = false;
    pRef.current.isBurrowed = false;
    pRef.current.trunkSwipeTimer = 0;
    pRef.current.isGiant = false;

    setIsWonderActive(false);
    wonderActiveRef.current = false;
    setWonderTimer(0);
    setHasWon(false);
    bubblesRef.current = [];
    particlesRef.current = [];

    // Blocks setup dynamically seeded by stage.id
    const seed = stage.id;
    const blocks: Block[] = [
      // Ground segments with gaps according to difficulty
      { x: 0, y: 380, w: 750 + (seed % 3) * 60, h: 120, type: 'ground' },
      { x: 840 + (seed % 4) * 30, y: 380, w: 700 + (seed % 2) * 80, h: 120, type: 'ground' },
      { x: 1680 + (seed % 3) * 40, y: 380, w: 900, h: 120, type: 'ground' },

      // Mystery Blocks
      { x: 240, y: 260, w: 36, h: 36, type: 'question', hasItem: true, itemType: 'coin' },
      { x: 276, y: 260, w: 36, h: 36, type: 'brick' },
      {
        x: 312,
        y: 260,
        w: 36,
        h: 36,
        type: 'question',
        hasItem: true,
        itemType: seed % 3 === 0 ? 'drill' : seed % 3 === 1 ? 'elephant' : 'bubble',
      },
      { x: 348, y: 260, w: 36, h: 36, type: 'brick' },
      { x: 384, y: 260, w: 36, h: 36, type: 'question', hasItem: true, itemType: 'coin' },

      // Floating Mid Platforms
      { x: 520, y: 220 - (seed % 3) * 15, w: 108, h: 28, type: 'brick' },
      { x: 670, y: 170 - (seed % 2) * 20, w: 108, h: 28, type: 'brick' },
      {
        x: 706,
        y: 90,
        w: 36,
        h: 36,
        type: 'question',
        hasItem: true,
        itemType: seed % 2 === 0 ? 'bubble' : 'elephant',
      },

      // The Wonder Flower block
      { x: 860, y: 240, w: 40, h: 40, type: 'question', hasItem: true, itemType: 'wonder_flower' },

      // Pipes
      { x: 440, y: 310, w: 54, h: 70, type: 'pipe', pipeHeight: 70 },
      { x: 780, y: 280, w: 56, h: 100, type: 'pipe', pipeHeight: 100 },
      { x: 1240, y: 300, w: 54, h: 80, type: 'pipe', pipeHeight: 80 },
      { x: 1540, y: 260, w: 58, h: 120, type: 'pipe', pipeHeight: 120 },
      { x: 2020, y: 310, w: 54, h: 70, type: 'pipe', pipeHeight: 70 },

      // Second sector blocks
      { x: 1100, y: 240, w: 36, h: 36, type: 'question', hasItem: true, itemType: 'drill' },
      { x: 1136, y: 240, w: 36, h: 36, type: 'brick' },
      { x: 1172, y: 240, w: 36, h: 36, type: 'question', hasItem: true, itemType: 'coin' },

      // Stairs leading to flagpole
      { x: 2220, y: 344, w: 36, h: 36, type: 'brick' },
      { x: 2256, y: 308, w: 36, h: 72, type: 'brick' },
      { x: 2292, y: 272, w: 36, h: 108, type: 'brick' },
      { x: 2328, y: 236, w: 36, h: 144, type: 'brick' },
    ];

    // Enemies (number scales with stage difficulty)
    const enemyCount = 3 + stage.difficulty * 2;
    const enemies: Enemy[] = [];
    for (let i = 0; i < enemyCount; i++) {
      const eX = 350 + i * 220 + (seed * 17) % 80;
      enemies.push({
        x: eX,
        y: 348,
        w: 32,
        h: 32,
        vx: (i % 2 === 0 ? -1 : 1) * (1.1 + stage.difficulty * 0.15),
        isAlive: true,
        type: i % 3 === 0 ? 'koopa' : 'goomba',
      });
    }

    // Coins
    const coinsArr: CoinItem[] = [];
    for (let c = 0; c < 14; c++) {
      coinsArr.push({
        x: 220 + c * 130 + (seed * 11) % 60,
        y: 160 + (c % 3) * 40,
        isCollected: false,
        isWonderCoin: c % 4 === 0,
      });
    }

    levelBlocksRef.current = blocks;
    enemiesRef.current = enemies;
    coinsRef.current = coinsArr;
    flagpoleRef.current = { x: 2460, y: 140, reached: false };
    wonderSeedObjRef.current = null;
  }, []);

  useEffect(() => {
    initLevel();
  }, [initLevel, currentStageId]);

  // Activate Wonder Effect
  const triggerWonderFlower = useCallback(() => {
    const stage = stageRef.current;
    setIsWonderActive(true);
    wonderActiveRef.current = true;
    setWonderTimer(25);
    sound.playWonderEffect();

    if (stage.wonderEffect === 'giant_mode') {
      pRef.current.isGiant = true;
      pRef.current.width = 54;
      pRef.current.height = 70;
    }

    setTalkingFlowerMessage(
      isAr
        ? `تأثير العجائب نشط: ${stage.wonderNameAr}!`
        : `WONDER ACTIVE: ${stage.wonderNameEn}!`
    );

    // Wonder Seed appears along the course
    wonderSeedObjRef.current = { x: 1720, y: 180, isCollected: false };

    // Burst wonder confetti
    for (let i = 0; i < 45; i++) {
      particlesRef.current.push({
        x: pRef.current.x,
        y: pRef.current.y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 3,
        color: ['#A855F7', '#06B6D4', '#F43F5E', '#FBBF24', '#10B981'][Math.floor(Math.random() * 5)],
        size: Math.random() * 6 + 3,
        alpha: 1,
        life: 60,
      });
    }
  }, [isAr]);

  // Attack action
  const performAction = useCallback(() => {
    const curPower = powerUpRef.current;
    if (curPower === 'elephant') {
      pRef.current.trunkSwipeTimer = 18;
      sound.playElephantTrunk();
      const reachX = pRef.current.facingRight ? pRef.current.x + pRef.current.width + 10 : pRef.current.x - 30;
      levelBlocksRef.current.forEach((b) => {
        if (b.type === 'brick' && Math.abs(b.x - reachX) < 35 && Math.abs(b.y - pRef.current.y) < 40) {
          b.isHit = true;
          for (let k = 0; k < 6; k++) {
            particlesRef.current.push({
              x: b.x + 16,
              y: b.y + 16,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6 - 4,
              color: '#B45309',
              size: 5,
              alpha: 1,
              life: 35,
            });
          }
          sound.playStomp();
        }
      });
      enemiesRef.current.forEach((e) => {
        if (e.isAlive && Math.abs(e.x - reachX) < 45 && Math.abs(e.y - pRef.current.y) < 45) {
          e.isAlive = false;
          sound.playStomp();
        }
      });
    } else if (curPower === 'bubble') {
      sound.playBubble();
      const dir = pRef.current.facingRight ? 1 : -1;
      bubblesRef.current.push({
        x: pRef.current.facingRight ? pRef.current.x + pRef.current.width + 4 : pRef.current.x - 12,
        y: pRef.current.y + 12,
        vx: dir * 4.8,
        vy: -0.4,
        radius: 14,
        life: 180,
      });
    } else if (curPower === 'drill') {
      if (pRef.current.isGrounded) {
        pRef.current.isBurrowed = !pRef.current.isBurrowed;
        sound.playStomp();
      }
    }
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        const char = CHARACTERS.find((c) => c.id === charIdRef.current);
        const stage = stageRef.current;
        let jumpPower = char ? char.jumpForce : 11.5;

        // Wonder low gravity boost
        if (wonderActiveRef.current && stage.wonderEffect === 'low_gravity') {
          jumpPower *= 1.35;
        }

        if (pRef.current.isGrounded) {
          pRef.current.vy = -jumpPower;
          pRef.current.isGrounded = false;
          pRef.current.canDoubleJump = true;
          sound.playJump(
            charIdRef.current === 'luigi' ? 'luigi' : charIdRef.current === 'peach' ? 'peach' : 'mario'
          );
        } else if (char?.hasDoubleJump && pRef.current.canDoubleJump) {
          pRef.current.vy = -jumpPower * 0.9;
          pRef.current.canDoubleJump = false;
          sound.playJump('peach');
        } else if (char?.hasFlutterJump && pRef.current.vy > -1) {
          pRef.current.vy = -jumpPower * 0.75;
          sound.playJump('yoshi');
        }
      }

      if (e.code === 'KeyF' || e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyJ') {
        performAction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [performAction]);

  // Main 60 FPS Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let cameraX = 0;
    let stepCount = 0;

    const gameLoop = () => {
      stepCount++;
      const p = pRef.current;
      const keys = keysRef.current;
      const char = CHARACTERS.find((c) => c.id === charIdRef.current) || CHARACTERS[0];
      const stage = stageRef.current;

      // Wonder Timer
      if (wonderActiveRef.current && stepCount % 60 === 0) {
        setWonderTimer((prev) => {
          if (prev <= 1) {
            wonderActiveRef.current = false;
            setIsWonderActive(false);
            if (p.isGiant) {
              p.isGiant = false;
              p.width = 32;
              p.height = 48;
            }
            return 0;
          }
          return prev - 1;
        });
      }

      // Movement
      let moveSpeed = (keys['ArrowRight'] || keys['KeyD']) ? char.speed : (keys['ArrowLeft'] || keys['KeyA']) ? -char.speed : 0;
      if (wonderActiveRef.current && stage.wonderEffect === 'speed_rush') {
        moveSpeed *= 1.6;
      }

      if (moveSpeed > 0) {
        p.vx = moveSpeed;
        p.facingRight = true;
      } else if (moveSpeed < 0) {
        p.vx = moveSpeed;
        p.facingRight = false;
      } else {
        p.vx *= 0.75;
      }

      // Peach Glide
      if (char.hasParasolGlide && !p.isGrounded && (keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && p.vy > 0) {
        p.vy = Math.min(p.vy, 1.8);
        p.isGliding = true;
      } else {
        p.isGliding = false;
      }

      // Gravity
      let gravity = p.isBurrowed ? 0 : 0.65;
      if (wonderActiveRef.current && stage.wonderEffect === 'low_gravity') {
        gravity = 0.32;
      }
      p.vy += gravity;

      p.x += p.vx;
      p.y += p.vy;

      if (p.trunkSwipeTimer > 0) p.trunkSwipeTimer--;

      if (p.x < 10) p.x = 10;
      if (p.y > 600) {
        p.x = Math.max(80, p.x - 300);
        p.y = 200;
        p.vy = 0;
        p.vx = 0;
      }

      // Block Collisions
      p.isGrounded = false;
      const blocks = levelBlocksRef.current;

      blocks.forEach((b) => {
        let effectiveY = b.y;
        let effectiveH = b.h;
        if (b.type === 'pipe' && wonderActiveRef.current && stage.wonderEffect === 'worm_pipes') {
          const bend = Math.sin(stepCount * 0.08 + b.x * 0.02) * 25;
          effectiveY = b.y + bend;
        }

        if (
          p.x + p.width > b.x &&
          p.x < b.x + b.w &&
          p.y + p.height > effectiveY &&
          p.y < effectiveY + effectiveH
        ) {
          if (p.vy > 0 && p.y + p.height - p.vy <= effectiveY + 14) {
            p.y = effectiveY - p.height;
            p.vy = 0;
            p.isGrounded = true;
          } else if (p.vy < 0 && p.y - p.vy >= effectiveY + effectiveH - 14) {
            p.y = effectiveY + effectiveH;
            p.vy = 0;

            if (b.type === 'question' && b.hasItem) {
              b.hasItem = false;
              b.isHit = true;
              b.hitBounce = 8;
              if (b.itemType === 'wonder_flower') {
                triggerWonderFlower();
              } else if (b.itemType === 'elephant') {
                setPowerUp('elephant');
                sound.playPowerUp();
              } else if (b.itemType === 'bubble') {
                setPowerUp('bubble');
                sound.playPowerUp();
              } else if (b.itemType === 'drill') {
                setPowerUp('drill');
                sound.playPowerUp();
              } else {
                setCoins((c) => c + 1);
                sound.playCoin();
              }
            } else if (b.type === 'brick') {
              if (powerUpRef.current === 'elephant' || p.isGiant) {
                b.isHit = true;
                sound.playStomp();
              } else {
                b.hitBounce = 6;
                sound.playStomp();
              }
            }
          } else if (p.vx > 0) {
            p.x = b.x - p.width;
          } else if (p.vx < 0) {
            p.x = b.x + b.w;
          }
        }
      });

      // Bubbles
      bubblesRef.current = bubblesRef.current.filter((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.life--;

        if (
          p.vy > 0 &&
          p.x + p.width > b.x - b.radius &&
          p.x < b.x + b.radius &&
          p.y + p.height >= b.y - b.radius &&
          p.y + p.height <= b.y + b.radius
        ) {
          p.vy = -12;
          sound.playJump('peach');
          return false;
        }

        enemiesRef.current.forEach((en) => {
          if (en.isAlive && Math.hypot(b.x - (en.x + en.w / 2), b.y - (en.y + en.h / 2)) < b.radius + 16) {
            en.isAlive = false;
            setCoins((c) => c + 2);
            sound.playCoin();
          }
        });

        return b.life > 0 && b.x > 0 && b.x < 3000;
      });

      // Enemies
      enemiesRef.current.forEach((en) => {
        if (!en.isAlive) return;
        en.x += en.vx;

        if (en.x < 100 || en.x > 2400) en.vx *= -1;

        if (
          p.x + p.width > en.x &&
          p.x < en.x + en.w &&
          p.y + p.height > en.y &&
          p.y < en.y + en.h
        ) {
          if (p.isGiant) {
            en.isAlive = false;
            sound.playStomp();
            setCoins((c) => c + 2);
          } else if (p.vy > 0 && p.y + p.height - p.vy <= en.y + 12) {
            en.isAlive = false;
            p.vy = -10;
            sound.playStomp();
            setCoins((c) => c + 1);
          } else {
            if (!char.isInvulnerable) {
              if (powerUpRef.current !== 'normal') {
                setPowerUp('normal');
                sound.playStomp();
                p.vy = -6;
                p.x -= p.facingRight ? 40 : -40;
              } else {
                p.x -= p.facingRight ? 35 : -35;
                p.vy = -5;
                sound.playStomp();
              }
            } else {
              sound.playJump('yoshi');
              p.vx *= -1;
            }
          }
        }
      });

      // Coins
      coinsRef.current.forEach((coin) => {
        if (!coin.isCollected && Math.hypot(p.x + p.width / 2 - coin.x, p.y + p.height / 2 - coin.y) < 28) {
          coin.isCollected = true;
          if (coin.isWonderCoin) {
            setFlowerCoins((fc) => fc + 10);
            sound.playPowerUp();
          } else {
            setCoins((c) => c + 1);
            sound.playCoin();
          }
        }
      });

      // Wonder Seed
      const ws = wonderSeedObjRef.current;
      if (ws && !ws.isCollected && Math.hypot(p.x + p.width / 2 - ws.x, p.y + p.height / 2 - ws.y) < 42) {
        ws.isCollected = true;
        setWonderSeeds((s) => {
          const total = s + 1;
          if (onWonderSeedCollected) onWonderSeedCollected(total);
          return total;
        });
        sound.playWonderSeed();
        setFlowerCoins((fc) => fc + 10);
        setIsWonderActive(false);
        wonderActiveRef.current = false;
      }

      // Flagpole
      const fp = flagpoleRef.current;
      if (!fp.reached && p.x > fp.x - 20) {
        fp.reached = true;
        setHasWon(true);
        sound.playWonderSeed();

        // Save stage progress
        setCompletedStages((prev) => {
          if (!prev.includes(stage.id)) {
            const nextList = [...prev, stage.id];
            try {
              localStorage.setItem('wonder_cleared_stages', JSON.stringify(nextList));
            } catch {
              // ignore
            }
            return nextList;
          }
          return prev;
        });
      }

      // Camera
      const targetCamX = Math.max(0, p.x - 300);
      cameraX += (targetCamX - cameraX) * 0.1;

      // Particles
      particlesRef.current = particlesRef.current.filter((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.15;
        pt.alpha -= 0.02;
        pt.life--;
        return pt.life > 0 && pt.alpha > 0;
      });

      // RENDER CANVAS
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(-cameraX, 0);

      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (wonderActiveRef.current) {
        skyGrad.addColorStop(0, stage.palette.wonderSky);
        skyGrad.addColorStop(1, '#020617');
      } else {
        skyGrad.addColorStop(0, stage.palette.skyTop);
        skyGrad.addColorStop(1, stage.palette.skyBottom);
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(cameraX, 0, canvas.width, canvas.height);

      // Parallax Hills / Mountains
      const hillOffset = cameraX * 0.3;
      ctx.fillStyle = wonderActiveRef.current ? '#1E1B4B' : stage.palette.groundDirt;
      for (let h = -2; h < 10; h++) {
        const hx = h * 380 - (hillOffset % 380) + cameraX;
        ctx.beginPath();
        ctx.arc(hx, 410, 220, Math.PI, 0, false);
        ctx.fill();
      }

      // Blocks
      blocks.forEach((b) => {
        let bY = b.y;
        if (b.hitBounce) {
          bY -= b.hitBounce;
          b.hitBounce *= 0.7;
          if (b.hitBounce < 0.2) b.hitBounce = 0;
        }

        if (b.type === 'pipe') {
          let pipeY = bY;
          if (wonderActiveRef.current && stage.wonderEffect === 'worm_pipes') {
            pipeY += Math.sin(stepCount * 0.08 + b.x * 0.02) * 25;
          }

          ctx.fillStyle = wonderActiveRef.current ? '#C084FC' : stage.palette.pipeColor;
          ctx.fillRect(b.x - 3, pipeY, b.w + 6, 20);
          ctx.fillRect(b.x, pipeY + 20, b.w, (b.pipeHeight || 80) - 20);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.fillRect(b.x + 4, pipeY, 6, b.pipeHeight || 80);
        } else if (b.type === 'question') {
          if (b.isHit) {
            ctx.fillStyle = '#64748B';
            ctx.fillRect(b.x, bY, b.w, b.h);
          } else {
            ctx.fillStyle = b.itemType === 'wonder_flower' ? '#C084FC' : '#FBBF24';
            ctx.fillRect(b.x, bY, b.w, b.h);
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 20px "Fredoka", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(b.itemType === 'wonder_flower' ? '✿' : '?', b.x + b.w / 2, bY + b.h / 2);
          }
        } else if (b.type === 'brick') {
          if (!b.isHit) {
            ctx.fillStyle = stage.theme === 'magma' ? '#7F1D1D' : stage.theme === 'desert' ? '#D97706' : '#B45309';
            ctx.fillRect(b.x, bY, b.w, b.h);
          }
        } else if (b.type === 'ground') {
          ctx.fillStyle = wonderActiveRef.current ? '#7C3AED' : stage.palette.groundGrass;
          ctx.fillRect(b.x, bY, b.w, 18);
          ctx.fillStyle = wonderActiveRef.current ? '#312E81' : stage.palette.groundDirt;
          ctx.fillRect(b.x, bY + 18, b.w, b.h - 18);
        }
      });

      // Coins
      coinsRef.current.forEach((c) => {
        if (c.isCollected) return;
        const bounce = Math.sin(stepCount * 0.1 + c.x) * 4;
        ctx.fillStyle = c.isWonderCoin ? '#C084FC' : '#F59E0B';
        ctx.beginPath();
        ctx.ellipse(c.x, c.y + bounce, 9, 13, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Wonder Seed
      if (wonderSeedObjRef.current && !wonderSeedObjRef.current.isCollected) {
        const ws = wonderSeedObjRef.current;
        const seedPulse = Math.sin(stepCount * 0.1) * 6;
        ctx.save();
        ctx.translate(ws.x, ws.y + seedPulse);
        ctx.fillStyle = '#EAB308';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Talking Flower
      const tfX = 490;
      const tfY = 350;
      ctx.fillStyle = '#EC4899';
      ctx.beginPath();
      ctx.arc(tfX, tfY - 38, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.arc(tfX, tfY - 38, 8, 0, Math.PI * 2);
      ctx.fill();

      // Flower message
      if (Math.abs(p.x - tfX) < 170) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#EC4899';
        ctx.lineWidth = 2;
        const msg = talkingFlowerMessage;
        ctx.font = 'bold 12px "Cairo", "Plus Jakarta Sans", sans-serif';
        const textWidth = ctx.measureText(msg).width;
        const bW = Math.max(140, textWidth + 24);
        const bH = 34;
        const bX = tfX - bW / 2;
        const bY = tfY - 85;

        ctx.beginPath();
        ctx.roundRect(bX, bY, bW, bH, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#1E293B';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(msg, tfX, bY + bH / 2);
      }

      // Bubbles
      bubblesRef.current.forEach((b) => {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Particles
      particlesRef.current.forEach((pt) => {
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Enemies
      enemiesRef.current.forEach((en) => {
        if (!en.isAlive) return;
        ctx.fillStyle = en.type === 'koopa' ? '#16A34A' : '#991B1B';
        ctx.beginPath();
        ctx.arc(en.x + en.w / 2, en.y + en.h / 2, en.w / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Flagpole
      const fpObj = flagpoleRef.current;
      ctx.fillStyle = '#475569';
      ctx.fillRect(fpObj.x, fpObj.y, 8, 240);
      ctx.fillStyle = fpObj.reached ? '#22C55E' : '#EC4899';
      ctx.beginPath();
      ctx.moveTo(fpObj.x + 8, fpObj.y + (fpObj.reached ? 180 : 30));
      ctx.lineTo(fpObj.x + 48, fpObj.y + (fpObj.reached ? 200 : 50));
      ctx.lineTo(fpObj.x + 8, fpObj.y + (fpObj.reached ? 220 : 70));
      ctx.fill();

      // Player
      ctx.save();
      ctx.translate(p.x, p.y);
      if (powerUpRef.current === 'elephant') {
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.ellipse(p.width / 2, p.height / 2, p.width / 2, p.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = char.secondaryColor;
        ctx.fillRect(6, p.height / 2, p.width - 12, p.height / 2);
        ctx.fillStyle = char.color;
        ctx.fillRect(10, 0, p.width - 16, 14);
      } else {
        ctx.fillStyle = char.color;
        ctx.fillRect(4, 14, p.width - 8, p.height / 2 - 10);
        ctx.fillStyle = char.secondaryColor;
        ctx.fillRect(4, p.height / 2, p.width - 8, p.height / 2);
        ctx.fillStyle = '#FDE047';
        ctx.beginPath();
        ctx.arc(p.width / 2, 12, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = char.color;
        ctx.fillRect(0, 0, p.width, 8);
      }
      ctx.restore();

      ctx.restore();
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [triggerWonderFlower, isAr, talkingFlowerMessage, onWonderSeedCollected]);

  const handleNextStage = () => {
    const nextId = currentStage.id < 67 ? currentStage.id + 1 : 1;
    if (onStageChange) onStageChange(nextId);
    sound.playPowerUp();
  };

  const handlePrevStage = () => {
    const prevId = currentStage.id > 1 ? currentStage.id - 1 : 67;
    if (onStageChange) onStageChange(prevId);
    sound.playPowerUp();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900">
      {/* 67-Stage Navigation Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white z-10">
        {/* Left: Stage Index & Next/Prev Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevStage}
            aria-label="Previous Stage"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-purple-950/50 border border-purple-500/30 rounded-xl">
            <span className="text-purple-400 font-mono font-bold text-xs">
              {currentStage.stageCode}
            </span>
            <span className="text-xs text-slate-200 font-bold max-w-[170px] sm:max-w-xs truncate">
              {isAr ? currentStage.nameAr : currentStage.nameEn}
            </span>
            <div className="hidden sm:flex items-center text-amber-400 text-xs">
              {Array.from({ length: currentStage.difficulty }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>

          <button
            onClick={handleNextStage}
            aria-label="Next Stage"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {onOpenStageDrawer && (
            <button
              onClick={onOpenStageDrawer}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-900/60 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">{isAr ? 'خريطة الـ 67 مرحلة' : '67 Stages Map'}</span>
              <span className="sm:hidden">{isAr ? 'الخريطة' : 'Map'}</span>
            </button>
          )}
        </div>

        {/* Center: Collectibles */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800 text-xs font-mono">
            <span className="text-amber-400 font-bold">🪙</span>
            <span className="tabular-nums font-semibold">{coins}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-purple-900/40 border border-purple-600/30 text-xs font-mono">
            <span className="text-purple-300 font-bold">🌸</span>
            <span className="tabular-nums font-semibold text-purple-200">{flowerCoins}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-yellow-950/50 border border-yellow-500/40 text-xs font-mono">
            <span className="text-yellow-400 font-bold">⭐</span>
            <span className="tabular-nums font-semibold text-yellow-300">{wonderSeeds}</span>
          </div>
        </div>

        {/* Right: Audio & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newMute = !isMuted;
              setIsMuted(newMute);
              sound.setMuted(newMute);
            }}
            aria-label="Toggle Mute"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={initLevel}
            aria-label="Restart Stage"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'إعادة' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Main Game Canvas - Mobile Touch Gesture Isolation */}
      <div className="relative w-full aspect-[16/9] max-h-[520px] bg-slate-950 overflow-hidden flex items-center justify-center touch-none select-none">
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="w-full h-full object-contain block focus:outline-none touch-none select-none"
          tabIndex={0}
        />

        {/* Victory Screen with Direct Next Stage Advance */}
        {hasWon && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-6 text-white z-20">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 text-3xl animate-bounce">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold font-display">
              {isAr ? `اجتزت المرحلة ${currentStage.stageCode} بنجاح!` : `Stage ${currentStage.stageCode} Cleared!`}
            </h3>
            <p className="text-slate-300 text-sm max-w-md">
              {isAr
                ? `أحسنت! أكملت ${isAr ? currentStage.nameAr : currentStage.nameEn}. المراحل المكتملة: ${completedStages.length} من أصل 67 مرحلة!`
                : `Awesome! You completed ${currentStage.nameEn}. Total Cleared: ${completedStages.length} of 67 stages!`}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <button
                onClick={handleNextStage}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>{isAr ? 'المرحلة التالية' : 'Next Stage'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={initLevel}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                {isAr ? 'إعادة هذه المرحلة' : 'Play Again'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sandbox Toolbar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Character Selector */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <span className="text-xs text-slate-400 whitespace-nowrap font-medium">
            {isAr ? 'الشخصية:' : 'Character:'}
          </span>
          {CHARACTERS.map((c) => {
            const isSelected = selectedCharId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCharId(c.id);
                  sound.playJump();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${c.avatarColor}`} />
                <span>{isAr ? c.nameAr : c.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Powers & Wonder Flower Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPowerUp('elephant');
              sound.playPowerUp();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              powerUp === 'elephant'
                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🐘</span>
            <span>{isAr ? 'الفيل' : 'Elephant'}</span>
          </button>

          <button
            onClick={() => {
              setPowerUp('bubble');
              sound.playPowerUp();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              powerUp === 'bubble'
                ? 'bg-pink-600 text-white shadow-md ring-2 ring-pink-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🫧</span>
            <span>{isAr ? 'الفقاعات' : 'Bubble'}</span>
          </button>

          <button
            onClick={() => {
              setPowerUp('drill');
              sound.playPowerUp();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              powerUp === 'drill'
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🌪️</span>
            <span>{isAr ? 'الحفر' : 'Drill'}</span>
          </button>

          <button
            onClick={triggerWonderFlower}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'زهرة العجائب' : 'Wonder!'}</span>
          </button>
        </div>
      </div>

      {/* Touch Screen Controls - Mobile Joy-Con Pad */}
      <div className="md:hidden p-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between touch-none select-none">
        {/* Directional Pad */}
        <div className="flex items-center gap-2">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              keysRef.current['ArrowLeft'] = true;
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              keysRef.current['ArrowLeft'] = false;
            }}
            onMouseDown={() => (keysRef.current['ArrowLeft'] = true)}
            onMouseUp={() => (keysRef.current['ArrowLeft'] = false)}
            aria-label="Move Left"
            className="w-14 h-14 rounded-2xl bg-slate-800 active:bg-purple-600 text-white flex items-center justify-center border-2 border-slate-700 active:border-purple-400 active:scale-95 transition-transform touch-none shadow-md"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              keysRef.current['ArrowRight'] = true;
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              keysRef.current['ArrowRight'] = false;
            }}
            onMouseDown={() => (keysRef.current['ArrowRight'] = true)}
            onMouseUp={() => (keysRef.current['ArrowRight'] = false)}
            aria-label="Move Right"
            className="w-14 h-14 rounded-2xl bg-slate-800 active:bg-purple-600 text-white flex items-center justify-center border-2 border-slate-700 active:border-purple-400 active:scale-95 transition-transform touch-none shadow-md"
          >
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>

        {/* Action Buttons: Y/B Attack & B/A Jump */}
        <div className="flex items-center gap-3">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              performAction();
            }}
            onClick={performAction}
            className="w-13 h-13 rounded-2xl bg-blue-600 active:bg-blue-500 text-white font-bold text-xs flex flex-col items-center justify-center border-2 border-blue-400 shadow-lg active:scale-90 transition-transform touch-none"
          >
            <span className="font-display text-sm">B</span>
            <span className="text-[9px] font-semibold">{isAr ? 'حركة' : 'Action'}</span>
          </button>
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              keysRef.current['Space'] = true;
              if (pRef.current.isGrounded) {
                pRef.current.vy = -12;
                pRef.current.isGrounded = false;
                sound.playJump();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              keysRef.current['Space'] = false;
            }}
            onMouseDown={() => {
              if (pRef.current.isGrounded) {
                pRef.current.vy = -12;
                pRef.current.isGrounded = false;
                sound.playJump();
              }
            }}
            className="w-15 h-15 rounded-2xl bg-emerald-600 active:bg-emerald-500 text-white font-bold text-sm flex flex-col items-center justify-center border-2 border-emerald-400 shadow-xl active:scale-90 transition-transform touch-none"
          >
            <ChevronUp className="w-6 h-6" />
            <span className="text-[10px] font-semibold">{isAr ? 'قفز' : 'Jump'}</span>
          </button>
        </div>
      </div>

      {/* Control Tips & Active Stage Status */}
      <div className="px-5 py-2.5 bg-slate-950 text-slate-400 text-xs flex flex-wrap items-center justify-between border-t border-slate-900 gap-2">
        <div className="flex items-center gap-3">
          <span>{isAr ? `المرحلة الحالية: ${currentStage.id} من 67` : `Current Stage: ${currentStage.id} / 67`}</span>
          <span>·</span>
          <span>{isAr ? currentStage.worldNameAr : currentStage.worldNameEn}</span>
          <span>·</span>
          <span className="text-purple-400 font-semibold">
            {isAr ? currentStage.wonderNameAr : currentStage.wonderNameEn}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNextStage}
            className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
          >
            <span>{isAr ? 'المرحلة التالية' : 'Next Course'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
