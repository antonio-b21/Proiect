function loadProd() {
    var produse = document.getElementsByClassName("produs");
    var username = document.getElementById("username");
    if (username) {
        var username = username.innerText.substring(14);
        for (produs of produse) {
            var btn = produs.children[1].children[0].children[1];
            if (btn.nodeName == "A") {
                btn.onclick = (e) => {
                    e.preventDefault();
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', '/sterge', true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    var data = JSON.stringify({ username: username, produs: parseInt(e.target.id) });
                    xhr.send(data);
                    var tinta = document.getElementById(e.target.id);
                    var produs = tinta.parentElement.parentElement.parentElement;
                    document.getElementsByTagName("span")[0].innerText = document.getElementsByTagName("span")[0].innerText - produs.children[1].children[0].children[2].innerText/100;
                    produs.remove();
                    popup("Produsul a fost sters din cos!");
                    if (document.getElementsByTagName("section")[0].childElementCount == 2) {
                        document.getElementsByTagName("section")[0].children[1].remove();
                        document.getElementsByTagName("section")[0].innerHTML += "<h2>Cosul dumneavoastra este gol!</h2>";
                    }
                }
            }
        }
    }
}

window.addEventListener("load", loadProd, false);
