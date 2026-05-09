class Package extends Component {
    constructor(_message, _source, _addressee, _packNum, x, color = "orange") {
        super(20, 20, x, 0, color); 
        this.message = _message;
        this.source = _source;
        this.addressee = _addressee;
        this.isValid = true;
        this.speedXRight = 1;
        this.speedXLeft = -1;
        this.packNum = _packNum;
        
        this.newPos = function (flag) {
            if (flag)
                this.x += this.speedXRight;
            else
                this.x += this.speedXLeft;
            
            this.updateVisual();
        }
    }

    update() {
        this.updateVisual();
    }
yCalc() {
    // החבילה (גובה 20) צריכה להיות בגובה 95 כדי לשבת על כבל שבגובה 100
    if (this.packNum <= 2)
        this.y = 95; 
    else 
       this.y = 395;
    
    this.updateVisual(); 
}
}