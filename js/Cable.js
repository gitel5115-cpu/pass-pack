class Cable extends Component {
    constructor(width, height, x, y, color) {
        super(width, height, x, y, color);
        this.isActive = false;
    }
    getIsActive() { return this.isActive; }
    tryLock() {
        if (this.isActive) return false;
        this.isActive = true;
        return true;
    }

    unlock() {
        this.isActive = false;
    }
    sendRight(pack) {
        let rightInterval = setInterval(() => {
            if (server.crashWith(pack)) {
                clearInterval(rightInterval);
                server.pushPackIntoArr(pack);
            } else {
                pack.newPos(1);
            }
        }, 10);
    }
    sendLeft(pack) {
        pack.packNum = pack.addressee;
        pack.yCalc();
        pack.setX(server.x - 30);
        pack.element.style.zIndex = "100";
        let leftInterval = setInterval(() => {
            let targetClient = myClients[pack.addressee - 1];
            if (targetClient.crashWith(pack)) {
                clearInterval(leftInterval);
                targetClient.clientPackArr.push(pack);
                targetClient.update();
                pack.element.remove();
                this.unlock();
            } else {
                pack.newPos(0);
            }
        }, 10);
    }
}