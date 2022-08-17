import Jumps from "./Jumps.js";
import { label, SingleAttack } from "../../../Types.js";

function searchLabel(this: Jumps, data: label["name"]): number {
    try {
        let label: string;
        if (data[0] !== "#") {
            throw new Error("label name is must be start a #");

        } else {
            label = data.slice(1);
        }
        for (let index: number = 0; index < this.director.AttackLoader.loadingAttack.length; index++) {
            const element: SingleAttack = this.director.AttackLoader.loadingAttack[index];

            if (element.category === "jump" &&
                element.type === "label") {
                if (label === (element.data as label).name) {
                    return index;
                }
            }
        }
        throw new Error("label name is undefined");
    } catch (error) {
        console.log((error as Error).message);
        return 0;
    }
}
export default searchLabel;