nrPoze = 16;
locatiePoze = "./resurse/jpg/";
extensiePoze = ".jpg";

numeProduse = [
    ["", "Rucsac Heavy Tools albastru", "Rucsac Ben Sherman negru", "Rucsac Gioseppo gri", "Rucsac Ben Sherman negru stins", "Rucsac Ben Sherman gri carbune", "Rucsac Heavy Tools negru", "Rucsac Heavy Tools gri inchis", "Rucsac Napapijri verde militar", "Rucsac Pepe Jeans London scortisoara", "Rucsac Pepe Jeans London bleumarin", "Rucsac Diesel negru", "Rucsac Heavy Tools gri", "Rucsac DC negru", "Rucsac Converse negru", "Rucsac DC verde oliv", "Rucsac Converse albastru inchis"],
    ["", "Rucsac Beverly Hills Polo Club rosu inchis", "Rucsac Beverly Hills Polo Club negru", "Rucsac Beverly Hills Polo Club violet pruna", "Rucsac Antonio Moretti maro", "Rucsac Anna Morellini negru", "Rucsac Converse gri cenusa", "Rucsac DESIGUAL multicolor", "Rucsac DiAmanti negru", "Rucsac Guess gri", "Rucsac Puma gri", "Rucsac Puma albastru petrol", "Rucsac Evelyn", "Rucsac Evelyn", "Rucsac Chiara Canotti negru", "Rucsac Puma roz pal", "Rucsac Puma albastru royal"]
];

function incarcaPoze() {
    let sectiuni = ["barbati", "dama"];
    for (let categorie = 0; categorie < 2; categorie++) {
        const sectiune = sectiuni[categorie]
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
            descriere.innerText = numeProduse[categorie][i];
            figura.appendChild(descriere);
            div.appendChild(figura);

            section.appendChild(div);
        }
    }
}