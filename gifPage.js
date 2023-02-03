
//Gif Page Loading:
gif_form.addEventListener("submit", (event) => {
    event.preventDefault();
    getGifs();
});


//get gifs from giphy
function getGifs () {
    const card = makeBox();
    const gifLimit = 20;
    const index = Math.floor(Math.random() * gifLimit);
    let searchTerm = document.querySelector("#gif_input").value;
    if(searchTerm.length <= 0) {
        searchTerm = "tropical vacation";
    } else {
        searchTerm = `vacation+${searchTerm}`;
    }
    console.log(searchTerm);
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=jCCaMaUN4QazYEtOXtGvWeRBNIuJaTOq&limit=${gifLimit}`;
    photoPromise = fetch(url)
    .then((response) => response.json())
        .then(data => card.querySelector(".gif_img").setAttribute("src",data.data[index].images.fixed_width.url));
   
    gif_container.appendChild(card);
    gif_form.reset();
}

function makeBox() {
    const newCard = document.createElement("div");
    newCard.setAttribute("class","gif_card");
    const img = document.createElement("img");
    img.setAttribute("class","gif_img");
    newCard.appendChild(img);
    return newCard;
}