document.querySelector("#login_form").addEventListener("submit", async function(e){
  e.preventDefault();
  
  const user = {
    email: this.email.value,
    password: this.password.value,
};

const reponse = await fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
});

});

