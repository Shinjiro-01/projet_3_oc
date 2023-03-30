
//appel de l'endpoints works avec fetch//
load_gallery('http://localhost:5678/api/works');
async function load_gallery(fname) {
    var response = await fetch(fname)
    var data =  await response.json()

    // création de la loop pour l'affichage de la gallery//
    gallery = document.querySelector(".gallery");
    for (i = 0; i < data.length; i++) {
        let figure = document.createElement("figure");
        figure.setAttribute("data-attributes", data[i].category.id);
        figure.innerHTML =  "<img src=" + data[i].imageUrl  + "> <figcaption>" + data[i].title + "</figcaption>";
        gallery.append(figure);
        figure.classList.add("image");
    }
}

//appel de l'endpoints categories avec fetch//
load_categories('http://localhost:5678/api/categories');
async function load_categories(fname) {
    var response = await fetch(fname)
    var data =  await response.json()

    // création de la loop pour l'affichage des boutons//
    filter = document.querySelector(".filters");
    for (i = 0; i < data.length; i++) {
        let button = document.createElement("button");
        button.classList.add("filter_button");
        button.appendChild(document.createTextNode(data[i].name));  
        filter.append(button);
        button.setAttribute("data-categories", data[i].id);  
    }

const filterContainer = document.querySelector(".filters"),
galleryItems = document.querySelectorAll(".image");

filterContainer.addEventListener("click", (event) =>{
  if(event.target.classList.contains("filter_button")){

       // deactivate existing active 'filter-item'
       filterContainer.querySelector(".active").classList.remove("active");

       // activate new 'filter-item'
       event.target.classList.add("active");
       const filterValue = event.target.getAttribute("data-categories");
       galleryItems.forEach((item) =>{

      if(item.getAttribute("data-attributes") == filterValue || filterValue === '0'){
          item.classList.remove("hide");
           item.classList.add("show");
      }
      else{
          item.classList.remove("show");
          item.classList.add("hide");
      }
       });
  }
});

}





