class Cable extends Component {
    constructor(width, height, x, y, color) {
        super(width, height, x, y, color); 
        this.packageRight = null;
        this.packageLeft = null;
        this.isActive = 0;
        this.finishedLeft = 0;
        this.finishedRight = 0;
    }

    update() {
        this.updateVisual(); 
    }
    
    getIsActive() { return this.isActive; }
    setIsActive(_isActive) { this.isActive = _isActive; }

    passPackToServer() {
        server.pushPackIntoArr(this.packageRight);
    }

    passPackToClient() {
        myClients[this.packageLeft.packNum - 1].clientPackArr.push(this.packageLeft);
    }
setPackageLeft(_packageLeft) {
    this.packageLeft = _packageLeft;
    server.packArr.shift();
    this.packageLeft.packNum = this.packageLeft.addressee;
    this.packageLeft.yCalc(); // מחשב את ה-Y החדש לפי הלקוח אליו היא חוזרת
    this.packageLeft.setX(server.x - 30); // מתחילה צמוד לשרת
    
    // מוודא שהחבילה מעל הכבל מבחינת שכבות
    this.packageLeft.element.style.zIndex = "100";
    this.packageLeft.updateVisual();
    
    this.setIsActive(1);
    this.moveLeft();
}

    moveLeft() {
        this.finishedLeft = 0;
        this.leftInterval = setInterval(() => {
            this.movesPackageLeft(); 
            if (this.finishedLeft) clearInterval(this.leftInterval);
        }, 10);
    }
movesPackageLeft() {
    if (myClients[this.packageLeft.packNum - 1].crashWith(this.packageLeft)) {
        this.finishedLeft = 1;
        this.setIsActive(0);
        this.passPackToClient();
        
        // כאן הקסם: מוחקים את החבילה מהמסך
        this.packageLeft.remove(); 
        return;
    }
    this.packageLeft.newPos(0); 
}

    setPackageRight(_packageRight) {
        this.packageRight = _packageRight;
    }

    moveRight() {
        this.finishedRight = 0;
        this.rightInterval = setInterval(() => {
            this.movesPackageRight();
            if (this.finishedRight) {
                clearInterval(this.rightInterval);
                server.checkAddressee(this.packageRight);
            }
        }, 10);
    }

    movesPackageRight() {
        if (server.crashWith(this.packageRight)) {
            this.finishedRight = 1;
            this.setIsActive(0);
            this.passPackToServer();
            return;
        }
        this.packageRight.newPos(1);
    }
}