class Client extends Component {
    constructor(_name, _clientNum, _cable, width, height, x, y, color) {
        super(width, height, x, y, color);
        this.name = _name;
        this.clientNum = _clientNum;
        this.cable = _cable;
        this.clientPackArr = [];
    }

    update() {
        this.updateVisual();
        if (this.clientPackArr.length > 0) {
            let p = this.clientPackArr[this.clientPackArr.length - 1];
            this.element.innerText = `From: ${p.source}\nMsg: ${p.message}`;
            this.element.style.display = "flex";
            this.element.style.alignItems = "center";
            this.element.style.justifyContent = "center";
            this.element.style.textAlign = "center";
            this.element.style.fontSize = "12px";
            this.element.style.fontWeight = "bold";
            this.element.style.color = "black";
        }
    }

    crashWith(otherobj) {
        return otherobj.x <= (this.x + this.width);
    }
    insertsDetailsIntoPackage() {
        let msg = document.getElementById(`client${this.clientNum}`).value;
        let to = parseInt(document.getElementById(`inputTo${this.clientNum}`).value);
        if (!msg || isNaN(to)) return;

        let pack = new Package(msg, `Client ${this.clientNum}`, to, this.clientNum, this.x + this.width);
        pack.yCalc();

        document.getElementById(`client${this.clientNum}`).value = "";
        document.getElementById(`inputTo${this.clientNum}`).value = "";

        let wait = setInterval(() => {
            if (this.cable.tryLock()) {
                clearInterval(wait);
                this.cable.sendRight(pack);
            }
        }, 50);
    }

    crashWith(obj) { return obj.x <= (this.x + this.width); }
}