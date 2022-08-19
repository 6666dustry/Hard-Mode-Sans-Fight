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
    constructor(DIRECTOR) {
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
    director;
    counter;
    router;
    searchLabel;
    ABS;
    ABSCount;
    REL;
    RELCount;
    RND;
    countOut;
    compare;
    init;
    label() {
        return false;
    }
}
//# sourceMappingURL=Jumps.js.map