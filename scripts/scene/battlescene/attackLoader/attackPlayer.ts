import { SingleAttack } from "../../../Types.js";
import AttackLoader from "./attackLoader.js";
export default function attackPlayer(this: AttackLoader, Attack: SingleAttack) {
    this.loadAttack(Attack);
}