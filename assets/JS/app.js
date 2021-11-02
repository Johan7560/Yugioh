document.addEventListener('DOMContentLoaded', function () {
  let wrapper = document.getElementById('wrapper');
  let topLayer = wrapper.querySelector('.top');
  let handle = wrapper.querySelector('.handle');
  let skew = 0;
  let delta = 0;

  if (wrapper.className.indexOf('skewed') != -1) {
    skew = 990;
  }

  wrapper.addEventListener('mousemove', function (e) {
    delta = (e.clientX - window.innerWidth / 2) * 0.5;

    handle.style.left = e.clientX + delta + 'px';

    topLayer.style.width = e.clientX + skew + delta + 'px';
  });
});

// GSAP used for animation
gsap.from('.navLinks', { duration: 1.5, ease: 'power2.out', x: 500 });
gsap.from('.brand-logo', { duration: 1.5, ease: 'power2.out', y: -200 });

// Get the current year for the copyright
$('#year').text(new Date().getFullYear());

// Button to generate a single card in the DOM (card.html)
const buttonOne = document.getElementById('generateCard');

// Button to generate a card set in the DOM (cards.html)
const buttonTwo = document.getElementById('generateSet');

// Where the card will be displayed in the DOM
const singleCard = document.querySelector('.cardDisplay');
const cardSet = document.querySelector('.setDisplay');

// Event Listeners
if (buttonOne !== null) {
  buttonOne.addEventListener('click', gallery);
}
if (buttonTwo !== null) {
  buttonTwo.addEventListener('click', cardSetGallery);
}

// Fetches data from api for a card set
async function cardSetGallery() {
  clearSet();
  const res = await fetch(
    'https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=metal%20raiders&attribute=earth'
  );
  const data = await res.json();
  getImages(data);
}

// Fetches data from api to display a random card
async function gallery() {
  clear();
  const res = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
  const data = await res.json();
  displayRandom(data);
}

// Displays that card recieved from the API
function displayRandom(data) {
  data.card_images.forEach((image) => {
    const newImage = document.createElement('div');
    newImage.innerHTML = `<img id="random1" src=${image.image_url}></img>`;
    singleCard.appendChild(newImage);
  });
}

// Displays that card set recieved from the API
function getImages(data) {
  data.data.forEach((images) => {
    let card = images.card_images[0];
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<img class="cardSet_singleImage" src=${card.image_url}></img>`;
    cardSet.appendChild(newDiv);
  });
}

// Clears DOM for next card to be displayed
function clear() {
  singleCard.innerHTML = '';
}

// Clears DOM for next card set to be displayed
function clearSet() {
  cardSet.innerHTML = '';
}
