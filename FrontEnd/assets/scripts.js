
                    //appel de l'API avec fetch//
load_gallery('http://localhost:5678/api/works');
async function load_gallery(fname) {
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

 load_categories('http://localhost:5678/api/categories');
 async function load_categories(fname) {
     var response = await fetch(fname)
     var data =  await response.json()
 
     filter = document.querySelector(".filtres");
     for (j = 0; j < data.length; j++) {
         let button = document.createElement("button");
         button.id = data[j].id;
         button.classList.add("filter_button");
         button.appendChild(document.createTextNode(data[j].name));  
         filter.append(button);
     }     
      }