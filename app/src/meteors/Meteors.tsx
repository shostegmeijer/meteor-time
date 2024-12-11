import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';

interface MeteorOptions {
    app: PIXI.Application;
    maxWidth: number;
    maxHeight: number;
}

interface MeteorParticleEngineProps {
    meteorType: string; // Accept meteor type as a prop
}

class Meteor {
    private app: PIXI.Application;
    private sprite: PIXI.Sprite;
    private maxWidth: number;
    private maxHeight: number;

    private speed: number = 0;
    private angle: number = 0;
    private opacity: number = 0;

    private type: string;

    constructor(options: MeteorOptions, type: string) {
        this.app = options.app;
        this.maxWidth = options.maxWidth;
        this.maxHeight = options.maxHeight;
        this.type = type;

        this.sprite = new PIXI.Sprite(this.createMeteorTexture());
        this.sprite.filters = [new GlowFilter({ distance: 30, outerStrength: 0.75, innerStrength: 1, color: 0xffffff })];
        this.app.stage.addChild(this.sprite);
        this.reset();
    }

    private createMeteorTexture(): PIXI.Texture {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 2;
        const context = canvas.getContext('2d')!;

        let gradient;

        switch (this.type) {
            case 'A':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(101,0,0,1)');
                gradient.addColorStop(0.8, 'rgba(255,100,100,0.5)');
                gradient.addColorStop(0, 'rgba(255,0,0,0)');
                break;
            case 'B':
            case 'F':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.8, 'rgba(101,178,255,0.5)');
                gradient.addColorStop(0, 'rgba(255,162,39,0)');
                break;
            case 'C':
            case 'G':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(101,178,255,1)');
                gradient.addColorStop(0.8, 'rgba(0,0,0,0.5)');
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                break;
            case 'D':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(255,101,0,1)');
                gradient.addColorStop(0.8, 'rgba(178,0,0,0.5)');
                gradient.addColorStop(0, 'rgba(255,101,0,0)');
                break;
            case 'E':
            case 'M':
            case 'P':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(255,101,0,1)');
                gradient.addColorStop(0.8, 'rgba(101,178,255,0.5)');
                gradient.addColorStop(0, 'rgba(255,101,0,0)');
                break;
            case 'Q':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(178,0,0,1)');
                gradient.addColorStop(0.8, 'rgba(101,178,255,0.5)');
                gradient.addColorStop(0, 'rgba(255,101,0,0)');
                break;
            case 'R':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(178,0,0,1)');
                gradient.addColorStop(0.8, 'rgba(101,178,255,0.5)');
                gradient.addColorStop(0, 'rgba(255,101,0,0)');
                break;
            case 'S':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(178,0,0,1)');
                gradient.addColorStop(0.8, 'rgba(101,178,255,0.5)');
                gradient.addColorStop(0, 'rgba(255,101,0,0)');
                break;
            case 'T':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(178,101,255,1)');
                gradient.addColorStop(0.8, 'rgba(178,178,178,0.5)');
                gradient.addColorStop(0, 'rgba(178,178,178,0)');
                break;
            case 'V':
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(178,0,0,1)');
                gradient.addColorStop(0.8, 'rgba(101,178,255,0.5)');
                gradient.addColorStop(0, 'rgba(255,101,0,0)');
                break;
            default:
                gradient = context.createLinearGradient(0, 0, 100, 0);
                gradient.addColorStop(1, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.8, 'rgba(101,178,255,0.5)');
                gradient.addColorStop(0, 'rgba(255,162,39,0)');
                break;
        }

        context.fillStyle = gradient;
        context.fillRect(0, 0, 100, 3);

        return PIXI.Texture.from(canvas);
    }

    reset(): void {
        const startX = Math.random() * this.maxWidth;
        const startY = -50;

        this.speed = 5 + Math.random() * 10;
        this.speed *= this.sprite.scale.x;
        this.angle = Math.PI * 0.5 + (Math.random() * 0.2 - 0.1);
        this.opacity = 0.7 + Math.random() * 0.3;

        this.sprite.x = startX;
        this.sprite.y = startY;
        this.sprite.rotation = this.angle;
        this.sprite.alpha = this.opacity;
        this.sprite.scale.set(1 + Math.random());
    }

    update(): void {
        this.sprite.x += Math.cos(this.angle) * this.speed;
        this.sprite.y += Math.sin(this.angle) * this.speed;

        // Stronger fade away effect
        this.opacity -= 0.015
        this.sprite.alpha = this.opacity;

        if (this.sprite.y > this.maxHeight + 100 || this.sprite.x > this.maxWidth + 100) {
            this.reset();
        }
    }
}

const MeteorParticleEngine: React.FC<MeteorParticleEngineProps> = ({ meteorType }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixiAppRef = useRef<PIXI.Application | null>(null);
    const meteorsRef = useRef<Meteor[]>([]);
    const [meteorCount] = useState(5);

    useEffect(() => {
        if (!canvasRef.current || pixiAppRef.current) return;

        const app = new PIXI.Application({
            view: canvasRef.current,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000033,
            antialias: false,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            resizeTo: window,
            backgroundAlpha: 0
        });

        pixiAppRef.current = app;

        const stars = new PIXI.Graphics();
        stars.beginFill(0xFFFFFF);
        for (let i = 0; i < 150; i++) {
            stars.drawCircle(
                Math.random() * app.screen.width,
                Math.random() * app.screen.height,
                Math.random()
            );
        }
        stars.endFill();
        stars.filters = [new GlowFilter({ distance: 15, outerStrength: 2, innerStrength: 1, color: 0xffffff })];
        app.stage.addChild(stars);

        const meteors = Array.from({ length: meteorCount }, () =>
            new Meteor({
                app,
                maxWidth: app.screen.width,
                maxHeight: app.screen.height
            }, meteorType)
        );
        meteorsRef.current = meteors;

        const animate = () => {
            meteors.forEach(meteor => meteor.update());
        };

        app.ticker.add(animate);
    }, [meteorCount, meteorType]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                width: '100%',
                height: '100%'
            }}
        />
    );
};

export default MeteorParticleEngine;

