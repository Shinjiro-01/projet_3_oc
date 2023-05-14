
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

    gallery = document.querySelector(".modale-gallery");
    for (i = 0; i < data.length; i++) {
        let figure = document.createElement("figure");
        figure.setAttribute("data-attributes", data[i].category.id);
        figure.innerHTML =  "<img class='img-modal' src=" + data[i].imageUrl  + ">" ;
        gallery.append(figure);
        figure.classList.add("image", "column");


        let trash = document.createElement("button");
        trash.classList.add("hide");
        trash.innerText = "Suprimer";
        figure.append(trash);
        trash.setAttribute("img-id", data[i].id);
        trash.id = "delete_button";
        trash.addEventListener("click", (event) => {
        fetch('http://localhost:5678/api/works/' + event.target.getAttribute("img-id"), {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))     
            
});

    }
}

//appel de l'endpoints categories avec fetch//
load_categories('http://localhost:5678/api/categories');
async function load_categories(fname) {
    var response = await fetch(fname)
    var data =  await response.json()

    // création de la loop pour l'affichage des boutons filtres//
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

window.onload = function() {
    if (sessionStorage.getItem("token")){
        document.querySelector("#edit").classList.remove("hide");
        document.querySelector("#modifButton").classList.remove("hide");
        document.querySelector("#logout").classList.remove("hide");
        document.querySelector("#logBtn").classList.add("hide");
    }

  };

   document.getElementById("logout").addEventListener("click", function () {
    sessionStorage.clear(); 
    location.href = "index.html";
  });



  


//Partie fenêtre modale
//Fonction pour ouvrir la modale
const openModale = function (e) {
  e.preventDefault();
  modale = document.getElementById("sect-modale");
  modale.style.display = "flex";
  modale.addEventListener("click", closeModale);
  modale.querySelector("#cross").addEventListener("click", closeModale);
  modale.querySelector(".modale").addEventListener("click", stopPropagation);
};
//Fonction pour fermer la modale
const closeModale = function (e) {
  e.preventDefault();
  modale.style.display = "none";
  modale.removeEventListener("click", closeModale);
  modale.querySelector("#cross").removeEventListener("click", closeModale);
  modale.querySelector(".modale").removeEventListener("click", stopPropagation);
  removeImg();
};
//pour stopper la propagation de l'événement vers les éléments parents
const stopPropagation= function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".modifier").forEach(a => {
  a.addEventListener("click", openModale);
});

//Fonction pour créer les cartes de la galerie dans la modale
function createModaleCard (article) {
  for (let i = 0; i < article.length; i++){
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = article[i].imageUrl;
      imageElement.setAttribute("crossorigin", "anonymous"); //(pour le bug)
      imageElement.setAttribute("alt", article[i].title);
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid", "fa-trash", "icone", "trash");
      const arrowMoveIcon = document.createElement("i");
      arrowMoveIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right", "icone", "arrow");
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.innerText = "éditer";
      figureElement.setAttribute("data-id", article[i].id);
      //DOM pour rattacher les éléments au html
      document.querySelector(".modale-gallery").appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(figcaptionElement);
      figureElement.appendChild(trashIcon);
      figureElement.appendChild(arrowMoveIcon);
  }
};

//Fonction pour interchanger de modale
const addPhotoButton = document.getElementById("bouton-ajouter");
addPhotoButton.addEventListener("click", function() {
  switchModaleView(true);
});
const backModaleArrow = document.getElementById("arrow");
backModaleArrow.addEventListener("click", function() {
  switchModaleView(false);
  removeImg();
});

function switchModaleView(isListeView) {
  const firstModale = document.getElementById("first-modale");
  const secondModale = document.getElementById("second-modale");
  if(isListeView) {
      secondModale.style.display = "flex"; 
      firstModale.style.display = "none";
      backModaleArrow.style.visibility = "visible";
  }else{
      secondModale.style.display = "none";
      firstModale.style.display = "flex";
      backModaleArrow.style.visibility = "hidden";
  }
};


//Partie pour ajouter une image dans la galerie
const newImage = document.getElementById("bouton-search");
const newImagePreview = document.getElementById("image-preview");
const newObjetImage = document.getElementById("objet");
const newTitleImage = document.getElementById("title-image");
const validButton = document.getElementById("bouton-valider");
//Fonction pour selectionner l'image
newImage.addEventListener("change", function() {
  const selectedFile = newImage.files[0];
  if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      const img = document.createElement("img");
      img.src = imgUrl;
      newImagePreview.innerHTML = "";
      newImagePreview.appendChild(img);
      //supprime les autres éléments pour qu'il n'y ait que l'image
      const sendImage = document.getElementsByClassName("send-image");
      Array.from(sendImage).forEach(e => {e.style.display = "none"});
      updateButtonColor();
  }
});

