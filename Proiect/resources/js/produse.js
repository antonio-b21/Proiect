function loadProd() {
    var produse = document.getElementsByClassName("produs");
    var username = document.getElementById("username");
    if (username) {
        var username = username.innerText.substring(14);
        for (var i = 0; i < produse.length; i++) {
            var produs = produse[i];
            var btn = produs.children[2].children[2];
            if (btn.nodeName == "A") {
                btn.onclick = (e) => {
                    e.preventDefault();
                    if (!e.target.classList.contains("incos")) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('PUT', '/adauga', true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        var data = JSON.stringify({ username: username, produs: parseInt(e.target.id) });
                        xhr.send(data);
                        e.target.classList.add("incos");
                        e.target.innerText = "In cos";
                        popup("Produsul a fost adaugat in cos!");
                    }
                };
            }
        }
    }
    if (localStorage.getItem("criteriu") == null) {
        localStorage.setItem("criteriu", "Popularitate");
    }

    if (document.getElementById("filtrare")) {
        document.getElementById("filtrare").onclick = () => {
            var firme = [];
            var checkboxes = document.getElementsByName("firma");
            for (var i=0; i<checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    firme.push(checkboxes[i].value);
                }
            }
            if (firme.length == 0) {
                for (var i=0; i<checkboxes.length; i++) {
                    firme.push(checkboxes[i].value);
                }
            }
            localStorage.setItem("filtre", JSON.stringify(firme));
            produse = document.getElementsByClassName("produs");
            for (produs of produse) {
                if (firme.includes(produs.classList[1]) && produs.classList.contains("ascuns") ) {
                    produs.classList.toggle("ascuns");
                }
                else if (!firme.includes(produs.classList[1]) && !produs.classList.contains("ascuns") ) {
                    produs.classList.toggle("ascuns");
                }
            }
            for (let i = 2; i <= 3; i++) {
                var nrProd = $('main>section:nth-child('+i+')>div>div').length;
                var nrProdAscunse = $('main>section:nth-child('+i+')>div>div.ascuns').length;
                if (nrProd - nrProdAscunse == 0) {
                    $('main>section:nth-child('+i+')>h2#inexistente')[0].classList = "";
                }
                else {
                    $('main>section:nth-child('+i+')>h2#inexistente')[0].classList = "ascuns";
                }
            }
            window.location = "#";
        };
    }
    if (document.getElementById("sortare")) {
        document.getElementById("sortare").onchange = () => {
            var sortare = document.getElementById("sortare");
            var criteriu = sortare.options[sortare.selectedIndex].value;
            localStorage.setItem("criteriu", criteriu);
            produse = document.getElementsByClassName("produs");
            var listaProd= Array.prototype.slice.call(produse);
            function pret(pr) { return pr.children[2].children[1].innerText; }
            if (criteriu == "Popularitate") {
                listaProd.sort((a, b) => { return (a.id - b.id); });
            }
            else if (criteriu == "PretCresc") {
                listaProd.sort((a, b) => { return (pret(a) - pret(b)); });
            }
            else if (criteriu == "PretDescresc") {
                listaProd.sort((a, b) => { return (pret(b) - pret(a)); });
            }
            var container = document.getElementsByTagName("section");
            for (let prod of listaProd) {
                if (prod.id < 16) {
                    container[0].children[2].appendChild(prod);
                }
                else {
                    container[1].children[2].appendChild(prod);
                }
            }
            window.location = "#";
        };
    }
    
    $('select[name="sortare"]').val(localStorage.getItem("criteriu")).trigger('change');
    if (localStorage.getItem("filtre") != null) {
        var firme = JSON.parse(localStorage.getItem("filtre"));
        var checkboxes = document.getElementsByName("firma");
        if (firme.length < checkboxes.length) {
            for (var i=0; i<checkboxes.length; i++) {
                if (firme.includes(checkboxes[i].value)) {
                    checkboxes[i].checked = true;
                }
                else {
                    checkboxes[i].checked = false;
                }
            }
        }
        $('button[id="filtrare"]').trigger('click');
    }
};

window.addEventListener("load", loadProd, false);
