document.addEventListener("DOMContentLoaded", function () {
  fetch("data/products.json")
    .then((response) => response.json())
    .then((products) => {
      const standardItems = document.getElementById("standard-items");
      const specialItems = document.getElementById("special-items");

      products.forEach((product) => {
        const productElement = createProductElement(product);
        const targetContainer = product.id > 999 ? specialItems : standardItems;
        targetContainer.appendChild(productElement);
      });
    })
    .catch((error) => console.log("Błąd w ładowaniu produktów:", error));
});

function createProductElement({ image, name, price, url }) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-item");

  productContainer.innerHTML = `
    <img src="${image}" alt="${name}" />
    <h4>${name}</h4>
    <p class="price">${price}</p>
    <a href="${url}" class="btn">Zobacz</a>
  `;

  return productContainer;
}
