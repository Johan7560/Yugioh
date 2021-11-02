// function onLoad() {
//   localStorage.setItem("deliveryValue", 150);
// }

let carts = document.querySelectorAll('.add-cart');
console.log(carts);
//Setting products to use with Local Storage
let products = [
  {
    name: 'YuGi Cap',
    tag: 'yugicap',
    price: 90,
    inCart: 0
  },
  {
    name: 'YuGi Bag',
    tag: 'yugibag',
    price: 190,
    inCart: 0
  },
  {
    name: 'Blue Eyes Black Shirt',
    tag: 'blueeyesblackshirt',
    price: 120,
    inCart: 0
  },
  {
    name: 'Red Eyes Jacket',
    tag: 'redeyesjacket',
    price: 150,
    inCart: 0
  },
  {
    name: 'Baseball Jersey',
    tag: 'baseballjersey',
    price: 150,
    inCart: 0
  },
  {
    name: 'Dark Magician Girl Shirt',
    tag: 'darkmagiciangirlshirt',
    price: 120,
    inCart: 0
  },
  {
    name: 'DMG Hoodie',
    tag: 'dmghoodie',
    price: 150,
    inCart: 0
  },
  {
    name: 'Yami Face Mask',
    tag: 'yamifacemask',
    price: 40,
    inCart: 0
  },
  {
    name: 'Exodia Hoodie',
    tag: 'exodiahoodie',
    price: 150,
    inCart: 0
  },
  {
    name: 'Yami Hoodie',
    tag: 'yamihoodie',
    price: 150,
    inCart: 0
  },
  {
    name: 'Black Grey Hoodie',
    tag: 'blackgreyhoodie',
    price: 150,
    inCart: 0
  },
  {
    name: 'Blue-Eyes White Shirt',
    tag: 'blueyeswhiteshirt',
    price: 120,
    inCart: 0
  }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

// Displays cart number as page loads
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product, action) {
  let productNumbers = JSON.parse(localStorage.getItem('cartNumbers'));

  if (action == 'decrease') {
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cart span').textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
}

// Setting the items
function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

//Display total cost of items in cart
function totalCost(product, action) {
  let cartCost = JSON.parse(localStorage.getItem('totalCost'));
  console.log(cartCost);
  if (action == 'decrease') {
    localStorage.setItem('totalCost', cartCost - product.price);
  } else if (cartCost !== null) {
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

// Function to display items in cart.html after adding them to cart from shop.html page
function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');
  let checkingOut = document.querySelector('.checkingOut');
  let deliveryValue = localStorage.getItem('deliveryValue');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    checkingOut.innerHTML = '';
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img class="cartProductImage" src="../images/${item.tag}.png">
                <span class="productName">${item.name}</span> 
            </div>
            <div class="price">R${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease "
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase"
                name="arrow-dropright-circle"></ion-icon>
            </div>
             <div class="total">
                 R${item.inCart * item.price},00
             </div>         
            </div>
            `;
    });
    checkingOut.innerHTML += `
    <div class="checkoutCartDisplay">
    <ul class="collection with-header">
    <li class="collection-header"><h5>Confirm Order</h5></li>
      <li class="collection-item">
       <div>Delivery<p class="secondary-content ">

     </p></div>
      </li>
      <li class="collection-item">
       <div>Discount<p class="secondary-content">R 150</p></div>
      </li>
      <li class="collection-item">
       <div>Total Excl. VAT<p class="secondary-content">R ${
         Math.round(cartCost) + Number(deliveryValue)
       }</p></div>
      </li>
      <li class="collection-item">
       <div>Total Incl. VAT<p class="secondary-content">R ${
         Math.round(cartCost * 1.15) + Number(deliveryValue)
       }</p></div>
      </li>

    </ul>
    <a class="waves-effect waves-light btn-large checkoutBtn">Checkout</a>
    </div>
    `;
  }
  deleteButtons();
  manageQuantity();
}

// Remove items selected in cart or otherwords delete/remove in cart
function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.product ion-icon');

  let productName;
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let cartCost = localStorage.getItem('totalCost');

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
      productName = deleteButtons[i].parentElement.textContent
        .trim()
        .toLowerCase()
        .replace(/ /g, '');

      localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);

      localStorage.setItem(
        'totalCost',
        cartCost - cartItems[productName].price * cartItems[productName].inCart
      );

      delete cartItems[productName];
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

// Function to increase or decrease items in cart
function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.decrease');

  let increaseButtons = document.querySelectorAll('.increase');

  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let currentQuantity = 0;
  let currentProduct = '';

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click', () => {
      currentQuantity =
        decreaseButtons[i].parentElement.querySelector('span').textContent;
      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector('span')
        .textContent.toLowerCase()
        .replace(/ /g, '')
        .trim();
      console.log(currentProduct);
      //console.log(cartItems[currentProduct].inCart);
      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], 'decrease');
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        displayCart();
      }
    });
  }
  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener('click', () => {
      currentQuantity =
        increaseButtons[i].parentElement.querySelector(' span').textContent;
      currentProduct = increaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector('span')
        .textContent.toLowerCase()
        .replace(/ /g, '')
        .trim();

      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      displayCart();
    });
  }
}

// Calling the function as page loads
onLoadCartNumbers();
//onLoad();
displayCart();
