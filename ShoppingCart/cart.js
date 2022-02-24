let carts = document.querySelectorAll(".add-cart");
console.log(carts);

// Setting products to use with Local Storage
let products = [
  {
    name: "cap",
    tag: "cap",
    price: 90,
    inCart: 0,
  },
  {
    name: "bag",
    tag: "bag",
    price: 190,
    inCart: 0,
  },
  {
    name: "Blue-Eyes Black Shirt",
    tag: "blueEyesBlackShirt",
    price: 120,
    inCart: 0,
  },
  {
    name: "Fit Jacket",
    tag: "fitJacket",
    price: 150,
    inCart: 0,
  },
  {
    name: "Baseball Jacket",
    tag: "baseballJacket",
    price: 150,
    inCart: 0,
  },
  {
    name: "Dark-Magician-Girl Shirt",
    tag: "darkMagicianShirt",
    price: 120,
    inCart: 0,
  },
  {
    name: "DMG Hoodie",
    tag: "dmgHoodie",
    price: 150,
    inCart: 0,
  },
  {
    name: "Face Mask",
    tag: "faceMask",
    price: 40,
    inCart: 0,
  },
  {
    name: "Obelisk Hoodie",
    tag: "obeliskHoodie",
    price: 150,
    inCart: 0,
  },
  {
    name: "Yami Hoodie",
    tag: "yamiHoodie",
    price: 150,
    inCart: 0,
  },
  {
    name: "Black-and-Grey Hoodie",
    tag: "blackGreyHoodie",
    price: 150,
    inCart: 0,
  },
  {
    name: "Blue-Eyes White Shirt",
    tag: "blueEyesWhiteShirt",
    price: 120,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
  });
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart span").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

// Setting the items
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Displays cart numbers as page loads
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

// Calling the function to display cart numbers
onLoadCartNumbers();
