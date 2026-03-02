const urlApi = "http://localhost:8080"
const bouton = document.getElementById('bouton')

function getSneakers(){
    fetch(`${urlApi}/sneakers`)
    .then(response => {
          return response.json() 
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
}

bouton.addEventListener('click', getSneakers)