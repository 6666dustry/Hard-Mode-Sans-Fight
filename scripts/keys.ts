enum SceneKey {
    battleScene = "battleScene",
    mainMenu = "mainMenu",
    gameOver = "gameOver",
    singleSelect = "singleSelect",
    setting = "setting",
    pause = "pauseScene"
}
enum ImageKey {
    heart = "heart",
    block = "whiteBlock",
    target = "target",
    HPfont = "HPfont",
    KRfont = "KRfont",
    bone = "sansBone",
    particleBone = "particleBone",
    break = "brakedHeart",
    speech = "speechBubble",
}
enum SpriteSheetKey {
    fight = "fight",
    act = "act",
    item = "item",
    mercy = "mercy",
    tagBar = "targetBar",
    attacked = "playerAttacked",
    sansHead = "sansHead",
    sansTorso = "sansTorso",
    sansLeg = "sansLeg",
    sansSweet = "sansSweet",
    shard = "heartShard",
    blaster = "gasterBlaster",
    platForm = "platForm1",
}
enum AudioKey {
    battleText = "battleTextSound",
    sansText = "sansTextSound",
    cursor = "cursorSound",
    select = "selectSound",
    fight = "playerFight",
    heal = "playerHeal",
    damage = "playerDamage",
    shatter = "heartShatterSound",
    split = "heartSplitSound",
    BGM = "backGroundMusic",
    blast0 = "gasterBlasterBlast0",
    blast1 = "gasterBlasterBlast1",
    blaster = "gasterBlasterSound",
    slam = "sansSlamSound",
    warning = "warningSound",
    boneStab = "boneStabSound",
    ding = "dingSound",
    flash = "flashSound"
}
enum JsonKey {
    attackProto = "attack",
    attack = "attackPlayOrder"
}
enum AnimKey {
    barFlash = "attackBarFlash",
    attacking = "playerAttacking",
    blastStart = "gasterBlastStart",
    blasting = "gasterBlasting",
    downSlam = "sansDownSlam",
    leftSlam = "sansLeftSlam",
    flashEyes = "sansFlashEyes"
}
enum EventKey {
    endTurn = "endPlayerTurn",
    endRoll = "endTextRoll",
}
//is it key?
enum TextKey {
    batTime = "* You feel like you're going to\n have a bad time",
    resting = "* sans is taking a break."
}
let depthValue: number = 0;
enum DepthKey {
    backGround = depthValue,
    command = ++depthValue,
    sans = depthValue,
    sansText = depthValue,
    statuses = depthValue,
    combatDisplay = ++depthValue,
    combatzone = ++depthValue,

    bone = ++depthValue,
    platform = depthValue,
    blaster = depthValue,
    heart = ++depthValue,

    debug = ++depthValue,
}
enum ColorKey {
    white = 0xffffff,
    blue = 0x00ccff,
    orange = 0xffb000,
    green = 0x00aa00,
    purple = 0xff00ff
}
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
} as const;
enum LabelKey {
    up = "up",
    down = "down",
    right = "right",
    left = "left",
    platform = "platform",
    heart = "heart"
}

const Keys: {
    readonly Image: typeof ImageKey,
    readonly Sheet: typeof SpriteSheetKey,
    readonly Audio: typeof AudioKey,
    readonly Json: typeof JsonKey,
    readonly Anim: typeof AnimKey,
    readonly Event: typeof EventKey,
    readonly Text: typeof TextKey,
    readonly Depth: typeof DepthKey,
    readonly Scene: typeof SceneKey;
    readonly Color: typeof ColorKey,
    readonly Label: typeof LabelKey;
    readonly Item: typeof ItemKey;
    readonly MASS: 100,
    readonly ZONE: readonly ["up", "left", "down", "right"];
    readonly preFix: "data/attacks/";
}
    = {
    Image: ImageKey,
    Sheet: SpriteSheetKey,
    Audio: AudioKey,
    Json: JsonKey,
    Anim: AnimKey,
    Event: EventKey,
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