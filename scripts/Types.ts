
import Keys from "./keys.js";
import setTween from "./scene/battlescene/setTween.js";
/**add readonly at all. */
export type AllReadonly<P> = {
    readonly [K in keyof P]: P[K] extends object ? AllReadonly<P[K]> : P[K]
};
/**simple vector2 */
export type Pos2 = {
    x: number;
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
/**
 * 0 is white,1 is blue and 2 is orange.
 */
export type bulletColor = "white" | "blue" | "orange" | 0 | 1 | 2;
export type detectKeysConfig = {
    type?: "down" | "up";
    /** is any key just up or down? */
    just?: boolean;
};


export type MinMaxRnd = {
    /**
     * @default false
     */
    add: boolean;
    /**
     * @default false
     */
    integer?: boolean;
    /**
     * @default 0
     */
    min?: number;
    max: number;
};
export type stepTypes = MinMaxRnd | number;

export type jsonFile = `${ string }.json`;
export type BattleStartConfig = {
    Phase1: jsonFile[];
    Phase1RND: jsonFile[];
    Phase2: jsonFile[];
    Phase2RND: jsonFile[];
    /**
     * is playing single mode?
     */
    single?: boolean;
    /**
     * choose attack's data.
     */
    singleAttack?: jsonFile;
    settings?: {
        /**
         * take damage lowered.
         */
        easyMode?: boolean;
        infHP?: boolean;
        /**
         * items cannot disappear.
         */
        infItem?: boolean;
        /**start at phase2.*/
        phase2?: boolean;
        practice?: boolean;
        noKr?: boolean;
        ignoreKr?: boolean;
    };
};
/**
 * matter sprite.
 */
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
    /**is this heal called by debug?
     * @default false
     */
    debug?: boolean;
};

/**
 * attack config.
 */
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
    //play or stop sound.
    "audio" |
    "platform" |
    "effect" |
    // end Enemy turn.
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
    /**
     * is player winning?
     * @default false
     */
    win?: boolean;
    setSansVisual?: SansVisualConfig | false;
};


export type MultiConfig = {
    /**
     * @default 5
     */
    count?: number;
    /**
     * @default 0
     */
    delay?: number;
    startAt?: number;
    step?: any;
};


export type combatzoneType = "setRect" | "getPos" | "getPosition" | "tweenRect";
/**
 * detect zones.
 */
export type getZone = {
    /**
     * @default "main"
    */
    zone?: string;
};
export type SetRectConfig = Partial<Pos2> & getZone & {
    /**
     * @default 0
     */
    relPointX?: number;
    /**
    * @default 0
    */
    relPointY?: number;
    /**
    * @default dx
    */
    dx?: number;
    /**
    * @default dy
    */
    dy?: number;
    /**
    * in ms.
    * @default 1000
    */
    duration?: number;
    ease?: Phaser.Types.Tweens.TweenBuilderConfig["ease"];
    /**is set instant?
     * @default false
     */
    inst?: boolean;
};
export type TweenRectConfig = getZone & {
    tween: Parameters<typeof setTween>[2];
};
/**return number */
export type getCombatzonePos = getZone & {
    /**
    * @default false
    */
    left?: string | false;
    /**
    * @default false
    */
    right?: string | false;
    /**
    * @default false
    */
    bottom?: string | false;
    /**
    * @default false
    */
    top?: string | false;
    /**
    * @default false
    */
    centerX?: string | false;
    /**
    * @default false
    */
    centerY?: string | false;
    /**
    * @default false
    */
    width?: string | false;
    /**
    * @default false
    */
    height?: string | false;
};
export type combatZoneConfig = SetRectConfig | getCombatzonePos | TweenRectConfig;
export type BoneType =
    "addSingle" |
    "addMulti" |
    "addGap" |
    "addStab" |
    "addSine" |
    "addCircle";
