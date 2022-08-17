import makeDeepCopy from "./makeDeepCopy.js";
function setTween(Scene: Phaser.Scene, Target: object, Tween: Phaser.Types.Tweens.TweenBuilderConfig, changing?: {
    //from       to
    [k: string]: string;
}) {
    Tween.targets = Target;
    if (changing && Tween.props) {
        for (const key in changing) {
            if (Object.prototype.hasOwnProperty.call(changing, key)) {

                if (Tween.props[key]) {
                    const element = changing[key];

                    Tween.props[element] = makeDeepCopy(Tween.props[key]);
                    delete Tween.props[key];
                }
            }
        }
    }
    if (Tween.props) {
        for (const key of Object.keys(Tween.props)) {
            if (Target[key as keyof object] == null) {
                console.warn(`${ key } is not defined at add tween.`);
            } else if (typeof Target[key as keyof object] !== "number") {
                console.warn(`${ key } is not number at add tween.`);
            }
        }
    }

    Scene.tweens.add(
        Tween
    );
}
type Param = Parameters<typeof setTween>;
/**
 * 
 */
export default function setTarget(Scene: Param[0], Target: Param[1], Tween: Param[2] | Param[2][], changing?: Param[3]): void {
    const TWEENS: Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenBuilderConfig[] = makeDeepCopy(Tween);
    if (Array.isArray(TWEENS)) {
        for (const iterator of TWEENS) {
            setTween(Scene, Target, iterator, changing);
        }
    } else {
        setTween(Scene, Target, TWEENS, changing);
    }
}
