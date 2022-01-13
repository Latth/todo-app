// UI Vars

const form = document.querySelector('form')
const input = document.querySelector('#txtTaskName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list')
let items;

//Load items
loadItems()


//Call event listeners
eventListeners()

function eventListeners() {
    //Submit event + Add item
    form.addEventListener('submit', addNewItem)

    //Delete an item
    taskList.addEventListener('click', deleteItem)

    //Delete All items
    btnDeleteAll.addEventListener('click', deleteAllItems)
}

//load items
function loadItems() {

    items = getItemsFromLS()
    items.forEach(function (item) {
        createItem(item)
    })
}

//Get items from Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }

    return items;
}

//Set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS()
    items.push(text)
    localStorage.setItem('items', JSON.stringify(items))
}

function deleteItemFromLS(text){
    items = getItemsFromLS()
    items.forEach(function(item,index){
        if(item === text) {
            items.splice(index,1)
        }
    })
    localStorage.setItem("items", JSON.stringify(items))
}

//Create item
function createItem(text) {

    //Create li
    const li = document.createElement('li');
    li.className = "list-group-item list-group-item-secondary"
    li.appendChild(document.createTextNode(text))


    //Create a
    const a = document.createElement('a')
    a.classList = "delete-item float-end"
    a.setAttribute = "#"
    a.innerHTML = '<i class="fas fa-times"></i>'

    //Add a to li
    li.appendChild(a)

    //Add li to ul
    taskList.appendChild(li)

}


//Add new item
function addNewItem(e) {

    if (input.value === '') {
        alert("Add new item!")
    }

    //Create item
    createItem(input.value)

    //Save to LS
    setItemToLS(input.value)

    //Clear input
    input.value = ""

    e.preventDefault()
}

//Delete an item
function deleteItem(e) {


    if (e.target.className === "fas fa-times") {
        if (confirm("silmek istediğine emin misin?")) {
            e.target.parentElement.parentElement.remove()

            //Delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent)
        }
    }

    e.preventDefault()
}

//Delete all items

function deleteAllItems(e) {

    // taskList.innerHTML = ""

    if (confirm("Are you sure?")) {
        // taskList.childNodes.forEach(function(item){
        //     if(item.nodeType === 1){
        //         item.remove()
        //     }
        // })
        // taskList.innerHTML = ""
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.clear()
    }
    e.preventDefault()
}