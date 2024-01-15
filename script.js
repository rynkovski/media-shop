import { data } from "./data";

const products = data;
const productsSection = document.querySelector(".products");
const categoriesSection = document.querySelector(".categories-items");
let cart = [];
let categories = new Set();
let addToCartButtons;

const addToCart = (e) => {
  const selectedId = parseInt(e.target.dataset.id);
  const key = products.findIndex((product) => product.id === selectedId);

  cart.push(products.at(key));

  const cartTotal = cart.reduce((sum, product) => {
    return (sum +=
      product.price - (product.saleAmount ? product.saleAmount : 0));
  }, 0);

  cartTotal > 0
    ? cartClearBtn.classList.add("active")
    : cartClearBtn.classList.remove("active");

  cartAmount.innerHTML = `${cartTotal} zł`;
};

const renderProducts = (items) => {
  productsSection.innerHTML = "";
  items.map((item) => {
    const newProduct = document.createElement("div");
    newProduct.className = `product-item ${item.sale ? "on-sale" : ""}`;
    newProduct.innerHTML = `
    <img src="${item.image}" alt="${item.name}"/>
    <p class="product-name">${item.name}</p>
    <p class="product-description">
    ${item.description}
    </p>
    <div class="product-price">
    <span class="price">${item.price.toFixed(2)} zł</span>
    <span class="price-sale">${(item.price - item.saleAmount).toFixed(
      2
    )}zł </span>
      </div>
      <button data-id="${item.id}" class="btn-add-product">Add to cart</button>
      <p class="product-item-sale-info">Sale!</p>
      `;
    productsSection.appendChild(newProduct);
  });
  addToCartButtons = document.querySelectorAll(".btn-add-product");
  addToCartButtons.forEach((btn) => btn.addEventListener("click", addToCart));
};

const renderCategories = (items) => {
  items.map((item) => {
    categories.add(item.category);
  });
  categories = ["all", ...categories];

  categories.map((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.innerHTML = category;
    categoryBtn.dataset.category = category;
    categoriesSection.appendChild(categoryBtn);
  });
};

document.onload = renderProducts(products);
document.onload = renderCategories(products);

const categoriesButtons = document.querySelectorAll(".categories-items button");

categoriesButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const category = e.target.dataset.category;

    categoriesButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    let currentProducts;

    if (category === "all") {
      currentProducts = products;
    } else {
      currentProducts = products.filter(
        (product) => product.category === category
      );
    }

    renderProducts(currentProducts);
  });
});

const searchBarInput = document.querySelector(".search-bar-input");

searchBarInput.addEventListener("input", (e) => {
  const search = e.target.value;

  const foundProducts = products.filter((product) => {
    if (product.name.toLowerCase().includes(search.toLowerCase())) {
      return product;
    }
  });
  const emptyState = document.querySelector(".empty-state");

  foundProducts.length === 0
    ? emptyState.classList.add("active")
    : emptyState.classList.remove("active");

  renderProducts(foundProducts);
});

const cartAmount = document.querySelector(".cart-amount");
const cartClearBtn = document.querySelector(".cart-clear-btn");

const clearCart = () => {
  cartAmount.innerHTML = "Cart";
  cart = [];
};

cartClearBtn.addEventListener("click", clearCart);
