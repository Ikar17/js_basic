function addListItem(list,product){
    let item = document.createElement('li');
    item.innerText = product;
    list.appendChild(item);
}


let todoList = [];

//czekam aż cały dokument załaduje się
document.addEventListener("DOMContentLoaded", () =>{
    //łapię listę z produktami
    let ul = document.getElementById("todoList");


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
                console.log(task.name);
                if(task.name == todoName.value){
                    return;
                }
            }

            //dodawanie zadania do listy zadan (tablicy obiektow)
            todoList.push(todo);
            console.log(todoList);

            //wyswietlanie zadan
            ul.innerHTML=""; //zeruje listę w HTMLu
            for(let task of todoList){
                let li = document.createElement("li");
                li.innerText = task.name;
                ul.appendChild(li);
            }
    
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