export type BoneConfig = Partial<Pos2> & {
    /**
     * in pixels.
     * @default  0 
    */
    speed?: number;
    /**
     * in degrees.
     * @default  0
    */
    speedAngle?: number;
    /**
     * in pixels.
     * @default  12
    */
    length?: number,
    /**
     * in degrees.
     * @default 0
     */
    angle?: number,
    /**
     * in degrees. clockwise.
     * @default 0
    */
    spin?: number;
    /**
     * can see outside of combatzone.
     * @default false
    */
    visible?: boolean;
    /**
     * in ms.
     * @default false
    */
    lifetime?: number | false;
    anchor?: Anchor;
    /**
     * used for tween. 
     * @default "middle"
    */
    tweenAnchor?: "top" | "middle" | "bottom";
    /**
     * Phaser tween. can multiple.
     * @default false
     */
    tween?: Parameters<typeof setTween>[2] | false;
    /** 
     * @default false
     */
    deleteTween?: {
        tween?: "inst" |
        "smallerTop" |
        "smallerMiddle" |
        "smallerBottom";
        effect?: "inst" | "disappear";
        duration?: number;
    } | false;
    /** 
     * @default false
     */
    spawnTween?: {
        tween?: "inst" |
        "biggerTop" |
        "biggerMiddle" |
        "biggerBottom";
        effect?: "inst" | "appear";
        duration?: number;
    } | false;
    /** 
     * @default "white"
     */
    color?: bulletColor;
    /** 
    * @default false
    */
    sound?: PlayConfig["sound"] | false;
};
export type MultiBoneConfig = BoneConfig & MultiConfig;
export type SineBoneConfig = Partial<Pos2> & {
    /**
     * in pixels.
     * @default 0
     */
    speed?: number;
    /**
     * in degrees.
    * @default 0
    */
    speedAngle?: number;
    /**
    * @default 150
    */
    length?: number;
    /**
     * in ms.
    * @default 75
    */
    interval?: number;
    /**
     * in pixels.
    * @default 30
    */
    padding?: number;
    /**
    * @default 20
    */
    count?: number;
    /**
     * in pixels.
    * @default 20
    */
    amplitude?: number;
    /**
     * in seconds.
    * @default 1
    */
    frequency?: number;
    /**
     * in degrees.
    * @default 0
    */
    angle?: number;
    /**
    * @default false
    */
    step?: SineBoneConfig | false;
    /**
     * @default "white"
     */
    color?: bulletColor;
    /**
     * in ms.
    * @default false
    */
    lifetime?: BoneConfig["lifetime"];
};
export type StabBoneConfig = getZone & {
    /**
     * @default "down"
     */
    direction?: "up" | "down" | "left" | "right";
    /**
     * in pixels.
     * @default  20
     */
    length?: number;
    /**
     * in ms.
     * @default 750
     */
    wait?: number;
    /**
     * in ms.
     * @default 1000
     */
    lifetime?: number;
    /**
     * @default false
     */
    slam?: HeartGravity | boolean;
    /**
     * @default "white"
     */
    color?: bulletColor;
    /**
    * @default false
    */
    onlyWarn?: boolean;
};
export type CircleBoneConfig = Partial<Pos2> & {
    /**
     * in pixels.
     * @default 30
     */
    spaceRadius?: number;
    /**
    * in pixels.
    * @default 30
    */
    boneRadius?: number;
    /**
     * how many bones does it has?
     * @default 4
     */
    count?: number | "single";
    /**
     * @default true
     */
    stepAngle?: boolean;
    /**
     * in degrees. 
     * @default 0
    */
    startAngle?: number;
    /**
     * in degrees. 
     * @default "equal"
    */
    padding?: number | "equal";
    /**
    * in degrees. 
    * @default 1
    */
    rotateSpeed?: number;
    /**
     * @default false
     */
    tween?: BoneConfig["tween"] | false;
    /**
     * @default false
     * @see BoneConfig
     */
    boneConfig?: BoneConfig | false;
};
export type GapBoneConfig = Partial<Pos2> & {
    /**
     * in pixels.
     * @default 100
     */
    length?: number;
    /**
     * in degrees.
     * @default 0
     */
    angle?: number;
    /**
    * in pixels.
    * @default 20
    */
    topLength?: number;
    /**
    * in pixels.
    * @default 20
    */
    padding?: number;
    /**
    * in pixels.
    * @default 0
    */
    speed?: number;
    /**
    * in degrees.
    * @default 0
    */
    speedAngle?: number;
    anchor?: Anchor;
    /**
     * @default false
     */
    tween?: BoneConfig["tween"] | false;
    /**
    * in ms.
    * @default false
    */
    lifetime?: BoneConfig["lifetime"];
};
export type BonesConfig = BoneConfig | MultiBoneConfig | StabBoneConfig | SineBoneConfig | CircleBoneConfig | GapBoneConfig;


