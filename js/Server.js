class Server extends Component {
    constructor(_cable1, _cable2, width, height, x, y, color) {
        super(width, height, x, y, color);
        this.cable1 = _cable1;
        this.cable2 = _cable2;
        this.packArr = [];
        this.element.innerText = "SERVER";
        this.element.style.display = "flex";
        this.element.style.alignItems = "center";
        this.element.style.justifyContent = "center";
        this.element.style.fontWeight = "bold";
    }

    pushPackIntoArr(pack) {
        let sourceCable = (pack.packNum <= 2) ? this.cable1 : this.cable2;
        sourceCable.unlock();
        this.packArr.push(pack);
        this.processQueue();
    }

    processQueue() {

        if (this.packArr.length === 0) return;
        let pack = this.packArr[0];
        if (pack.addressee < 1 || pack.addressee > 4 || isNaN(pack.addressee)) {
            alert("Wrong addressee! Pack will be deleted.");
            let sourceNum = parseInt(pack.source.replace("Client ", ""));
            pack.addressee = sourceNum;
            pack.message = "ERROR: Invalid destination address!";
            pack.source = "SERVER";
        }
        let targetCable = (pack.addressee <= 2) ? this.cable1 : this.cable2;
        if (targetCable.tryLock()) {
            this.packArr.shift();
            targetCable.sendLeft(pack);
            setTimeout(() => this.processQueue(), 500);
        } else {
            setTimeout(() => this.processQueue(), 100);
        }
    }
    crashWith(obj) { return (obj.x + obj.width) >= this.x; }
}