
                    //appel de l'API avec fetch//
loadJSON('http://localhost:5678/api/works');
async function loadJSON(fname) {
    var response = await fetch(fname)
    var data =  await response.json()
                    // création de la loop pour l'affichage de la gallery//
    gallery = document.querySelector(".gallery");
    for (i = 0; i < data.length; i++) {
        let figure = document.createElement("figure");
        figure.innerHTML =  "<img src=" + data[i].imageUrl  + "> <figcaption>" + data[i].title + "</figcaption>";
        gallery.append(figure);

    }
    
}

