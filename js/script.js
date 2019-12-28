const results = document.querySelector('.results');
const addForm = document.getElementById('add-form');
const buttonAddItem = document.getElementById('add-item');
const searchRes = document.querySelector('#searchResults');

// массив данних
const data = JSON.parse(localStorage.getItem('freeItems')) || [
    {
        id: 1,
        title: 'Software Engineering',
        body: 'Software Engineering is an art if developing software'
    },
    {
        id: 2,
        title: 'Software Engineering',
        body: 'Software Engineering is an art if developing software'
    },
    {
        id: 3,
        title: 'Software Engineering',
        body: 'Software Engineering is an art if developing software'
    }
] || [];



buttonAddItem.addEventListener('click', addItem); // Кнопка добавлення данних
searchRes.addEventListener('keyup', searchData) // Пошук данних

init();

// Ініціалізація обєкта данних та виведення в документ
function init() {
    let resultHTML = '';
    data.forEach((result, index) => {
        resultHTML += createResult(result);
        results.innerHTML = resultHTML;
    })
}

function toStorage() {
    localStorage.setItem('freeItems', JSON.stringify(data));
}


// Добавлення данних з форми та запис в обєкт
function addItem(event) {
    event.preventDefault();

    let title = document.querySelector('input[name="title"]').value;
    let body = document.querySelector('textarea[name="body"]').value;

    const newItem = {
        id: new Date().getTime(),
        title: title,
        body: body,
    }

    let div = document.createElement('div');
    let className = document.createAttribute('class');
    let eid = document.createAttribute('eid')
    className.value = 'result';
    eid.value = newItem.id;
    div.setAttributeNode(className);
    div.setAttributeNode(eid);

    div.innerHTML = `
        <h1>${newItem.title}</h1>
        <p>${newItem.body}</p>
        <button onclick="removeItem(this)">x</button>
    `

    results.appendChild(div);
    console.log(div)

    data.push(newItem);
    toStorage();
    addForm.reset();
    console.log(newItem)
};

// Видалення елемента із документа
function removeItem(element) {
   const item = element.parentElement;
   const eid = item.getAttribute('eid');

   data.forEach((result, index) => {
       if(eid == result.id) {
           data.splice(index, 1);
       }
   })
   item.remove();
   toStorage();
};

// Пошук схожих значеннь в массиві
function searchData() {
    const keyword = document.querySelector('input[name="search"]').value;

    let resultHTML = '';
    
    data.forEach((result, index) => {
        if(result.title.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1) {
            resultHTML += createResult(result);
        }
    });

    results.innerHTML = resultHTML;
};

function createResult(result) {
    return `<div class="result" eid="${result.id}">
                <h1>${result.title}</h1>
                <p>${result.body}</p>
                <button onclick="removeItem(this)">x</button>
            </div>`;
}
