const openCartBtn = document.getElementById("open-cart");
const cartOverlay = document.getElementById("cartOverlay");

const closeCartBtn = document.getElementById("close-cart");
closeCartBtn.addEventListener("click", toggleCart);

function toggleCart() {
  cartOverlay.classList.toggle("active");
}

openCartBtn.addEventListener("click", toggleCart);

const cart = document.querySelector(".cart");
cart.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", closeModal);
window.addEventListener("keydown", closeModal);

function closeModal(ev) {
  if (ev.target === cartOverlay || ev.keyCode === 27) {
    cartOverlay.classList.remove("active");
  }
}

// =======================
const cartCount = document.querySelector(".cart-count");
// const buyButton = document.getElementById('cart_btn');
const totalSumm = document.querySelector(".total-summ");
const totalBox = document.querySelector(".total-box");
const listCartHTML = document.querySelector(".cart");
const iconCart = document.getElementById("open-cart");
let carts = [];
const listProductsHTML = document.querySelector(".products-container");
let listProducts = [];
const addDataToHTML = () => {
  listProductsHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("box");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
      <img src="${product.image}" alt="product" />
          <h3 class="product-title">${product.name}</h3>
            <span class="product-price">$ ${product.price}</span>
          <button class="buy_btn">Add to cart</button>`;
      listProductsHTML.appendChild(newProduct);
    });
  }
};
listProductsHTML.addEventListener("click", (e) => {
  let positionClick = e.target;
  if (positionClick.classList.contains("buy_btn")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
    cartOverlay.classList.add("active");
  }
});
const addToCart = (product_id) => {
  let positionProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionProductInCart].quantity =
      carts[positionProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let summ = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      cartCount.textContent = totalQuantity;
      if (totalQuantity > 0) {
        cartCount.classList.add("active");
      }
      let newCart = document.createElement("div");
      newCart.classList.add("products_box");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProducts[positionProduct];
      summ += info.price * cart.quantity;
      totalSumm.textContent = summ + "$";
      newCart.innerHTML = `
      <div class="cart-image">
  <img src="${info.image}" alt="img">
</div>
<h3>${info.name}</h3>
<p>Price</p>
<p class="item-price">${info.price * cart.quantity}</p>
  <span class="minus">-</span>
  <span class="cart-quantity">${cart.quantity}</span>
  <span class="plus">+</span>
`;
      listCartHTML.appendChild(newCart);
      totalBox.classList.add("active");
    });
  }
};

listCartHTML.addEventListener("click", (e) => {
  let positionClick = e.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let positionItemtInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemtInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemtInCart].quantity =
          carts[positionItemtInCart].quantity + 1;

        break;

      default:
        let valueChange = carts[positionItemtInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemtInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemtInCart, 1);
          totalSumm.textContent = 0;
          cartCount.classList.remove("active");
          totalBox.classList.remove("active");
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
