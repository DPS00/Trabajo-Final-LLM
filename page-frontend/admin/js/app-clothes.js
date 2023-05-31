import ClotheService from "./services/ClotheService.js";
import CategoryService from "./services/CategoryService.js";
import Loading from "./components/Loading.js";
import { scrollToHash } from "./util.js";
const listContainer = document.querySelector('#list-container');
const selectCategory = document.querySelector('#field-category');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const btnCancel = document.querySelector('#btn-cancel');
const messageAlert = document.querySelector('#message');
const form = document.querySelector('#frm-item');
const inputSearch = document.querySelector("#input-search");
const loadingObj = new Loading("modal-message", "Loading...")
const inputName = document.querySelector('#field-name');
const inputPrecio = document.querySelector('#field-precio');

let currentClothe = null;

const newClothe = () => {
    const name = document.querySelector('#field-name').value;
    const brand = document.querySelector('#field-brand').value;
    const precio = document.querySelector('#field-precio').value;
    const descripcion = document.querySelector('#field-descripcion').value;
    const category = document.querySelector('#field-category').value;
    const img = document.querySelector('#field-image').value;
    
    const clothe = {name, brand, precio, descripcion, category, img};
    console.log("clothe", clothe);
    loadingObj.open();
    ClotheService.insert(clothe).then(data => {
        console.log("message", data);
        renderClothes();
        form.reset();
        scrollToHash("title-list");
    }).finally(() => {
        loadingObj.close();
    });
}

const actualizarClothes = (id) => {
    ClotheService.getItemById(id).then(data => {
        currentClothe = data;
        document.querySelector('#field-name').value = data.name;
        document.querySelector('#field-brand').value = data.brand;
        document.querySelector('#field-descripcion').value = data.descripcion;
        document.querySelector('#field-precio').value = data.precio;
        document.querySelector('#field-category').value = data.category;
        document.querySelector('#field-image').value = data.img;
        let option =document.querySelector(`#field-category option[value*='${data.category}']`);
        if(option) option.selected=true;
        document.querySelector('#field-descripcion').value = data.descripcion;
        
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    btnCancel.classList.replace("d-none", "d-inline");
    scrollToHash("title-form");
}

const updateClothe = () => {
    const id = currentClothe.id;
    const name = document.querySelector('#field-name').value;
    const brand = document.querySelector('#field-brand').value;
    const precio = document.querySelector('#field-precio').value;
    const descripcion = document.querySelector('#field-descripcion').value;
    const category = document.querySelector('#field-category').value;
    const img = document.querySelector('#field-image').value;
    const clothe = {id, name, brand, precio, descripcion, category, img};

    ClotheService.update(clothe).then(data => {
        currentClothe = null;
        messageAlert.textContent = data.message;
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
        renderClothes();
    });

}

const eliminarClothes = (id) => {
    ClotheService.delete(id)
        .then(data => {
            messageAlert.textContent = data.message;
            //Change state
            renderClothes();
        })
}

const populateClothes = (items) => {
    items.forEach((e, i) => {
        listContainer.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${e.name}</td>
                <td>${e.brand}</td>
                <td>${e.precio}</td>
                <td>${e.descripcion}</td>
                <td>${e.category.name}</td>
                <td class="text-center">
                    <button id="btn-delete-${e.id}" class="btn btn-danger btn-delete">Delete</button>
                    <button id="btn-edit-${e.id}" class="btn btn-info btn-edit" >Edit</button>
                </td>
            </tr>
        `;
    });

    // Buttons delete
    const buttonsDelete = document.querySelectorAll('.btn-delete');
    buttonsDelete.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            eliminarClothes(id);
        })
    });

    // Buttons Edit
    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            actualizarClothes(id);
        })
    });
}

const renderClothes = (searchValue) => {
    listContainer.innerHTML = "";
    if (searchValue) {
        loadingObj.open();
        ClotheService.searchItemByName(searchValue)
            .then(items => {
                populateClothes(items);
            }).finally(() => {
                loadingObj.close();
            });
    } else {
        loadingObj.open();
        ClotheService.getItemsList()
            .then(items => {
                populateClothes(items);
            }).finally(() => {
                loadingObj.close();
            });
    }
}
const validateForm = (event) => {
    event.preventDefault();
    // Validate each field
    if(!inputName.validity.valid) {
        alert("Nombre no válido");
        inputName.focus();
        return false;
    }
    if(!inputPrecio.validity.valid) {
        alert("Precio incorrecto");
        inputPrecio.focus();
        return false;
    }
    //Execute insert or update depends to button name 
    if (event.target.id === "btn-insert") {
        newClothe();
    } else if (event.target.id === "btn-update") {
        updateClothe();
    }else{
        console.log("id button not found in validateForm function");
    }
}

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

const renderGategoriesSelect = () => {
    selectCategory.innerHTML = "";
    loadingObj.open();
    CategoryService.getItemsList()
        .then(items => {
            items.forEach(cat => {
                selectCategory.innerHTML+=`
                    <option value="${cat.id}">${cat.name}</option>
                `;
            });
            
        }).finally(() => {
            loadingObj.close();
        });
    
}

function init() {
    renderClothes();
    btnCancel.addEventListener("click", function (e) {
        currentClothe = null;
        messageAlert.textContent = "";
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
    });

    inputSearch.addEventListener("keyup", searchClothe);
    btnInsert.addEventListener("click", validateForm);
    btnUpdate.addEventListener("click", validateForm);
    // Reiniciamos el formulario por si hay datos precargados
    form.reset();

    renderGategoriesSelect();

}

init();