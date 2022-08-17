
import Keys from "./keys.js";
/**add readonly at all. */
export type AllReadonly<P> = {
    readonly [K in keyof P]: P[K] extends object ? AllReadonly<P[K]> : P[K]
};
/**simple vector2 */
export type Pos2 = {
    x: number,
    y: number;
};
export type Anchor = {
    x?: number | "top" | "middle" | "bottom";
    y?: Anchor["x"];
};
export type AnchorConfig = Pos2 & {
    width: number;
    height: number;
    anchor?: Anchor;
    /**in degrees */
    angle?: number;
    origin?: {
        width?: number;
        height?: number;
    };
};
export type bulletColor = "white" | "orange" | "blue" | 0 | 1 | 2;
export type jsonFile = `${ string }.json`;
export type detectKeysConfig = {
    type?: "down" | "up";
    /** is any key just${type}? */
    just?: boolean;
};


export type MinMaxRnd = {
    /**default is false */
    add: boolean;
    /**default is false */
    integer?: boolean;
    min?: number;
    max: number;
};
export type stepTypes = MinMaxRnd;


export type BattleStartConfig = {
    Phase1: jsonFile[];
    Phase1RND: jsonFile[];
    Phase2: jsonFile[];
    Phase2RND: jsonFile[];
    single?: boolean;
    singleAttack?: jsonFile;
    settings?: {
        easyMode?: boolean;
        infHP?: boolean;
        infItem?: boolean;
        /**start at phase2? default is false */
        phase2?: boolean;
        practice?: boolean;
        noKr?: boolean;
        ignoreKr?: boolean;
    };
};
export type MatterSp = Phaser.Physics.Matter.Sprite;
export type Image = Phaser.GameObjects.Image;
export type variableName = `$${ any }`;
export type variableType = number | string | boolean;


export type ItemConfig = {
    name: string,
    /**show what player ate. */
    displayName: string,
    /**how much heal hp */
    amount: number;
    /**you can write anything! */
    description?: string;
};

export type HealConfig = {
    amount?: number;
    debug?: boolean;
};


export type SingleAttack = {
    category:
    "combatzone" | "combatZone" |
    "heart" |
    "bone" |
    "gasterblaster" |
    "blaster" |
    "sanstext" |
    "sans" |
    "jump" |
    "math" |
    /**play or stop sound. */
    "audio" |
    "platform" |
    "effect" |
    /** end Enemy turn.*/
    "endattack" | "endAttack";

    type:
    HeartType |
    BlasterType |
    SansType |
    BoneType |
    JumpsType |
    combatzoneType |
    EnemyTextType |
    GameMathType |
    PlatFormType |
    AudioType;

    data:
    HeartConfig |
    BlasterConfig |
    SansConfig |
    BonesConfig |
    JumpsConfig |
    combatZoneConfig |
    EnemyTextConfig |
    GameMathConfig |
    PlatFormConfig |
    AudioConfig |
    EndTurn;

    wait: number;
};



export type EndTurn = {
    /**0 is nothing */
    menuBone?: 0 | 1 | 2 | 3;
    win?: boolean;
    setSansVisual?: SansVisualConfig;
};


export type MultiConfig = {
    /**default is 5. */
    count?: number;
    /**default is 500ms. */
    delay?: number;
    startAt?: number;
    step?: any;
};


export type combatzoneType = "setRect" | "getPos" | "getPosition" | "tweenRect";
export type getZone = {
    /**default is "main" */
    zone?: string;
};
export type SetRectConfig = Partial<Pos2> & getZone & {
    relPointX?: number;
    relPointY?: number;
    dx?: number,
    dy?: number,
    duration?: number;
    ease?: Phaser.Types.Tweens.TweenBuilderConfig["ease"];
    /**is set instant? */
    inst?: boolean;
};
export type TweenRectConfig = getZone & {
    tween: Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenBuilderConfig[];
};
/**return number */
export type getCombatzonePos = getZone & {
    left?: string,
    right?: string;
    bottom?: string,
    top?: string,
    centerX?: string,
    centerY?: string;
    width?: string;
    height?: string;
};
export type combatZoneConfig = SetRectConfig | getCombatzonePos | TweenRectConfig;
export type BoneType =
    "addSingle" |
    "addMulti" |
    "addGap" |
    "addStab" |
    "addSine" |
    "addCircle";
