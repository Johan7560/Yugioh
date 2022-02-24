// Get the current year for the copyright
$("#year").text(new Date().getFullYear());

// Button to generate a single card in the DOM (card.html)
const buttonOne = document.getElementById("generateCard");

// Button to generate a card set in the DOM (cards.html)
const buttonTwo = document.getElementById("generateSet");

// Where the card will be displayed in the DOM
const singleCard = document.querySelector(".cardDisplay");
const cardSet = document.querySelector(".setDisplay");

// Event Listeners
if (buttonOne !== null) {
  buttonOne.addEventListener("click", gallery);
}
if (buttonTwo !== null) {
  buttonTwo.addEventListener("click", cardSetGallery);
}

async function cardSetGallery() {
  clearSet();
  const res = await fetch(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=metal%20raiders&attribute=dark"
  );
  const data = await res.json();
  console.log(data);
  getImages(data);
}

async function gallery() {
  clear();
  const res = await fetch("https://db.ygoprodeck.com/api/v7/randomcard.php");
  const data = await res.json();
  console.log(data);
  displayRandom(data);
}

function displayRandom(data) {
  data.card_images.forEach((image) => {
    const newImage = document.createElement("div");
    newImage.innerHTML = `<img id="random1" src=${image.image_url}></img>`;
    singleCard.appendChild(newImage);
  });
}

function getImages(data) {
  data.data.forEach((images) => {
    let card = images.card_images[0];
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<img class="singleCard" src=${card.image_url}></img>`;
    cardSet.appendChild(newDiv);
  });
}

function clear() {
  singleCard.innerHTML = "";
}

function clearSet() {
  cardSet.innerHTML = "";
}
