export default function update() {
    for (const iterator of this.getChildren()) {
        let isRiding = iterator.update();
        if (isRiding) {
            if (iterator.speed !== 0) {
                iterator.director.Heart.moveWithPlatform = true;
            }
            else if (iterator.oldPosition.x !== iterator.x || iterator.oldPosition.y !== iterator.y) {
                iterator.director.Heart.moveWithPlatform = true;
            }
            else {
                iterator.director.Heart.moveWithPlatform = false;
            }
        }
        if (!iterator.visible && !iterator.onRender) {
            this.director.CombatzoneDirector.draws.push(iterator);
            iterator.onRender = true;
        }
    }
}
//# sourceMappingURL=directorUpdate.js.map