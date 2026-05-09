let cable1, cable2;
let server;
let myClients = [];

let sendBtns = document.getElementsByTagName("button");
for (let i = 0; i < 4; i++) {
    sendBtns[i].addEventListener("click", () => {
        myClients[i].insertsDetailsIntoPackage()
    }, false);
}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 700;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.getElementsByTagName('canvas')[0].className = "grid-item";
        updatesCanvas();
    }
}

function updatesCanvas() {
    myClients.forEach(element => {
        element.update();
    })
    cable1.update();
    cable2.update();
    server.update();
}

function startsWorking() {
    cable1 = new Cable( 400, 10, 210, 147.5, "lightseagreen");
    cable2 = new Cable( 400, 10, 210, 442.5, "lightseagreen");
    myClients = [new Client("client1", 1, cable1, 200, 137.5, 10, 30, "rgb(184, 228, 230)"),
    new Client("client2", 2, cable1, 200, 137.5, 10, 177.5, "rgb(184, 228, 230)"),
    new Client("client3", 3, cable2, 200, 137.5, 10, 325, "rgb(184, 228, 230)"),
    new Client("client4", 4, cable2, 200, 137.5, 10, 472.5, "rgb(184, 228, 230)")];
    server = new Server(cable1, cable2, 100, 580, 600, 10, "lightgrey");
    myGameArea.start();
}

window.onload  = startsWorking();

