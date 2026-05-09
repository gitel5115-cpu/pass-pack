class Server extends Component {
    constructor(_cable1, _cable2, width, height, x, y, color) {
        super(width, height, x, y, color);
        this.cable1 = _cable1;
        this.cable2 = _cable2;
        this.packArr = [];

        this.update = function () {
            this.updateVisual();
        }

        this.crashWith = function (otherobj) {
            return (otherobj.x + otherobj.width) >= this.x;
        }
    }

    pushPackIntoArr(pack) {
        if (pack.addressee >= 1 && pack.addressee <= 4) {
            this.packArr.push(pack);
        } else {
            alert("This addressee does not exist, please try again.");
            pack.isValid = 0;
            pack.element.remove();
        }
    }

    checkAddressee(currentPackage) {
    let addressee = currentPackage.addressee;
    let targetCable = (addressee < 3) ? this.cable1 : this.cable2;

    // השרת ממתין עד שהכבל המיועד יהיה פנוי
    let waitForCable = setInterval(() => {
        if (!targetCable.getIsActive()) {
            clearInterval(waitForCable);
            if (currentPackage.isValid) {
                targetCable.setPackageLeft(currentPackage);
            }
        } else {
            console.log(`Server waiting for cable to client ${addressee}...`);
        }
    }, 20);
}
}