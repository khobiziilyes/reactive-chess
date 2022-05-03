export default class Rook {
    constructor(isLightColor) {
        this.isLightColor = isLightColor;
        
        this.canJump = false;
        this.svgName = 'rook';
    }
}