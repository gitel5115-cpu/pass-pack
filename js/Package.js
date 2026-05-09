class Package extends Component {
    constructor(_message, _source, _addressee, _packNum, x) {
        super(30, 30, x)
        this.message = _message;
        this.source = _source;
        this.addressee = _addressee;
        this.isValid=true;
        this.speedXRight = 1;
        this.speedXLeft = -1;
        this.packNum = _packNum;
        this.newPos = function (flag) {
            if (flag)
                this.x += this.speedXRight;
            else
                this.x += this.speedXLeft;
        }
        this.y;
    }
    update () {
        let ctx = myGameArea.context;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    yCalc() {
        
        if (this.packNum == 1)
            this.y = 117.5;
        else if (this.packNum == 2)
            this.y = 157.5;
        else if (this.packNum == 3)
            this.y = 412.5;
        else 
           this.y = 452.5;
    }
}