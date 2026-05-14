class Package extends Component {
    constructor(_message, _source, _addressee, _packNum, x, color = "orange") {
        super(20, 20, x, 0, color);
        this.message = _message;
        this.source = _source;
        this.addressee = _addressee;
        this.packNum = _packNum;
        this.speedXRight = 2;
        this.speedXLeft = -2;
    }

    yCalc() {
        if (this.packNum <= 2) {
            this.y = 95;
        } else {
            this.y = 395;
        }
        this.updateVisual();
    }

    newPos(flag) {
        if (flag) {
            this.x += this.speedXRight;
        } else {
            this.x += this.speedXLeft;
        }
        this.updateVisual();
    }
}