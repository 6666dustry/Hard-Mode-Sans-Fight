import Keys from "./keys.js";
export default class BackGround {
    constructor(scene: Phaser.Scene) {
        this.lightLength = 30;
        this.scene = scene;

        scene.tweens.add({
            targets: this,
            props: {
                lightLength: `+=50`
            },
            duration: 2500,
            repeat: -1,
            yoyo: true,
            ease: "Quad.easeInOut"
        }
        );

        this.UnderLight = scene.add.graphics();
        this.UnderLight.fillGradientStyle(0x000000, 0x000000, 0xff0000, 0xff0000,);
        this.UnderLight.fillRect(0, scene.scale.height - this.lightLength, scene.scale.width, this.lightLength);
        this.UnderLight.setDepth(Keys.Depth.backGround);
        this.UnderLight.setScrollFactor(0, 0);

        const FREQUENCY = 600;

        this.RainBone = scene.add.particles(
            Keys.Image.particleBone,
            undefined, [{
                lifespan: 8000,
                x: {
                    min: 0, max: scene.scale.width
                },
                y: 0,
                speedY: {
                    min: 50, max: 100
                },
                speedX: {
                    min: 10, max: 20
                },
                scale: {
                    min: 0.5, max: 0.6
                },
                frequency: FREQUENCY,
                rotate: {
                    start: -360, end: 360,
                    random: true
                },
                alpha: {
                    start: 0.8, end: 0
                },
            }, {
                lifespan: 6000,
                x: {
                    min: 0, max: scene.scale.width
                },
                y: 0,
                speedY: {
                    min: 100, max: 200
                },
                speedX: {
                    min: 15, max: 30
                },
                scale: {
                    min: 0.6, max: 0.8
                },
                frequency: FREQUENCY,
                rotate: {
                    start: -360, end: 360,
                    random: true
                },
                alpha: {
                    start: 0.9, end: 0
                },
            },
            {
                lifespan: 4000,
                x: {
                    min: 0, max: scene.scale.width
                },
                y: 0,
                speedY: {
                    min: 200, max: 300
                },
                speedX: {
                    min: 20, max: 40
                },
                scale: {
                    min: 0.8, max: 1
                },
                frequency: FREQUENCY,
                rotate: {
                    start: -360, end: 360,
                    random: true
                },
                alpha: {
                    start: 1, end: 0
                }
            }]
        ).setDepth(Keys.Depth.backGround);

    }
    scene: Phaser.Scene;
    UnderLight: Phaser.GameObjects.Graphics;
    lightLength: number;
    RainBone: Phaser.GameObjects.Particles.ParticleEmitterManager;
    update() {
        this.UnderLight.clear();
        this.UnderLight.fillGradientStyle(0x000000, 0x000000, 0xff0000, 0xff0000,);
        this.UnderLight.fillRect(0, this.scene.scale.height - this.lightLength, this.scene.scale.width, this.lightLength);
    }
}