//Fonction du changement de couleur du bouton valider quand image et titre sont présents
function updateButtonColor() {
  if(newTitleImage.value != "" && newImagePreview.firstChild) {
      validButton.style.backgroundColor = "#1D6154";
  }else{
      validButton.style.backgroundColor = "";
  }
};
newTitleImage.addEventListener("input", updateButtonColor)

//Fonction pour "réinitialiser" image + titre + alertes quand on quitte/change la modale   
function removeImg() {
  newTitleImage.value = "";
  const sendImage = document.getElementsByClassName("send-image");
  const img = newImagePreview.querySelector("img");
  Array.from(sendImage).forEach(e => {e.style.display = "block"});
  if(img) {newImagePreview.removeChild(img)}
  const addImageError = document.getElementById("add-image-error");
  addImageError.style.display = "none";
};

validButton.addEventListener("click", (e) => {
  e.preventDefault();
  const addImageError = document.getElementById("add-image-error");
  addImageError.style.display = "flex";
  addImageError.style.color = "red";
  // Vérifie si le champ du titre est vide
  if (newTitleImage.value === "") {
      addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Titre manquant`;
      return;
  }
  //Vérifie si le champ image est vide
  if (!newImagePreview.firstChild) {
       addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Image manquante`;
      return;
  }
  //Vérifie la taille de l'image
  const maxSize = 4 * 1024 * 1024; // 4 Mo en bytes
  const selectedFile = newImage.files[0];
  if (selectedFile.size > maxSize) {
      addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Taille image supérieur à 4Mo`;
      return;
  }
  updateButtonColor();

  //Création de formData pour envoyer les données de la nouvelle image
  const formData = new FormData();
  formData.append("image", newImage.files[0]);
  formData.append("title", newTitleImage.value);
  formData.append("category", newObjetImage.value);

  fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {"Authorization": `Bearer ${token}`},
      body: formData,
  })
  .then(response => {
      if (!response.ok) {
      throw new Error("Erreur de la requête");
      }
  })
  .then(data => {
      const addImageOk = document.getElementById("add-image-error");
      addImageOk.innerHTML = `<i class="fa-solid fa-circle-check"></i> Image ajoutée avec succès !`;
      addImageOk.style.color = "green";
      dynamicCard();
  })
  .catch(error => {
      console.error("Erreur", error);
       addImageError.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Erreur lors de l'ajout de l'image`;
  })
});


//Partie pour supprimer une image de la galerie (au click de la poubelle)
function clickTrash() {
const gallery = document.querySelector(".modale-gallery");
gallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    const figure = e.target.closest("figure");
    const dataId = figure.getAttribute("data-id");
      confirmDelete(figure, dataId);
  }
})
};

//Fonctions pour confirmer/annuler la suppression d'une photo
function confirmDelete(figure, dataId) {
  const confirmDelete = document.getElementById("third-modale");
  confirmDelete.style.display = "flex";
  const confirmNo = document.getElementById("confirm-no");
  confirmNo.addEventListener("click", confirmNoClick);
  const confirmYes = document.getElementById("confirm-yes");
  confirmYes.addEventListener("click", confirmYesClick);
  
  function confirmNoClick() {
      confirmNo.removeEventListener("click", confirmNoClick);
      confirmYes.removeEventListener("click", confirmYesClick);
      confirmDelete.style.display = "none";
  }
  function confirmYesClick() {
      confirmNo.removeEventListener("click", confirmNoClick);
      confirmYes.removeEventListener("click", confirmYesClick);
      confirmDelete.style.display = "none";
      deleteImage(dataId);
      figure.remove();
  }
};

function deleteImage(id) {
fetch(`http://localhost:5678/api/works/${id}`, {
  method: "DELETE",
  headers: { "Authorization": `Bearer ${token}` }
})
  .then(response => {
    if (response.ok) {
      dynamicCard();
    } else {
      alert("Erreur lors de la suppression de l'image");
    }
  })
};

//Fonction qui met à jour la galerie de manière dynamique à chaque ajout/suppression d'image
function dynamicCard() {
  fetch(`http://localhost:5678/api/works`)
  .then((response) => {
      if(response.ok) {
          document.querySelector(".gallery").innerHTML = "";
          document.querySelector(".modale-gallery").innerHTML = "";
          fetchCard();
      }
  })
};