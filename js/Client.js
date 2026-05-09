class Client extends Component {
    constructor(_name, _clientNum, _cable, width, height, x, y, color) {
        super(width, height, x, y, color);
        this.name = _name;
        this.clientNum = _clientNum;
        this.cable = _cable;
        this.clientPackArr = [];
        this.color = color;
    }

   update() {
    this.updateVisual();
    
    if (this.clientPackArr.length > 0) {
        let p = this.clientPackArr[this.clientPackArr.length - 1];
        // עדכון הטקסט בתוך הדיב של הלקוח
        this.element.innerText = `From: ${p.source}\nMsg: ${p.message}`;
        
        // עיצוב הטקסט שיהיה קריא ובמרכז הריבוע
        this.element.style.display = "flex";
        this.element.style.alignItems = "center";
        this.element.style.justifyContent = "center";
        this.element.style.textAlign = "center";
        this.element.style.fontSize = "12px";
        this.element.style.fontWeight = "bold";
        this.element.style.padding = "5px";
    }
}
    
crashWith(otherobj) {
    // אם ה-X של החבילה קטן או שווה ל-X של סוף הלקוח
    let clientRightSide = this.x + this.width;
    return otherobj.x <= clientRightSide;
}

    insertsDetailsIntoPackage() {
        let message = document.getElementById(`client${this.clientNum}`).value;
        let addressee = document.getElementById(`inputTo${this.clientNum}`).value;
        let source = `client${this.clientNum}`;
        
        let pack = new Package(message, source, addressee, this.clientNum, 210, "orange");
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
    passesPackageToCable(pack) {
    // אם הכבל תפוס (isActive == 1)
    if (this.cable.getIsActive()) {
        console.log("Cable is busy, client waiting...");
        let checkCable = setInterval(() => {
            // ברגע שהכבל מתפנה
            if (!this.cable.getIsActive()) {
                clearInterval(checkCable); // מפסיקים את הבדיקה
                this.send(pack); // שולחים
            }
        }, 10);
    }
    else {
        // אם הכבל פנוי, שולחים מיד
        this.send(pack);
    }
}
}