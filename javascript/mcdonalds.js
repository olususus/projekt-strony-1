document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");

  // Wczytanie danych z JSON
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      // Filtracja produktów z ID > 999
      const mcdonaldsProducts = data.filter((product) => product.id > 999);

      // Dodanie produktów do strony
      mcdonaldsProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
          <div class="product-image" style="background-image: url('${product.image}');"></div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price}</div>
          <a href="${product.url}" class="product-link">Zobacz Produkt</a>
        `;

        productList.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Błąd wczytywania danych produktów:", error);
    });
});
