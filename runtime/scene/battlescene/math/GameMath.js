import router from "./router.js";
import variableToUse from "./varToNum.js";
import set from "./set.js";
import add from "./add.js";
import sub from "./sub.js";
import findVariable from "./findVariable.js";
import rnd from "./rnd.js";
import mul from "./mul.js";
import div from "./div.js";
import rndValues from "./rndValues.js";
import mod from "./mod.js";
import rotate from "./rotate.js";
import betWeenAngle from "./betWeenAngle.js";
import init from "./init.js";
export default class GameMath {
    constructor(scene, director) {
        this.scene = scene;
        this.director = director;
        this.variables = {};
        this.router = router;
        this.variableToUse = variableToUse;
        this.set = set;
        this.add = add;
        this.sub = sub;
        this.rnd = rnd;
        this.mul = mul;
        this.div = div;
        this.rndValues = rndValues;
        this.mod = mod;
        this.rotate = rotate;
        this.betWeenAngle = betWeenAngle;
        this.findVariable = findVariable;
        this.init = init;
    }
    scene;
    director;
    variables;
    router;
    variableToUse;
    findVariable;
    set;
    add;
    sub;
    rnd;
    mul;
    div;
    rndValues;
    mod;
    rotate;
    betWeenAngle;
    init;
}
//# sourceMappingURL=GameMath.js.map