export type BlasterType = "addSingle";
export type BlasterConfig = {
    /**
     * blaster spawn position.
     * @default 0
    */
    startX?: number;
    /**
     * blaster spawn position.
     * @default 0
    */
    startY?: number;
    /**
    * blaster spawn angle.
    * in degrees.
    * @default 0
    */
    startAngle?: number;
    /**
    * blaster move to position.
    * @default 0
   */
    endX?: number;
    /**
    * blaster move to position.
    * @default 0
   */
    endY?: number;
    /**
    * blaster rotate to angle.
    * in degrees.
    * @default 0
   */
    endAngle?: number;
    /**
     * in pixels.
     * @default 40
     */
    size?: number;
    /**
     * in ms.
     * @default 500
     */
    wait?: number;
    /**
     * in ms.
     * @default 500
     */
    blastTime?: number;
    anchor?: Anchor;
    /**
     * @default "white"
     */
    color?: bulletColor;
};
export type BlastersConfig = BlasterConfig;


export type BoxNinePatchConfig = {
    x: number;
    y: number;
    tint?: number;
    length: number;
};

export type PlatFormType = "addSingle" | "addMulti";
export type PlatFormSingleConfig = Partial<Pos2> & {
    /**
     * in degrees.
     * @default 0
     */
    angle?: number;
    /**
    * in ms.
    * @default false
    */
    lifetime?: number | false;
    anchor?: Anchor;
    /**
     * in degrees.
     * @default 0
     */
    spin?: number;
    /**
    * in pixels.
    * @default 30
    */
    length?: number;
    /**
     * in pixels.
     * @default 0
     */
    speed?: number;
    /**
     * in degrees.
     * @default 0
     */
    speedAngle?: number;
    /**
     * @default false
     */
    tween?: Parameters<typeof setTween>[2] | false;
    /**
     * used for tween.
    * @default "middle"
    */
    tweenAnchor?: "left" | "middle" | "right";
    /**
     * 0 is green and 1 is purple.
     * @default "green"
     */
    color?: "purple" | "green" | 0 | 1;
    /**
     * can see outside of combatzone.
     * @default false
     */
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
    /**
     * @default false
     */
    playSound?: boolean;
};
export type SetHeartPos = {
    [k in keyof Pos2]?: number | false
} & {
    /**
     * @default false
     */
    duration?: number | false;
};
export type getHeartPos = {
    /**
     * variable name.
     * @default false
     */
    x?: string | false;
    /**
     * variable name.
     * @default false
     */
    y?: string | false;
};
export type HeartDirection = "up" | "left" | "right" | "down";
export type HeartGravity =
    {
        /**
         * @default false
         */
        direction?: HeartDirection | false;
        /**
         * @default false
         */
        slam?: boolean;
        /**
         * @default false
         */
        slamAnim?: "upSlam" | "rightSlam" | "leftSlam" | "downSlam" | boolean;
        /**
         * @default false
         */
        autoInit?: boolean;
        /**
        * @default false
        */
        color?: HeartColor | false;
        /**
        * @default false
        */
        playSound?: boolean;
        /**
        * @default false
        */
        takeDamage?: boolean;
    };
export type HeartConfig = setColor | HeartGravity | SetHeartPos | getHeartPos;


