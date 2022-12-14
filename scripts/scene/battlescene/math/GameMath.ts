import type BattleScene from "../BattleScene.js";
import type Director from "../director/Director.js";
import type { variableType } from "../../../Types.js";
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
import Base from "../director/Base.js";
export default class GameMath extends Base(class { }) {
    constructor(scene: BattleScene, director: Director) {
        super();
        this.BaseConstructor(scene, director);
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
    variables: {
        [k: string]: variableType;
    };
    readonly router: typeof router;
    readonly variableToUse: typeof variableToUse;
    readonly findVariable: typeof findVariable;
    readonly set: typeof set;
    readonly add: typeof add;
    readonly sub: typeof sub;
    readonly rnd: typeof rnd;
    readonly mul: typeof mul;
    readonly div: typeof div;
    readonly rndValues: typeof rndValues;
    readonly mod: typeof mod;
    readonly rotate: typeof rotate;
    readonly betWeenAngle: typeof betWeenAngle;
    readonly init: typeof init;
}