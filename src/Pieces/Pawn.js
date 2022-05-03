export default class Pawn {
    constructor(isLightColor) {
        this.isLightColor = isLightColor;
        
        this.canJump = false;
        this.svgName = 'pawn';
    }
}