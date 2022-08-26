import AttackLoader from "../attackLoader.js";

/**
* catch phase attack.
* called at player attacked.
* @returns return parsed json file object.
*/
export default function catchOrder(this: AttackLoader): any {
    let result: any;
    switch (this.phase) {
        case 1: {
            result = this.scene.cache.json.get(
                this.scene.config.Phase1[this.loadFilePos]
            );
            this.attackName = this.scene.config.Phase1[this.loadFilePos];
            break;
        }
        case 2: {
            result = this.scene.cache.json.get(
                this.scene.config.Phase2[this.loadFilePos]
            );
            this.attackName = this.scene.config.Phase2[this.loadFilePos];
            break;
        }
    }
    return result;
}