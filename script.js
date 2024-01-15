const products = data;
const productsSection = document.querySelector(".products");
const categoriesSection = document.querySelector(".categories-items");

let categories = new Set();

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
      <button class="btn-add-product">Add to cart</button>
      <p class="product-item-sale-info">Sale!</p>
      `;
    productsSection.appendChild(newProduct);
  });
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