export type BoneConfig = Pos2 & {
    /**default is 0, */
    speed?: number;
    /**default is 0 */
    speedAngle?: number;
    /**default is 24. */
    length?: number,
    /**default is 0. */
    angle?: number,
    /**default is 0. clockwise.*/
    spin?: number;
    /**can see outside of combatzone. default is false. */
    visible?: boolean;
    /**default is infinity. */
    lifetime?: number;
    anchor?: Anchor;
    /**used for tween. default is "middle"*/
    tweenAnchor?: "top" | "middle" | "bottom";
    /**Phaser tween. can multiple. */
    tween?: Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenBuilderConfig[];
    /** default is "inst" */
    deleteTween?: {
        tween?: "inst" |
        "smallerTop" |
        "smallerMiddle" |
        "smallerBottom";
        effect?: "inst" | "disappear";
        duration?: number;
    };
    spawnTween?: {
        tween?: "inst" |
        "biggerTop" |
        "biggerMiddle" |
        "biggerBottom";
        effect?: "inst" | "appear";
        duration?: number;
    };
    /** default is white*/
    color?: bulletColor;
    sound?: PlayConfig["sound"];
};
export type MultiBoneConfig = BoneConfig & MultiConfig;
export type SineBoneConfig = Pos2 & {
    speed?: number;
    speedAngle?: number;
    length?: number;
    interval?: number;
    padding?: number;
    count?: number;
    amplitude?: number;
    frequency?: number;
    angle?: number;
    step?: SineBoneConfig;
    /** default is white*/
    color?: bulletColor;
    lifetime?: number;
};
export type StabBoneConfig = getCombatzonePos & {
    direction: "up" | "down" | "left" | "right";
    /**default is 20 */
    length?: number;
    /**default is 750ms */
    wait?: number;
    /**default is 1000ms */
    lifetime?: number;
    /**default is false */
    slam?: HeartGravity | boolean;
    /** default is white*/
    color?: bulletColor;
    /** default is false*/
    onlyWarn: boolean;
};
export type CircleBoneConfig = Pos2 & {
    spaceRadius?: number;
    boneRadius?: number;
    count?: number | "single";
    /**default is true. */
    stepAngle?: boolean;
    /**in degrees. */
    startAngle?: number;
    /**in degrees. */
    padding?: number | "equal";
    /**in degrees. */
    rotateSpeed?: number;
    tween?: BoneConfig["tween"];
    boneConfig?: BoneConfig;
};
export type GapBoneConfig = {
    x?: number;
    y?: number;
    length?: number;
    angle?: number;
    topLength?: number;
    padding?: number;
    speed?: number;
    speedAngle?: number;
    anchor?: Anchor;
    tween?: BoneConfig["tween"];
    lifetime?: number;
};
export type BonesConfig = BoneConfig | MultiBoneConfig | StabBoneConfig | SineBoneConfig | CircleBoneConfig | GapBoneConfig;


export type BlasterType = "addSingle";
export type BlasterConfig = {
    /**default is 0 */
    startX?: number,
    /**default is 0 */
    startY?: number,
    /**default is endAngle + 180 */
    startAngle?: number;
    endX: number,
    endY: number,
    /**default is 0 */
    endAngle?: number;
    size?: number,
    wait?: number,
    blastTime?: number;
    anchor?: Anchor;
    color?: bulletColor;
};
export type BlastersConfig = BlasterConfig;


export type BoxNinePatchConfig = {
    x: number,
    y: number,
    tint?: number;
    length: number;
};

export type PlatFormType = "addSingle" | "addMulti";
export type PlatFormSingleConfig = {
    x?: number;
    y?: number;
    angle?: number;
    lifetime?: number | false;
    anchor?: Anchor;
    spin?: number;
    length?: number;
    speed?: number;
    /** in degrees default is 0.*/
    speedAngle?: number;
    tween?: Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenBuilderConfig[] | false;
    /**used for tween. default is "middle"*/
    tweenAnchor?: "left" | "middle" | "right";
    /**0 is green 1 is purple */
    color?: "purple" | "green" | 0 | 1;
    visible?: boolean;
};
export type platformMultiConfig = PlatFormSingleConfig & MultiConfig;
export type PlatFormConfig = PlatFormSingleConfig | platformMultiConfig;


export type HeartType =
    "setColor" |
    "setPosition" |
    "setPos" |
    "setG" |
    "setGravity" |
    "getPosition" |
    "getPos";
export type HeartColor = "red" | "blue" | "falling";
export type setColor = {
    color: HeartColor;
    playSound?: boolean;
};
export type SetHeartPos = Partial<Pos2> & {
    duration?: number;
};
export type getHeartPos = {
    x?: string,
    y?: string;
};
export type HeartDirection = "up" | "left" | "right" | "down";
export type HeartGravity =
    {
        /**default is undefined*/
        direction?: HeartDirection,
        /**default is undefined (false)*/
        slam?: boolean;
        /**default is undefined */
        slamAnim?: "upSlam" | "rightSlam" | "leftSlam" | "downSlam" | true;
        /**default is undefined (false)*/
        autoInit?: boolean;
        color?: HeartColor;
        playSound?: boolean;
        takeDamage?: boolean;
    };
export type HeartConfig = setColor | HeartGravity | SetHeartPos | getHeartPos;


