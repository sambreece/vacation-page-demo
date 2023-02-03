//Form Submission:
myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setHeader();
    createCard(generateFormat());
    resetForm();
});


//Card Buttons:
cards_container.addEventListener("click", (event) => {
    //debugger;
    if(event.target.textContent === "Edit") {
        editCard(event);
    }else if(event.target.textContent === "Delete") {
        const input = confirm("Are you sure you want to delete this destination?");
        if(input === true) {
            event.target.parentElement.parentElement.parentElement.remove();
        }
    }
})


//get image from Unsplash
function getImage (newCard, name) {
    const url = `https://api.unsplash.com/search/photos?query=${name}&client_id=_eG_tNCMVdfemrLhM77_qu_ZGahNzGQJcQ9LI5iLvQg`;
    photoPromise = fetch(url)
    .then((response) => response.json())
        .then(data => newCard.querySelector(".card-img-top").setAttribute("src", data.results[0].urls.small));
}


function setHeader() {
    if(document.querySelector("h3").textContent === "Enter destination details") {
        document.querySelector("h3").textContent = "My WishList";
    }
}

function editCard(event) {
    const newTitle = prompt("Would you like to rename your destination?");
    const newLocation = prompt("Would you like to change the location of your destination?");
    const newPhoto = prompt("Would you like to change the photo of your destination?");
    const card = event.target.parentElement.parentElement.parentElement;

    if(newTitle !==null && newTitle.length > 0) {
        card.querySelector(".card-title").textContent = newTitle;
    }
    if(newLocation !==null &&  newLocation.length > 0) {
        card.querySelector(".card-subtitle").textContent= newLocation;
    }
    if(newPhoto !==null && newPhoto.length > 0) {
        card.querySelector(".card-img-top").setAttribute("src", newPhoto);
    }
}


function generateFormat() {
    const newCard = document.createElement("div");
    newCard.setAttribute("class","card");
    newCard.setAttribute("style", "width: 18rem;");

    const cardImg = document.createElement("img");
    cardImg.setAttribute("class","card-img-top");
    cardImg.setAttribute("src", "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg");
    cardImg.setAttribute("alt","Card image cap");

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");
    cardBody.setAttribute("style", "max-height: 10rem;");

    const cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class","card-title");

    const cardSubtitle = document.createElement("h6");
    cardSubtitle.setAttribute("class","card-subtitle mb-2 text-muted");

    const cardText = document.createElement("p");
    cardText.setAttribute("class","card-text");

    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class","d-flex justify-content-between");
    
    const editButton = document.createElement("a");
    editButton.setAttribute("class","btn btn-warning");
    editButton.setAttribute("href", "#");
    editButton.textContent ='Edit';

    const deleteButton = document.createElement("a");
    deleteButton.setAttribute("class","btn btn-danger");
    deleteButton.setAttribute("href", "#");
    deleteButton.textContent='Delete';

    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonDiv);

    newCard.appendChild(cardImg);
    newCard.appendChild(cardBody);

    return newCard;
}

function createCard(newCard) {
    newCard.querySelector(".card-title").textContent = document.querySelector("#destination_name").value;
    newCard.querySelector(".card-subtitle").textContent = document.querySelector("#destination_location").value;

    if(document.querySelector("#destination_description").value.length > 2) {
        newCard.querySelector(".card-text").textContent = document.querySelector("#destination_description").value;
    }
    if(document.querySelector("#destination_photo").value.length > 2) {
        newCard.querySelector(".card-img-top").setAttribute("src",document.querySelector("#destination_photo").value);
    } else {
        getImage(newCard, document.querySelector("#destination_name").value);
    }
    cards_container.appendChild(newCard);
}

function resetForm() {
    document.querySelector("#myForm").reset();
}