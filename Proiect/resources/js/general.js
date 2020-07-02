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
    $('#popup2>button')[0].onclick = () => {
        document.getElementById("fundalpopup2").remove();
        document.getElementById("popup2").remove();
    }
};

function popup(text, time = 2) {
    var fundalpopup = document.createElement("div");
    fundalpopup.id = "fundalpopup";
    document.body.appendChild(fundalpopup);
    var popup = document.createElement("div");
    popup.id = "popup";
    var mesaj = document.createElement("h1");
    mesaj.innerHTML = text;
    popup.appendChild(mesaj);
    var buton = document.createElement("button");
    buton.innerText = "OK";
    buton.onclick = () => {
        clearInterval(idInterval);
        clearTimeout(idTimeout);
        document.getElementById("fundalpopup").remove();
        document.getElementById("popup").remove();
    }
    popup.appendChild(buton);
    document.body.appendChild(popup);
    var intervalCount = 0;
    var idInterval = setInterval(() => {
        if (!popup.style.opacity) {
            fundalpopup.style.opacity = 1;
            popup.style.opacity = 1;
        }
        if (popup.style.opacity > 0) {
            if (intervalCount >= 20) {
                fundalpopup.style.opacity -= 1 / 20;
                popup.style.opacity -= 1 / 20;
            }
        }
        else {
            clearInterval(idInterval);
        }
        intervalCount++;
    }, time / 40 * 1000)
    var idTimeout = setTimeout(() => {
        document.getElementById("fundalpopup").remove();
        document.getElementById("popup").remove();
    }, time * 1000); 
}

function popup2(text, time = 2) {
    var fundalpopup2 = document.getElementById("fundalpopup2");
    fundalpopup2.classList.toggle("ascuns");
    var popup2 = document.getElementById("popup2");
    popup2.classList.toggle("ascuns");
    $('#popup2>h1')[0].innerText = text;
    var intervalCount = 0;
    var idInterval = setInterval(() => {
        if (!popup2.style.opacity) {
            fundalpopup2.style.opacity = 1;
            popup2.style.opacity = 1;
        }
        if (popup2.style.opacity > 0) {
            if (intervalCount >= 20) {
                fundalpopup2.style.opacity -= 1 / 20;
                popup2.style.opacity -= 1 / 20;
            }
        }
        else {
            clearInterval(idInterval);
        }
        intervalCount++;
    }, time / 40 * 1000)
    var idTimeout = setTimeout(() => {
        document.getElementById("fundalpopup2").remove();
        document.getElementById("popup2").remove();
    }, time * 1000); 
}