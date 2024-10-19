document.addEventListener("DOMContentLoaded", function () {
  fetch("data/products.json")
    .then((response) => response.json())
    .then((products) => {
      const standardItems = document.getElementById("standard-items");
      const specialItems = document.getElementById("special-items");

      products.forEach((product) => {
        const productElement = createProductElement(product);
        if (product.id > 999) {
          specialItems.appendChild(productElement); // Produkty specjalne
        } else {
          standardItems.appendChild(productElement); // Standardowe produkty
        }
      });
    })
    .catch((error) => console.log("Błąd w ładowaniu produktów:", error));
});

// Funkcja do tworzenia elementu produktu
function createProductElement(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-item");

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.alt = product.name;

  const productName = document.createElement("h4");
  productName.textContent = product.name;

  const productPrice = document.createElement("p");
  productPrice.classList.add("price");
  productPrice.textContent = product.price;

  const productLink = document.createElement("a");
  productLink.href = product.url;
  productLink.classList.add("btn");
  productLink.textContent = "Zobacz";

  productContainer.appendChild(productImage);
  productContainer.appendChild(productName);
  productContainer.appendChild(productPrice);
  productContainer.appendChild(productLink);

  return productContainer;
}