export type SansType = "setVisual" | "setPos" | "setPosition";
export type SansVisualConfig = {
    /**default is "head" */
    target?: "head" | "torso" | "sweet" | "leg";
    frame?:
    //head frames.
    "blueeye" |
    "closeeye" |
    "default" |
    "lookleft" |
    "noeyes" |
    "wink" |
    "yelloweye" |
    "tired1" |
    "tired2" |

    //torso frames.
    "torso" |
    "shrug" |
    "torsoside1" |
    "torsoside2" |
    "torsoupside1" |
    "torsoupside2" |
    "torsoupside3" |

    //sweet frames.
    "addSweet"
    | "sweet1"
    | "sweet2" |
    "sweet3";
    anim?: HeartGravity["slamAnim"] | "flashEye";
    /**default is true */
    visible?: boolean;
    autoInit?: boolean;
    state?: "stop" | "dancing" | "tired";
};
export type SetPositionConfig = {
    x?: number;
    /**auto=true */
    y?: number | "auto" | true;
};
export type SansConfig = SansVisualConfig | SetPositionConfig;


export type EnemyTextType = "speech";
export type SpeechConfig = {
    text: string;
    poses?: SansVisualConfig;
};
export type EnemyTextConfig = SpeechConfig;


export type JumpsType =
    "label" |
    "ABS" |
    "ABSCount" |
    "REL" |
    "RELCount" |
    "RND" |
    "countOut" |
    "compare";
/**return own position. */
export type label = {
    name: string;
};
export type ABSConfig = {
    to: number | `#${ label["name"] }`;
};
export type ABSCountConfig = ABSConfig & {
    count?: number;
    remain?: string;
};
export type CountOutConfig = {
    to: number | `#${ label["name"] }`;
    rel?: boolean;
    count?: number;
    once?: boolean;
};
export type RELConfig = {
    to: number | `#${ label["name"] }`;
};
export type RELCountConfig = RELConfig & {
    count?: number;
    remain?: string;
};
export type RNDJumpConfig = {
    to: (number | `#${ label["name"] }`)[];
    rel?: boolean;
};
export type CompareConfig = {
    to: number | `#${ label["name"] }`;
    type:
    "true" |
    "false" |
    "zero" |
    "notZero" |
    "equal" |
    "=" |
    "notEqual" |
    "!=" |
    "less" |
    "<" |
    "notLess" |
    ">=" |
    "greater" |
    ">" |
    "notGreater" |
    "<=";
    valueA: number | boolean;
    valueB?: number;
    rel?: boolean;
};
export type JumpsConfig =
    label |
    ABSConfig |
    ABSCountConfig |
    RELConfig |
    RELCountConfig |
    RNDJumpConfig |
    CountOutConfig |
    CompareConfig;


export type GameMathType =
    "add" |
    "set" |
    "sub" |
    "rnd" |
    "mul" |
    "div" |
    "mod" |
    "rndValues" |
    "rotate" |
    "betWeenAngle";
export type AddConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
export type SubConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
export type MulConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
export type DivConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
export type ModConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
export type SetConfig = {
    variable: string;
    value: number;
};
export type RndConfig = {
    variable: string;
    /**default is 0. */
    min?: number;
    max: number;
    /**helper argument. do min + padding and max -padding.*/
    padding?: number;
    integer?: boolean;
};
export type RndValuesConfig = {
    variable: string;
    values: any[];
};
export type BetWeenAngle = {
    /**default is 0. */
    fromX?: number;
    /**default is 0. */
    fromY?: number;
    /**default is 0. */
    toX?: number;
    /**default is 0. */
    toY?: number;
    angle: string;
    /**default is false. */
    isRadian?: boolean;
};
export type RotateConfig = {
    pointX?: number;
    pointY?: number;
    originX?: number;
    originY?: number;
    /**in degrees */
    angle: number;
    x?: string;
    y?: string;
};
export type GameMathConfig =
    AddConfig |
    SetConfig |
    SubConfig |
    RndConfig |
    MulConfig |
    DivConfig |
    ModConfig |
    RndValuesConfig |
    RotateConfig |
    BetWeenAngle;

export type AudioType = "play" | "stop";
export type PlayConfig = {
    sound: keyof typeof Keys.Audio;
    extra?: Phaser.Types.Sound.SoundConfig | Phaser.Types.Sound.SoundMarker;
};
export type StopConfig = {
    sound: keyof typeof Keys.Audio;
};
export type AudioConfig = PlayConfig | StopConfig;


export type EffectType = "flash" | "falling";

export type FlashConfig = {
    duration?: number;
    /**default is flash. */
    sound?: keyof typeof Keys.Audio;
    pause?: boolean;
    removeAll?: boolean;
};
export type FallingConfig = {
    /**default is right */
    direction?: "up" | "down" | "left" | "right";
    /**default is 1000ms */
    duration?: number;
    playAnim?: boolean;
};
export type EffectConfig = FlashConfig | FallingConfig;