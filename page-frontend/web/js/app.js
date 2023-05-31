import ClotheService from "../../admin/js/services/ClotheService.js";
const grid = document.querySelector('#article-container');
const inputName = document.querySelector('#input-name')


const getClothes = () => {
    fetch("http://localhost:8800/api/clothes")
    .then(res => res.json())
    .then(data => {
        printClothes(data);
    });
}

const printClothes = (clothes) => {
    grid.innerHTML = "";
    clothes.forEach(clothe => {
        grid.innerHTML += `
            <div class="card">
                <img src="${clothe.img}"></img>
                <h1>${clothe.name}</h1>
                <p>${clothe.descripcion}</p>
                <div class="precios">
                    <p> <del> ${clothe.precio * 1.20}€ </del></p>
                    <p>${clothe.precio} €</p>
                </div>
                <button>Añadir</button>
                <h2 clas="brand">${clothe.brand}</h2>
            </div>
        `;
    });
}  


const searchClothe = (event) => {
    event.preventDefault();
    
    if (inputName.value.length >= 3) {
        let nameSearch = inputName.value.toLowerCase();
        filterClothes(nameSearch);
    } else if (inputName.value.length === 0) {
        getClothes();
    }
};

const filterClothes = (nameSearch) => {
    ClotheService.searchItemByName(nameSearch)
        .then(data => {
            printClothes(data);
        })
        .catch(error => {
            console.error(error);
        });
};

function init() {
    getClothes();
    inputName.addEventListener("keyup", searchClothe);
}

init();