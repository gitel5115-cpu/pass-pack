class Cable extends Component {
    constructor(width, height, x, y, color) {
        super(width, height, x, y)
        this.packageRight;
        this.packageLeft;
        this.isActive = 0;
        this.finishedLeft;
        this.finishedRight;
        this.rightInterval;
        this.leftInterval;
        this.color = color;
    }

    update() {
        let ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    getIsActive() {
        return this.isActive;
    }

    setIsActive(_isActive) {
        this.isActive = _isActive;
    }

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
        this.packageLeft.yCalc();
        this.packageLeft.setX(server.x);
        updatesCanvas();
        this.packageLeft.update();
        this.setIsActive(1);
        this.moveLeft();
    }

    moveLeft() {
        this.finishedLeft = 0;
        this.leftInterval = setInterval(() => {
            this.movesPackageLeft();
            this.checkIfFinishedLeft();
        }, 10)
    }

    movesPackageLeft() {
        this.finishedLeft = 0;
        if (myClients[this.packageLeft.packNum - 1].crashWith(this.packageLeft)) {
            this.finishedLeft = 1;
            this.setIsActive(0);
            myClients[this.packageLeft.packNum - 1].clientPackArr.shift();
            this.passPackToClient(this.packageLeft);
            return;
        }
        myGameArea.context.clearRect(this.packageLeft.x + 1, this.packageLeft.y, 31, 31);
        this.packageLeft.newPos(0);
        this.packageLeft.setX(this.packageLeft.x - 1);
        updatesCanvas();
        this.packageLeft.update();
    }

    checkIfFinishedLeft() {
        if (this.finishedLeft) {
            clearInterval(this.leftInterval);
            updatesCanvas();
        }
    }

    setPackageRight(_packageRight) {
        this.packageRight = _packageRight;
    }

    moveRight() {
        this.finishedRight = 0;
        this.rightInterval = setInterval(() => {
            this.movesPackageRight();
            this.checkIfFinishedRight();
        }, 10)
    }

    movesPackageRight() {
        this.finishedRight = 0;
        if (server.crashWith(this.packageRight)) {
            this.finishedRight = 1;
            this.setIsActive(0);
            this.passPackToServer(this.packageRight);
            return;
        }
        myGameArea.context.clearRect(this.packageRight.x - 1, this.packageRight.y, 31, 31);
        this.packageRight.newPos(1);
        this.packageRight.setX(this.packageRight.x + 1);
        updatesCanvas();
        this.packageRight.update();
    }

    checkIfFinishedRight() {
        if (this.finishedRight) {
            clearInterval(this.rightInterval);
            server.checkAddressee(this.packageRight);
        }
    }
}

