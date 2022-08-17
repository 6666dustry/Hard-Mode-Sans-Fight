function falling(config) {
    this.director.Heart.setGravity({
        direction: config.direction || "right",
        color: "falling",
    });
    this.director.Sans.falling = config.direction || "right";
    if (config.playAnim) {
        this.director.Sans.setVisual({
            target: "torso",
            anim: `${config.direction || "right"}Slam`,
            autoInit: true,
        });
    }
    this.scene.time.delayedCall(config.duration || 1000, () => {
        this.director.Sans.falling = undefined;
        this.director.Sans.setVisual({
            "frame": "default"
        });
        this.director.Heart.setGravity({
            direction: config.direction || "right",
            color: "blue",
        });
    }, undefined, this);
}
export default falling;
//# sourceMappingURL=falling.js.map