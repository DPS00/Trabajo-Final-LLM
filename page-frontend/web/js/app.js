const grid = document.querySelector('#article-container');

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
}

function init() {
    getClothes();
}
init();