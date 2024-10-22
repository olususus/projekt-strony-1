window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  document.querySelector(".special-title").classList.add("loaded");
});

document
  .getElementById("products-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(function () {
      window.location.href = "products.html";
    }, 500);
  });

function searchProduct() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  window.location.href = `search-results.html?query=${encodeURIComponent(
    searchInput
  )}`;
}

fetch("data/products.json")
  .then((response) => response.json())
  .then((products) => {
    const productsContainer = document.getElementById("products-container");
    const specialProductsContainer = document.getElementById(
      "special-products-container"
    );

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const productLink = document.createElement("a");
      productLink.href = product.url;

      const productImageDiv = document.createElement("div");
      productImageDiv.classList.add("product-image");
      productImageDiv.style.backgroundImage = `url('${product.image}')`;

      const productName = document.createElement("p");
      productName.classList.add("product-name");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.classList.add("product-price");
      productPrice.textContent = product.price;

      productLink.appendChild(productImageDiv);
      productLink.appendChild(productName);
      productLink.appendChild(productPrice);
      productCard.appendChild(productLink);

      if (product.id > 999) {
        specialProductsContainer.appendChild(productCard);
      } else {
        productsContainer.appendChild(productCard);
      }
    });
  })
  .catch((error) => {
    console.error("Błąd wczytywania produktów:", error);
  });
