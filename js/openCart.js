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
  if (!cartOverlay.contains(ev.target) && ev.target !== openCartBtn || ev.keyCode === 27) {
    cartOverlay.classList.remove("active");
  }
}

// =======================
const cartCount = document.querySelector(".cart-count");
const totalSumm = document.querySelector(".total-summ");
const totalBox = document.querySelector(".total-box");
const listCartHTML = document.querySelector(".cart");
const iconCart = document.getElementById("open-cart");
let carts = [];
const listProductsHTML = document.querySelector(".products-container");
let listProducts = [];
const addDataToHTML = (listProducts) => {
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
  } else {
    let newProduct = document.createElement("div");
    newProduct.classList.add("box");
    newProduct.innerHTML = `
      <img src="./images/nothing_found.png" alt="product" />
          <h3 class="product-title">Nothing found!</h3>
            <span class="product-price">$0</span>
          `;
    listProductsHTML.appendChild(newProduct);
  }
};
listProductsHTML.addEventListener("click", (e) => {
  let positionClick = e.target;
  if (positionClick.classList.contains("buy_btn")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
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
    <div class="product-descr">
    <h4>${info.name}</h4>
    <p class="item-price">${info.price * cart.quantity}$</p>
    </div>
</div>

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
          totalSumm.textCoalBtn1ntent = 0;
          cartCount.classList.remove("active");
          totalBox.classList.remove("active");
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};
const buyButton = document.getElementById('cart_btn');
const modalBtn1 = document.getElementById('modal-btn1');
const modalBtn2 = document.getElementById('modal-btn2');
const lastBtn = document.getElementById('finall-btn');
const lastWindow = document.querySelector('.last-window');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalIcon = document.querySelector('.close-modal');
const spinner = document.querySelector(".spinner-container");
const modalDiv = document.querySelector(".modal");
const paymentForm = document.querySelector(".payment");
const payButton = document.querySelector(".payButton");
const removeModal = document.querySelector('.clean-products');
const removeAllButton = document.querySelector('.remove-all_btn');
const nameInput = document.getElementById('nameInput');
const addressInput = document.getElementById('addressInput');
const phoneImput = document.getElementById('phoneImput');
const cardNumber = document.getElementById('cardNumber');
const cardMonth = document.getElementById('cardMonth');
const cardYear = document.getElementById('cardYear');
const cardCvv = document.getElementById('cardCvv');

const my_order = document.querySelector('.my_order');
const errorSpans = document.querySelectorAll('.error');

let nameInputValue
let addressInputValue
let phoneImputValue
let cardNumberValue
let cardMonthValue
let cardYearValue
let cardCvvValue

const usersInfo = [];

paymentForm.addEventListener('input', function () {
  nameInputValue = nameInput.value;
  addressInputValue = addressInput.value;
  phoneImputValue = phoneImput.value;
  cardNumberValue = cardNumber.value;
  cardMonthValue = cardMonth.value;
  cardYearValue = cardYear.value;
  cardCvvValue = cardCvv.value;
});

payButton.addEventListener('click', () => {
  const payInfo = {
    "name": nameInputValue,
    "address": addressInputValue,
    "phone": phoneImputValue,
    "card": cardNumberValue,
    "month": cardMonthValue,
    "year": cardYearValue,
    "cvv": cardCvvValue,
  }
  usersInfo.push(payInfo)
  console.log(usersInfo);
  carts.map((item, index) => {
    my_order.insertAdjacentHTML("beforeend", `<li>☕ ${listProducts[item.product_id - 1].name} - <span>${carts[index].quantity} pc.</span></li>`);
  })

  errorSpans.forEach((item) => {
    item.innerHTML = '';
  })


  modalDiv.classList.add("visually-hidden");
  spinner.classList.remove("visually-hidden");
  listCartHTML.innerHTML = "";
  carts = [];
  localStorage.setItem("cart", []);
  totalSumm.textContent = 0;
  cartCount.classList.remove("active");
  totalBox.classList.remove("active");
  setTimeout(() => {
    spinner.classList.add("visually-hidden");
    lastWindow.classList.remove("visually-hidden");
    paymentForm.classList.add('visually-hidden');
    nameInput.value = ''
    addressInput.value = ''
    phoneImput.value = ''
    cardNumber.value = ''
    cardMonth.value = ''
    cardYear.value = ''
    cardCvv.value = ''
  }, 1000)
})

buyButton.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  paymentForm.classList.remove('visually-hidden');
})

function hideModal() {
  modalOverlay.classList.remove('active');
  lastWindow.classList.add("visually-hidden");
  modalDiv.classList.remove("visually-hidden");
  paymentForm.classList.add('visually-hidden');
  removeModal.classList.add('visually-hidden');
  my_order.innerHTML = "";
}
modalBtn2.addEventListener('click', () => {
  hideModal();
  setTimeout(() => {
    cartOverlay.classList.toggle("active");
    removeModal.classList.add("visually-hidden");
  }, 300)
});

closeModalIcon.addEventListener('click', hideModal);

document.addEventListener('click', (ev) => {
  if (ev.target === modalOverlay || ev.keyCode === 27) {
    hideModal();
  }
});


modalBtn1.addEventListener('click', () => {
  modalDiv.classList.add("visually-hidden");
  spinner.classList.remove("visually-hidden");
  listCartHTML.innerHTML = "";
  carts = [];
  localStorage.setItem("cart", []);
  totalSumm.textContent = 0;
  cartCount.classList.remove("active");
  totalBox.classList.remove("active");
  setTimeout(() => {
    spinner.classList.add("visually-hidden");
    lastWindow.classList.remove("visually-hidden");
    paymentForm.classList.add('visually-hidden')
    removeModal.classList.add('visually-hidden')
  }, 1000)
})

lastBtn.addEventListener('click', () => {
  cartOverlay.classList.remove("active");
  hideModal()
  modalDiv.classList.remove("visually-hidden");
  setTimeout(() => {
    lastWindow.classList.add("visually-hidden");
    my_order.innerHTML = "";
  }, 500)
})


removeAllButton.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  removeModal.classList.remove('visually-hidden');

})

// ==========================
// SEARCH
function filterData(query) {
  return listProducts.filter(function (item) {
    return item.name.toLowerCase().includes(query.toLowerCase()) || item.price == query;
  });
}
function scrollToSection(sectionId) {
  const prodSection = document.getElementById(sectionId);
  if (prodSection) {
    prodSection.scrollIntoView({ behavior: 'smooth' });
  }
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function () {
  const curentScrollPosition = document.body.scrollTop;
  console.log(curentScrollPosition);
  const searchQuery = this.value;
  const listProducts = filterData(searchQuery);
  scrollToSection('products');
  addDataToHTML(listProducts);
});

// =========================

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML(listProducts);
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
