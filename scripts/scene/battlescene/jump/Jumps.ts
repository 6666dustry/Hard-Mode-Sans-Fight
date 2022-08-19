import Director from "../director/Director.js";
import router from "./router.js";
import searchLabel from "./searchLabel.js";
import ABS from "./ABS.js";
import ABSCount from "./ABSCount.js";
import REL from "./REL.js";
import RELCount from "./RELCount.js";
import RND from "./RND.js";
import countOut from "./CountOut.js";
import compare from "./compare.js";
import init from "./init.js";
export default class Jumps {
    constructor(DIRECTOR: Director) {
        this.director = DIRECTOR;

        this.counter = [];

        this.searchLabel = searchLabel;
        this.ABS = ABS;
        this.ABSCount = ABSCount;
        this.REL = REL;
        this.RELCount = RELCount;
        this.RND = RND;
        this.countOut = countOut;
        this.compare = compare;
        this.init = init;

        this.router = router;
    }
    readonly director: Director;
    counter: (number | undefined | false)[];
    readonly router: typeof router;
    readonly searchLabel: typeof searchLabel;
    readonly ABS: typeof ABS;
    readonly ABSCount: typeof ABSCount;
    readonly REL: typeof REL;
    readonly RELCount: typeof RELCount;
    readonly RND: typeof RND;
    readonly countOut: typeof countOut;
    readonly compare: typeof compare;
    readonly init: typeof init;
    label() {
        return false;
    }
}