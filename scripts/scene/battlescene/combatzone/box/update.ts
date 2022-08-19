import CombatZoneDirector from "../CombatZoneDirector.js";
import CombatZone from "./combatzone.js";
export default function update(this: CombatZone, draws: CombatZoneDirector["draws"], updateDisplay?: boolean) {

    if (updateDisplay) {
        this.RenderZone.clear();
        this.RenderZone.beginDraw();

        this.RenderZone.batchDraw(this.Background, this.Background.x - this.RenderZone.x, this.Background.y - this.RenderZone.y);

        for (let index = 0; index < draws.length; index++) {
            const element = draws[index];
            element;
            if (element instanceof Phaser.GameObjects.Text || element instanceof Phaser.GameObjects.Sprite || element instanceof Phaser.GameObjects.Graphics) {
                if (!element.active) {
                    draws.splice(index, 1);

                } else {
                    this.RenderZone.batchDraw(element, element.x - this.RenderZone.x, element.y - this.RenderZone.y);
                }
            } else {
                if (element.destroyed || element.visible) {
                    element.onRender = false;
                    draws.splice(index, 1);

                } else
                    if (element.body) {

                        this.RenderZone.batchDraw(element, element.x - this.RenderZone.x, element.y - this.RenderZone.y);
                    }
            }
        }


        this.RenderZone.endDraw();
    } else {

        const TWEENS = this.scene.tweens.getTweensOf(this.RectSize);


        isTween: for (const iterator of TWEENS) {
            if (iterator) {
                this.moving = true;
                break isTween;
            }
        }

        if (this.moving) {

            const THICKNESS_DOUBLE: number = this.thickness * 2;
            const THICKNESS_HALF: number = this.thickness * 0.5;

            this.up.setDisplaySize(
                this.RectSize.width + THICKNESS_DOUBLE,
                this.thickness);
            this.up.setPosition(
                this.RectSize.centerX,
                this.RectSize.top - THICKNESS_HALF);

            this.down.setDisplaySize(
                this.RectSize.width + THICKNESS_DOUBLE,
                this.thickness);
            this.down.setPosition(
                this.RectSize.centerX,
                this.RectSize.bottom + THICKNESS_HALF);

            this.left.setDisplaySize(
                this.thickness,
                this.RectSize.height + THICKNESS_DOUBLE);
            this.left.setPosition(
                this.RectSize.left - THICKNESS_HALF,
                this.RectSize.centerY);

            this.right.setDisplaySize(
                this.thickness,
                this.RectSize.height + THICKNESS_DOUBLE);
            this.right.setPosition(
                this.RectSize.right + THICKNESS_HALF,
                this.RectSize.centerY);


            if (this.RectBox) {
                this.RectBox.clear();
                this.RectBox.strokeRectShape(this.RectSize);
            }

            this.RenderZone.setPosition(this.RectSize.x, this.RectSize.y);
            this.RenderZone.resize(this.RectSize.width, this.RectSize.height);
            this.Background.setPosition(this.RectSize.x, this.RectSize.y);
            this.Background.setSize(this.RectSize.width, this.RectSize.height);
        }

    }
}