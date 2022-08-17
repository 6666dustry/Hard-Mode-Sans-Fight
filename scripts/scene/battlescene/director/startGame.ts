import Director from "./Director.js";

export default function startGame(this: Director, isSingle?: boolean) {
    this.AttackLoader.endPlayerTurn(isSingle);
    this.Heart.Image.setCollisionCategory(this.heartCol);
}