import Director from "./director/Director.js";
export default function router<Key extends string>(this: { [P in Key]: any } & {
    director: Director;
}, config: {
    readonly [k: string]: any;
}, type: Key) {
    if (this[type] == null || typeof this[type] !== "function") {

        console.error(`type is name not defined at ${ this.director.AttackLoader.runAttackPos }
        type ${ type }`);

    } else
        return (this[type])(config);
};