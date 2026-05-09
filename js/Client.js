class Client extends Component {
    constructor(_name, _clientNum, _cable, width, height, x, y, color) {
        super(width, height, x, y)
        this.name = _name;
        this.clientNum = _clientNum;
        this.cable = _cable;
        this.clientPackArr = [];
        this.color=color;
    }

    update() {
        let ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y - 20, this.width, this.height);
        if (this.clientPackArr.length > 0) {
            ctx.fillStyle = "black";
            let txt = `from: ${this.clientPackArr[0].source} | message:${this.clientPackArr[0].message}`;
            this.printAt(ctx, txt, this.x + 5, this.y, 20, this.width - 10);
        }
    }
    
    crashWith(otherobj) {
        let myRight = this.x + this.width - 30;
        let otherLeft = otherobj.x;
        let crash = true;
        if (myRight < otherLeft)
            crash = false;
        return crash;
    }

    insertsDetailsIntoPackage() {
        let message = document.getElementById(`client${this.clientNum}`).value;
        let addressee = document.getElementById(`inputTo${this.clientNum}`).value;
        let source = `client${this.clientNum}`;
        let pack = new Package(message, source, addressee, this.clientNum, 210);// The client creates a package.
        pack.yCalc();
        document.getElementById(`client${this.clientNum}`).value = "";
        document.getElementById(`inputTo${this.clientNum}`).value = "";
        this.passesPackageToCable(pack);
    }

    passesPackageToCable(pack) {
        if (this.cable.getIsActive()) {
            let checkCable = setInterval(() => {
                if (!this.cable.getIsActive()) {
                    this.send(pack);
                    clearInterval(checkCable);
                }
            }, 10)
        }
        else {
            this.send(pack);
        }
    }

    send(pack) {
        this.cable.setPackageRight(pack);
        this.cable.setIsActive(1);
        this.cable.moveRight();
    }

    printAt(context, text, x, y, lineHeight, fitWidth) {
        fitWidth = fitWidth || 0;

        if (fitWidth <= 0) {
            context.fillText(text, x, y);
            return;
        }

        for (var idx = 1; idx <= text.length; idx++) {
            var str = text.substr(0, idx);
            if (context.measureText(str).width > fitWidth) {
                context.fillText(text.substr(0, idx - 1), x, y);
                this.printAt(context, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
                return;
            }
        }
        context.fillText(text, x, y);
    }
}