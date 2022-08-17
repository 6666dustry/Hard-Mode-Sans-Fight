function update(time) {
    //update bones.
    for (const iterator of this.getChildren()) {
        iterator.update();
        if (!iterator.visible && !iterator.onRender && iterator.moveType !== "menu") {
            this.director.CombatzoneDirector.draws.push(iterator);
            iterator.onRender = true;
        }
    }
    for (const iterator of this.stabs) {
        iterator.update();
    }
    for (const iterator of this.circles) {
        iterator.update();
    }
}
export default update;
//# sourceMappingURL=directorUpdate.js.map