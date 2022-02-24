// Grabbing a nodeList of every product on shop.html
let carts = document.querySelectorAll('.add-cart');

// Product objects in array
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
    name: 'Blue Eyes White Shirt',
    tag: 'blueeyeswhiteshirt',
    price: 120,
    inCart: 0
  }
];

// Looping products and adding eventListeners which will execute two functions
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    // cartNumbers() keeps track of the number of items in cart to display
    cartNumbers(products[i]);
  });
}

// Displays the cart number of total products
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.shop_cart_link_cart span').textContent = productNumbers;
  }
}

// The function that is added to the eventListener of each product tag
function cartNumbers(product, action) {
  let productNumbers = JSON.parse(localStorage.getItem('cartNumbers'));

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.shop_cart_link_cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.shop_cart_link_cart span').textContent = 1;
  }
  // setItems() runs when cartNumbers() is envoked
  setItems(product);
}

// Sets all items/products which was selected and saves it to localStorage
function setItems(product) {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

  if (cartItems !== null) {
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

// Get the complete cost of all products
function totalCost(product, action) {
  let cartCost = JSON.parse(localStorage.getItem('totalCost'));

  if (cartCost !== null) {
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  let productContainer = document.querySelector('.products');
  let checkOut = document.querySelector('.checkingOut');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    checkOut.innerHTML = '';
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="product">
          <ion-icon name="close-circle"></ion-icon>
          <img class="cartProductImage" src="/assets/images/${item.tag}.png">
          <span class="productName">
            ${item.name}
          </span> 
        </div>
        <div class="price">
          R${item.price},00
        </div>
        <div class="quantity">
          <ion-icon class='decrease' name='arrow-dropleft-circle'></ion-icon>
          <span>
            ${item.inCart}
          </span>
          <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
        </div>
        <div class="total">
          R${item.inCart * item.price},00
        </div>         
      `;
    });
    checkOut.innerHTML += `
      <div class="row">
        <div class="col s6 offset-s3 shipmentContainer">
          <div class="checkoutCartDisplay">
            <ul class="collection with-header">
              <li class="collection-header"><h5>Confirm Order</h5></li>
              <li class="collection-item">
                <div class="deliveryButtons">Delivery Options
                  <p class="secondary-content">
                    <label>
                      <input class="with-gap" name="deliveryFees" type="radio" value=20 />
                      <span>Pick Up</span>
                    </label>
                    <label>
                      <input class="with-gap" name="deliveryFees" type="radio" value=100/>
                      <span>Deliver-To-Door</span>
                    </label>
                    <label>
                      <input class="with-gap" name="deliveryFees" type="radio" value=250/>
                      <span>Express</span>
                    </label>
                  </p> 
                </div>
              </li>
              <li class="collection-item">
                <div>Delivery Fee
                  <p class="secondary-content"></p>
                </div>
              </li>
              <li class="collection-item">
                <div>Discount
                  <p class="secondary-content">R 150</p>
                </div>
              </li>
              <li class="collection-item">
                <div>Total Excl. VAT
                  <p class="secondary-content">
                    R 
                  </p>
                </div>
              </li>
              <li class="collection-item">
                <div>Total Incl. VAT
                  <p class="secondary-content">
                    R 
                  </p>
                </div>
              </li>
            </ul>
            <a id="checkOutBtn" class="waves-effect waves-light btn-large">Checkout</a>
          </div>
        </div>
      </div>
    `;
  }
}

// Run as app is loaded
onLoadCartNumbers();
displayCart();
