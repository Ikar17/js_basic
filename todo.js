function addListItem(list,product){
    let item = document.createElement('li');
    item.innerText = product;
    list.appendChild(item);
}


let todoList;
let ul;

//czekam aż cały dokument załaduje się
document.addEventListener("DOMContentLoaded", () =>{

    //łapię listę z produktami
    ul = document.getElementById("todoList"); 

    //odczytuje dane z local storage
    todoList = readToDoList();
    renderList();

    //łapię formularz
    let form = document.getElementById('formTodo');

    //czekam na zdarzenie - wysłanie danych z formularza
    form.addEventListener('submit', (formData) =>{
        formData.preventDefault(); //zapobiega domyślnym ustawieniom formularza, czyli przeładowaniu strony

        //łapanie elementów formularza
        let todoName = formData.target.elements[0];
        let todoDesc = formData.target.elements[1];

        //łapanie elementów odpowiedzialnych za wyświetlanie błędów walidacji
        let nameError = document.getElementById('nameError');
        let descError = document.getElementById('descError');
        nameError.innerText = "";
        descError.innerText = "";
        todoName.classList.remove("inputError");
        todoDesc.classList.remove("inputError");

        //walidacja
        if(todoName.value.length > 2 && todoDesc.value.length > 10){

            //tworzenie obiektu - zadanie
            let todo = {
                name: todoName.value,
                desc: todoDesc.value,
                done: false
            };

            //sprawdzanie duplikatów
            for(let task of todoList){
                if(task.name == todoName.value){
                    return;
                }
            }

            //dodawanie zadania do listy zadan (tablicy obiektow)
            todoList.push(todo);
            console.log(todoList);

            //zapisywanie danych do local storage
            localStorage.setItem('todoList', JSON.stringify(todoList));

            //wyswietlanie zadan
            renderList();
    
            //czyszczenie inputa
            formData.target.elements[0].value = "";
            formData.target.elements[1].value = "";

        }else{
            if(todoName.value.length <= 2){
                nameError.innerText = "Niepoprawna nazwa zadania";
                todoName.classList.add("inputError");
            }
            
            if(todoDesc.value.length <= 10){
                descError.innerText = "Niepoprawny opis zadania";
                todoDesc.classList.add("inputError");
            }
            
            console.log("cos nie tak");
        }

    })
    
})



const renderList = () => {

    //czyszczenie przed wyswietlaniem nowej listy zadan - usuwanie "nasłuchiwania" przycisków
    let liList = Array.from(ul.getElementsByTagName('li'));
    liList.forEach((li) => {
        let buttonCheck = li.getElementsByTagName('button')[0];
        let buttonDelete = li.getElementsByTagName('button')[1];
        buttonCheck.removeEventListener("click", changeTaskStatus);
        buttonDelete.removeEventListener("click", deleteTask);
    })

    ul.innerHTML=""; //zeruje listę w HTMLu

    //wyświetlanie
    todoList.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between' ,'align-items-start');

        let main = document.createElement("main");
        let heading = document.createElement("h5");
        let paragraph = document.createElement("p");
        let div = document.createElement("div");
        let buttonCheck = document.createElement("button");
        let buttonDelete = document.createElement("button");

        heading.innerText = task.name;
        heading.classList.add('fw-bold');

        paragraph.innerText = task.desc;

        div.classList.add("button-group");

        buttonCheck.addEventListener("click", changeTaskStatus);
        buttonCheck.dataset.taskId = index; //tworzenie własnej "właściwości" dla przycisku, która przyjmuje jako wartość indeks w tablicy zadań

        if(task.done){
            buttonCheck.innerText ="Zadanie wykonane";
            buttonCheck.classList.add('btn', 'btn-sm', 'btn-success');
            main.style.textDecoration = 'line-through';
        }else{
            buttonCheck.innerText ="Zadanie niewykonane";
            buttonCheck.classList.add('btn', 'btn-sm', 'btn-warning');
        }

        buttonDelete.dataset.taskId = index;
        buttonDelete.addEventListener("click", deleteTask);
        buttonDelete.innerText = "Usuń";
        buttonDelete.classList.add('btn', 'btn-sm', 'btn-danger');
        

        main.appendChild(heading);
        main.appendChild(paragraph);
        div.appendChild(buttonCheck);
        div.appendChild(buttonDelete);

        
        li.appendChild(main);
        li.appendChild(div);
        ul.appendChild(li);

    })
}


//funkcja zmieniająca status zadania
const changeTaskStatus = (event) =>{
    let task = todoList[Math.round(event.target.dataset.taskId)];

    if(task.done){
        task.done = false;
    }else{
        task.done = true;
    }

    //zapisywanie danych do local storage (update)
    localStorage.setItem('todoList', JSON.stringify(todoList));

    renderList();
}


//funkcja do odczytywania danych zapisanych w local storage
const readToDoList = () =>{
    if(localStorage.getItem('todoList')){
        return JSON.parse(localStorage.getItem('todoList'));
    }else{
        return [];
    }
}

//funkcja do usuwania zadania z listy
const deleteTask = (event) => {
    todoList = todoList.filter((x,y) =>{
        if(y==event.target.dataset.taskId) return false;
        else return true;
    })

    //zapisywanie danych do local storage (update)
    localStorage.setItem('todoList', JSON.stringify(todoList));

    renderList();
}