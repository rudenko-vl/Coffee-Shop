// const buyBtns = document.querySelectorAll(".buy_btn");
// const prices = document.querySelectorAll(".product-price");
// const productTitles = document.querySelectorAll(".product-title");
// const productsBox = document.querySelector(".products_box");
// const total = document.querySelector(".total");
// const cartCount = document.querySelector(".cart-count");
// const btnPay = document.getElementById("pay-btn");
// let counter = 0;
// let number = 0;
// let summ = 0;

// btnPay.disabled = true;
// btnPay.classList.add("disabled");

// buyBtns.forEach((btn, index) => {
//   btn.onclick = () => {
//     counter++;
//     number++;
//     cartCount.textContent = counter;
//     if (counter > 0) {
//       cartCount.classList.add("active");
//     }
//     let intValue = parseInt(prices[index].textContent.replace("$", ""), 10);
//     summ += intValue;
//     btnPay.disabled = false;
//     btnPay.classList.remove("disabled");
//     total.textContent = summ + "$";

//     productsBox.insertAdjacentHTML(
//       "beforeend",
//       `
//     <div class="cart_products">
//               <p>${number}. ${productTitles[index].textContent}</p>
//               <h4>Price</h4>
//               <span class="product_price">${intValue}$</span>
//               <span class="remove-icon"><i class="fa-solid fa-trash"></i></span>
//             </div>
//     `
//     );
//   };
// });

// btnPay.onclick = () => {
//   alert("Thank you for your purchase!");
//   counter = 0;
//   number = 0;
//   summ = 0;
//   cartCount.classList.remove("active");
//   productsBox.innerHTML = "";
//   total.textContent = 0;
//   btnPay.disabled = true;
//   btnPay.classList.add("disabled");
// };
