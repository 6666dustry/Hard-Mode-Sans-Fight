import makeDeepCopy from "./makeDeepCopy.js";
function setTween(Scene, Target, Tween, changing) {
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
            if (Target[key] == null) {
                console.warn(`${key} is not defined at add tween.`);
            }
            else if (typeof Target[key] !== "number") {
                console.warn(`${key} is not number at add tween.`);
            }
        }
    }
    Scene.tweens.add(Tween);
}
/**
 *
 */
export default function setTarget(Scene, Target, Tween, changing) {
    const TWEENS = makeDeepCopy(Tween);
    if (Array.isArray(TWEENS)) {
        for (const iterator of TWEENS) {
            setTween(Scene, Target, iterator, changing);
        }
    }
    else {
        setTween(Scene, Target, TWEENS, changing);
    }
}
//# sourceMappingURL=setTween.js.map