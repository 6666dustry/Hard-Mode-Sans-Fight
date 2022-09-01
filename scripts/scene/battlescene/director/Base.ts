import BattleScene from "../BattleScene.js";
import Director from "./Director.js";
import type { Constructor } from "../../../Types.js";
/**
 * @param superclass 
 * @returns Based class.
 */
export default function Base<SuperClass extends Constructor>(superclass: SuperClass) {
    /**
     * test.
     */
    return class extends superclass {
        constructor(...arg: any) {
            super(...arg);
        }
        scene!: BattleScene;
        director!: Director;
        BaseConstructor(scene: BattleScene, director: Director) {
            this.scene ?? (this.scene = scene);
            this.director ?? (this.director = director);
        }
    };
}