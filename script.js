function addListItem(list,product){
    let item = document.createElement('li');
    item.innerText = product;
    list.appendChild(item);
}


let products = [
    "Mleko",
    "Jajka",
    "Mąka",
    "Czekolada"
];

//czekam aż cały dokument załaduje się
document.addEventListener("DOMContentLoaded", () =>{
    //łapię listę z produktami
    let list = document.getElementById("shoppingList");

    //dodawanie produktow z tablicy products (wyżej)
    products.forEach((product) => {
            addListItem(list, product);
        })

    //łapię formularz
    let form = document.getElementById('formNewItem');

    //czekam na zdarzenie - wysłanie danych z formularza
    form.addEventListener('submit', (formData) =>{
        formData.preventDefault(); //zapobiega domyślnym ustawieniom formularza, czyli przeładowaniu strony

        //pobieranie wartosci z pierwszego inputa
        let product = formData.target.elements[0].value;

        //wysyłanie nazwy produktu do funkcji tworzącej element listy w htmlu
        addListItem(list, product);

        //czyszczenie inputa
        formData.target.elements[0].value = "";

    })
    
})



