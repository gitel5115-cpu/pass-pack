let cable1, cable2;
let server;
let myClients = [];

window.onload = () => {
    let sendBtns = document.getElementsByTagName("button");
    for (let i = 0; i < sendBtns.length; i++) {
        sendBtns[i].addEventListener("click", () => {
            myClients[i].insertsDetailsIntoPackage();
        }, false);
    }
    startsWorking();
};

let myGameArea = {
    start: function () {
        setInterval(refreshFrame, 20);
    }
}

function refreshFrame() {
    myClients.forEach(element => element.update());
    if (cable1) cable1.update();
    if (cable2) cable2.update();
    if (server) server.update();
}
function startsWorking() {
    const container = document.getElementById('game-container');
    if (container) container.innerHTML = '';
    cable1 = new Cable(400, 10, 210, 100, "lightseagreen");
    cable2 = new Cable(400, 10, 210, 400, "lightseagreen");
    server = new Server(cable1, cable2, 100, 580, 600, 10, "lightgrey");

    myClients = [
        new Client("client1", 1, cable1, 200, 80, 10, 20, "rgb(184, 228, 230)"),
        new Client("client2", 2, cable1, 200, 80, 10, 110, "rgb(184, 228, 230)"),
        new Client("client3", 3, cable2, 200, 80, 10, 320, "rgb(184, 228, 230)"),
        new Client("client4", 4, cable2, 200, 80, 10, 410, "rgb(184, 228, 230)")
    ];

    myGameArea.start();
}