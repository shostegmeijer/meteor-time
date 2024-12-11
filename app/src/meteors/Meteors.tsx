import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

interface MeteorOptions {
    app: PIXI.Application;
    maxWidth: number;
    maxHeight: number;
}


class Meteor {
    private app: PIXI.Application;
    private sprite: PIXI.Sprite;
    private maxWidth: number;
    private maxHeight: number;

    private speed: number = 0;
    private angle: number = 0;
    private opacity: number = 0;

    constructor(options: MeteorOptions) {
        this.app = options.app;
        this.maxWidth = options.maxWidth;
        this.maxHeight = options.maxHeight;

        // Create a simple sprite instead of complex graphics
        this.sprite = new PIXI.Sprite(this.createMeteorTexture());
        this.app.stage.addChild(this.sprite);
        this.reset();
    }

    private createMeteorTexture(): PIXI.Texture {
        // Create a simple linear gradient texture
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 2;
        const context = canvas.getContext('2d')!;

        const gradient = context.createLinearGradient(0, 0, 100, 0);
        gradient.addColorStop(1, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.5, 'rgba(101,178,255,0.5)');
        gradient.addColorStop(0, 'rgba(101,178,255,0)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, 100, 3);

        return PIXI.Texture.from(canvas);
    }

    reset(): void {
        // Randomize starting position
        const startX = Math.random() * this.maxWidth;
        const startY = -50; // Start above the screen

        // Simplified meteor properties
        this.speed = 5 + Math.random() * 10;
        this.speed *= this.sprite.scale.x; // Adjust speed based on scale
        this.angle = Math.PI * 0.5 + (Math.random() * 0.2 - 0.1); // Ensure downward trajectory with slight randomness
        this.opacity = 0.7 + Math.random() * 0.3;

        // Position and style the sprite
        this.sprite.x = startX;
        this.sprite.y = startY;
        this.sprite.rotation = this.angle; // Set the rotation
        this.sprite.alpha = this.opacity;
        this.sprite.scale.set(1 + Math.random());
    }

    update(): void {
        // Move meteor
        this.sprite.x += Math.cos(this.angle) * this.speed;
        this.sprite.y += Math.sin(this.angle) * this.speed;

        // Random opacity fade
        this.opacity = 0.3 + Math.random() * 0.7;
        this.sprite.alpha = this.opacity;

        // Reset if off screen
        if (this.sprite.y > this.maxHeight + 100 ||
            this.sprite.x > this.maxWidth + 100) {
            this.reset();
        }
    }
}


const MeteorParticleEngine: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [meteorCount] = useState(5);
    const pixiAppRef = useRef<PIXI.Application | null>(null);
    const meteorsRef = useRef<Meteor[]>([]);

    useEffect(() => {
        // Ensure canvas exists and we haven't already initialized
        if (!canvasRef.current || pixiAppRef.current) return;

        // Create PixiJS application with reduced complexity
        const app = new PIXI.Application({
            view: canvasRef.current,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000033,
            antialias: false, // Reduce shader complexity
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            resizeTo: window,
            backgroundAlpha: 0
        });

        pixiAppRef.current = app;

        // Create starry background with simple approach
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
        app.stage.addChild(stars);

        // Create meteors
        const meteors = Array.from({ length: meteorCount }, () =>
            new Meteor({
                app,
                maxWidth: app.screen.width,
                maxHeight: app.screen.height
            })
        );
        meteorsRef.current = meteors;

        // Animation loop
        const animate = () => {
            meteors.forEach(meteor => meteor.update());
        };

        app.ticker.add(animate);
    }, [meteorCount]);

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

