document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");

  // Wczytanie danych z JSON i obsługa błędów
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const mcdonaldsProducts = data.filter((product) => product.id > 999);

      // Dodanie produktów do strony
      mcdonaldsProducts.forEach(({ image, name, price, url }) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Poprawna składnia dla szablonów stringów
        productCard.innerHTML = `
          <div class="product-image" style="background-image: url('${image}');"></div>
          <div class="product-name">${name}</div>
          <div class="product-price">${price}</div>
          <a href="${url}" class="product-link">Zobacz Produkt</a>
        `;

        productList.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Błąd wczytywania danych produktów:", error);
    });
});
