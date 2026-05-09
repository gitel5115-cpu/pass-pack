class Server extends Component {
    constructor(_cable1, _cable2, width, height, x, y, color) {
        super(width, height, x, y)
        this.cable1 = _cable1;
        this.cable2 = _cable2;
        this.update = function () {
            let ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.crashWith = function (otherobj) {
            let myleft = this.x + 30;
            let otherright = otherobj.x + (otherobj.width);
            let crash = true;
            if (myleft > otherright)
                crash = false;
            return crash;
        }
        this.packArr = [];
    }

    pushPackIntoArr(pack) {
        if (pack.addressee == 1 || pack.addressee == 2 || pack.addressee == 3 || pack.addressee == 4)
            this.packArr.push(pack);
        else {
            alert("This addressee does not exist, please try again.");
            pack.isValid = 0;
            startsWorking();
        }
    }

    checkAddressee(currentPackage) {
        let addressee = currentPackage.addressee;
        if (addressee < 3) {
            let interval1 = setInterval(() => {
                if (!(cable1.getIsActive())) {
                    clearInterval(interval1)
                    if (currentPackage.isValid)
                        cable1.setPackageLeft(currentPackage);
                }
            }, 20)
        }
        else {
            let interval2 = setInterval(() => {
                if (!(cable2.getIsActive())) {
                    clearInterval(interval2)
                    if (currentPackage.isValid)
                        cable2.setPackageLeft(currentPackage)

                }
            }, 20)

        }
    }
}