nrPoze = 16;
locatiePoze = "./resurse/jpg/";
extensiePoze = ".jpg";

function incarcaPoze() {
    let sectiuni = ["barbati", "dama"];
    for (const sectiune of sectiuni) {
        var section = document.getElementById(sectiune);
        for (let i = 1; i <= nrPoze; i++) {
            var div = document.createElement("div");
            div.id = section.id[0] + i.toString();
            div.className = "produs";
            var figura = document.createElement("figure");
            var imagine = document.createElement("img");
            var id = i.toString();
            id = id.padStart(2, '0');
            imagine.src = locatiePoze + section.id + id + extensiePoze;
            imagine.alt = "rucsac" + section.id + i.toString();
            figura.appendChild(imagine);
            var descriere = document.createElement("figcaption");
            // descriere.innerText = imagine.src;
            figura.appendChild(descriere);
            div.appendChild(figura);

            section.appendChild(div);
        }
    }
}