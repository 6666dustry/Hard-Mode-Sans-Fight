var SceneKey;
(function (SceneKey) {
    SceneKey["battleScene"] = "battleScene";
    SceneKey["mainMenu"] = "mainMenu";
    SceneKey["gameOver"] = "gameOver";
    SceneKey["singleSelect"] = "singleSelect";
    SceneKey["setting"] = "setting";
    SceneKey["pause"] = "pauseScene";
})(SceneKey || (SceneKey = {}));
var ImageKey;
(function (ImageKey) {
    ImageKey["heart"] = "heart";
    ImageKey["block"] = "whiteBlock";
    ImageKey["target"] = "target";
    ImageKey["HPfont"] = "HPfont";
    ImageKey["KRfont"] = "KRfont";
    ImageKey["bone"] = "sansBone";
    ImageKey["particleBone"] = "particleBone";
    ImageKey["break"] = "brakedHeart";
    ImageKey["speech"] = "speechBubble";
})(ImageKey || (ImageKey = {}));
var SpriteSheetKey;
(function (SpriteSheetKey) {
    SpriteSheetKey["fight"] = "fight";
    SpriteSheetKey["act"] = "act";
    SpriteSheetKey["item"] = "item";
    SpriteSheetKey["mercy"] = "mercy";
    SpriteSheetKey["tagBar"] = "targetBar";
    SpriteSheetKey["attacked"] = "playerAttacked";
    SpriteSheetKey["sansHead"] = "sansHead";
    SpriteSheetKey["sansTorso"] = "sansTorso";
    SpriteSheetKey["sansLeg"] = "sansLeg";
    SpriteSheetKey["sansSweet"] = "sansSweet";
    SpriteSheetKey["shard"] = "heartShard";
    SpriteSheetKey["blaster"] = "gasterBlaster";
    SpriteSheetKey["platForm"] = "platForm1";
})(SpriteSheetKey || (SpriteSheetKey = {}));
var AudioKey;
(function (AudioKey) {
    AudioKey["battleText"] = "battleTextSound";
    AudioKey["sansText"] = "sansTextSound";
    AudioKey["cursor"] = "cursorSound";
    AudioKey["select"] = "selectSound";
    AudioKey["fight"] = "playerFight";
    AudioKey["heal"] = "playerHeal";
    AudioKey["damage"] = "playerDamage";
    AudioKey["shatter"] = "heartShatterSound";
    AudioKey["split"] = "heartSplitSound";
    AudioKey["BGM"] = "backGroundMusic";
    AudioKey["blast0"] = "gasterBlasterBlast0";
    AudioKey["blast1"] = "gasterBlasterBlast1";
    AudioKey["blaster"] = "gasterBlasterSound";
    AudioKey["slam"] = "sansSlamSound";
    AudioKey["warning"] = "warningSound";
    AudioKey["boneStab"] = "boneStabSound";
    AudioKey["ding"] = "dingSound";
    AudioKey["flash"] = "flashSound";
})(AudioKey || (AudioKey = {}));
var JsonKey;
(function (JsonKey) {
    JsonKey["attackProto"] = "attack";
    JsonKey["attack"] = "attackPlayOrder";
})(JsonKey || (JsonKey = {}));
var AnimKey;
(function (AnimKey) {
    AnimKey["barFlash"] = "attackBarFlash";
    AnimKey["attacking"] = "playerAttacking";
    AnimKey["blastStart"] = "gasterBlastStart";
    AnimKey["blasting"] = "gasterBlasting";
    AnimKey["downSlam"] = "sansDownSlam";
    AnimKey["leftSlam"] = "sansLeftSlam";
    AnimKey["flashEyes"] = "sansFlashEyes";
})(AnimKey || (AnimKey = {}));
var EventKey;
(function (EventKey) {
    EventKey["endTurn"] = "endPlayerTurn";
    EventKey["endRoll"] = "endTextRoll";
})(EventKey || (EventKey = {}));
//is it key?
var TextKey;
(function (TextKey) {
    TextKey["batTime"] = "* You feel like you're going to\n have a bad time";
    TextKey["resting"] = "* sans is taking a break.";
})(TextKey || (TextKey = {}));
let depthValue = 0;
var DepthKey;
(function (DepthKey) {
    DepthKey[DepthKey["backGround"] = depthValue] = "backGround";
    DepthKey[DepthKey["command"] = ++depthValue] = "command";
    DepthKey[DepthKey["sans"] = depthValue] = "sans";
    DepthKey[DepthKey["sansText"] = depthValue] = "sansText";
    DepthKey[DepthKey["statuses"] = depthValue] = "statuses";
    DepthKey[DepthKey["combatDisplay"] = ++depthValue] = "combatDisplay";
    DepthKey[DepthKey["combatzone"] = ++depthValue] = "combatzone";
    DepthKey[DepthKey["bone"] = ++depthValue] = "bone";
    DepthKey[DepthKey["platform"] = depthValue] = "platform";
    DepthKey[DepthKey["blaster"] = depthValue] = "blaster";
    DepthKey[DepthKey["heart"] = ++depthValue] = "heart";
    DepthKey[DepthKey["debug"] = ++depthValue] = "debug";
})(DepthKey || (DepthKey = {}));
var ColorKey;
(function (ColorKey) {
    ColorKey[ColorKey["white"] = 16777215] = "white";
    ColorKey[ColorKey["blue"] = 52479] = "blue";
    ColorKey[ColorKey["orange"] = 16756736] = "orange";
    ColorKey[ColorKey["green"] = 43520] = "green";
    ColorKey[ColorKey["purple"] = 16711935] = "purple";
})(ColorKey || (ColorKey = {}));
const ItemKey = {
    pie: {
        name: "Pie",
        displayName: "Butterscotch Pie",
        amount: 99,
    },
    noodle: {
        name: "I.noodle",
        displayName: "Instant Noodle",
        amount: 90,
    },
    steak: {
        name: "Steak",
        displayName: "Face Steak",
        amount: 60,
    },
    snowPiece: {
        name: "S.Piece",
        displayName: "Snowman Piece",
        amount: 45,
    },
    lHero: {
        name: "L.Hero",
        displayName: "Legendary Hero",
        description: "* ATTACK increased by 4!",
        amount: 40,
    }
};
var LabelKey;
(function (LabelKey) {
    LabelKey["up"] = "up";
    LabelKey["down"] = "down";
    LabelKey["right"] = "right";
    LabelKey["left"] = "left";
    LabelKey["platform"] = "platform";
    LabelKey["heart"] = "heart";
})(LabelKey || (LabelKey = {}));
const Keys = {
    Image: ImageKey,
    Sheet: SpriteSheetKey,
    Audio: AudioKey,
    Json: JsonKey,
    Anim: AnimKey,
    Event: EventKey,
    /**It Just have texts. */
    Text: TextKey,
    Depth: DepthKey,
    Scene: SceneKey,
    Color: ColorKey,
    Label: LabelKey,
    MASS: 100,
    ZONE: ["up", "left", "down", "right"],
    preFix: "data/attacks/",
    Item: ItemKey
};
export default Keys;
//# sourceMappingURL=keys.js.map