import ClotheService from "../../admin/js/services/ClotheService";
const grid = document.querySelector('#article-container');
const inputName = document.querySelector('#input-name')


const getClothes = () => {
    fetch("http://localhost:8800/api/clothes")
    .then(res=>res.json())
    .then(data=>{
            printClothes(data);
        }
    );
}

const printClothes = (clothes) => {
    grid.innerHTML="";
    clothes.forEach(clothe => {
        grid.innerHTML+=`
            <div class="card">
                <img src="${clothe.img}"></img>
                <p>${clothe.name}</p>
                <div class="precios">
                    <p> <del> ${clothe.precio * 1.20}€ </del></p>
                    <p>${clothe.precio} €</p>
                </div>
                <p>${clothe.descripcion}</p>
                <button>Añadir</button>
                <h2>${clothe.brand}</h2>
            </div>
        `;
    });

    


const searchClothe = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderClothes(nameSearch);
    } else if (input.value.length == 0) {
        renderClothes();
    }
}

const renderClothes = (searchValue) => {
    listContainer.innerHTML = "";
    if (searchValue) {
        loadingObj.open();
        ClotheService.searchItemByName(searchValue)
            .then(items => {
                printClothes(items);
            }).finally(() => {
                loadingObj.close();
            });
    } else {
        loadingObj.open();
        ClotheService.getItemsList()
            .then(items => {
                printClothes(items);
            }).finally(() => {
                loadingObj.close();
            });
    }
}};

function init() {
    getClothes();
    renderClothes();
    inputName.addEventListener("keyup", searchClothe);
}
init();