export type SansType = "setVisual" | "setPos" | "setPosition";
export type SansVisualConfig = {
    /**
     * @default "head"
     */
    target?: "head" | "torso" | "sweet" | "leg";
    /**
    * @default false
    */
    frame?:
    //head frames.
    "default" |
    "closeeye" |
    "lookleft" |
    "noeyes" |
    "wink" |
    "yelloweye" |
    "blueeye" |
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
    "addSweet" |
    "sweet1" |
    "sweet2" |
    "sweet3" | false;
    /**
    * @default false
    */
    anim?: Exclude<HeartGravity["slamAnim"], true> | "flashEye" | false;
    /**
    * @default true
    */
    visible?: boolean;
    /**
    * @default false
    */
    autoInit?: boolean;
    /**
    * @default false
    */
    state?: "stop" | "dancing" | "tired" | false;
};
export type SetPositionConfig = {
    /**
     * @default false
     */
    x?: number | false;
    /**
    * true = auto
    * @default false
    */
    y?: number | "auto" | boolean;
};
export type SansConfig = SansVisualConfig | SetPositionConfig;


export type EnemyTextType = "speech";
export type SpeechConfig = {
    text: string;
    /**
     * @default false
     */
    poses?: SansVisualConfig | false;
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
    /**
     * @default 1
     */
    count?: number;
    /**
     * @default false
     */
    remain?: string | false;
};
export type CountOutConfig = {
    to: number | `#${ label["name"] }`;
    /**
     * @default false
     */
    rel?: boolean;
    /**
    * @default 1
    */
    count?: number;
    /**
     * @default false
     */
    once?: boolean;
};
export type RELConfig = {
    to: number | `#${ label["name"] }`;
};
export type RELCountConfig = RELConfig & {
    /**
     * @default 1
     */
    count?: number;
    /**
     * @default false
     */
    remain?: string | false;
};
export type RNDJumpConfig = {
    to: (number | `#${ label["name"] }`)[];
    /**
     * @default false
     */
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
    /**
     * @default 0
     */
    valueB?: number;
    /**
     * @default false
     */
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
/**
 * A+B.
 */
export type AddConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
/**
 * A-B.
 */
export type SubConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
/**
 * A*B.
 */
export type MulConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
/**
 * A/B.
 */
export type DivConfig = {
    variable: string;
    valueA: number;
    valueB: number;
};
/**
 * A%B.
 */
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
    /**
     * @default 0
     */
    min?: number;
    max: number;
    /**
     * do min + padding and max-padding.
     * @default 0
     */
    padding?: number;
    /**
     * @default false
     */
    integer?: boolean;
};
export type RndValuesConfig = {
    variable: string;
    values: any[];
};
export type BetWeenAngle = {
    /**
     * @default 0
     */
    fromX?: number;
    /**
     * @default 0
     */
    fromY?: number;
    /**
     * @default 0
     */
    toX?: number;
    /**
     * @default 0
     */
    toY?: number;
    angle: string;
    /**
    * @default false
    */
    isRadian?: boolean;
};
export type RotateConfig = {
    /**
     * @default 0
     */
    pointX?: number;
    /**
     * @default 0
     */
    pointY?: number;
    /**
     * @default 0
     */
    originX?: number;
    /**
     * @default 0
     */
    originY?: number;
    /**
     * in degrees.
     */
    angle: number;
    /**
     * @default false
     */
    x?: string | false;
    /**
     * @default false
     */
    y?: string | false;
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
    /**
     * in ms.
     * @default 350
     */
    duration?: number;
    /**
     * @default "flash"
     */
    sound?: keyof typeof Keys.Audio | false;
    /**
     * @default false
     */
    pause?: boolean;
    /**
     * @default false
     */
    removeAll?: boolean;
};
export type FallingConfig = {
    /**
     * @default "right"
     */
    direction?: "up" | "down" | "left" | "right";
    /**
     * in ms.
     * @default 1000
     */
    duration?: number;
    /**
     * @default false
     */
    playAnim?: boolean;
};
export type EffectConfig = FlashConfig | FallingConfig;