window.onload = () => {
    if (document.getElementById("inregistrare") != undefined) {
        document.getElementById("inregistrare").onclick = () => { location.href = '/inregistrare'; };
    }
    if (document.getElementById("logout") != undefined) {
        document.getElementById("logout").onclick = () => { location.href = '/logout'; };
    }
    var poze = document.getElementsByClassName("apasa");
    for (poza of poze) {
        poza.onclick = (e) => {
            var fundalpopup = document.createElement("div");
            fundalpopup.onclick = () => {
                document.getElementById("fundalpopup").remove();
                document.getElementById("imaginepopup").remove();
            };
            fundalpopup.id = "fundalpopup";
            document.body.appendChild(fundalpopup);
            var imaginepopup = document.createElement("div");
            imaginepopup.id = "imaginepopup";
            var poza = document.createElement("img");
            poza.src = e.target.src;
            if (!poza.src.includes("large")) {
                poza.src = e.target.src.slice(0, -4) + "large.jpg";
            }
            imaginepopup.appendChild(poza);
            document.body.appendChild(imaginepopup);
        };
    }
};

function popup(text, time = 1) {
    var fundalpopup = document.createElement("div");
    fundalpopup.id = "fundalpopup";
    document.body.appendChild(fundalpopup);
    var popup = document.createElement("div");
    popup.id = "popup";
    var mesaj = document.createElement("h1");
    mesaj.innerHTML = text;
    popup.appendChild(mesaj);
    document.body.appendChild(popup);
    var idTimeout = setTimeout(function(x) {
        document.getElementById("fundalpopup").remove();
        document.getElementById("popup").remove();
    }, time * 1000, this); 
}