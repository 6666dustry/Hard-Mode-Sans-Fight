/**
 * catch random attack.
 * @returns return parsed json file object.
 */
export default function catchRND() {
    let result;
    switch (this.phase) {
        case 1: {
            const ATTACK = Phaser.Math.Between(0, this.scene.config.Phase1RND.length - 1);
            result = this.scene.cache.json.get(this.scene.config.Phase1RND[ATTACK]);
            this.attackName = this.scene.config.Phase1RND[ATTACK];
            break;
        }
        case 2: {
            const ATTACK = Phaser.Math.Between(0, this.scene.config.Phase2RND.length - 1);
            result = this.scene.cache.json.get(this.scene.config.Phase2RND[ATTACK]);
            this.attackName = this.scene.config.Phase2RND[ATTACK];
            break;
        }
    }
    return result;
}
//# sourceMappingURL=catchRND.js.map