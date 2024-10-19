// Funkcja dodająca klasę 'loaded' po załadowaniu strony
window.addEventListener("load", function () {
  // Dodajemy klasę 'loaded' do body, aby uruchomić animację
  document.body.classList.add("loaded");
});

// Funkcja do płynnego przejścia do strony "products.html"
document
  .getElementById("products-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Zapobiegamy domyślnemu działaniu linku

    // Dodajemy animację fade-out do body przed przejściem
    document.body.classList.add("fade-out");

    // Po zakończeniu animacji przejście do strony
    setTimeout(function () {
      window.location.href = "products.html"; // Przekierowanie na products.html
    }, 500); // Czas, po którym następuje przekierowanie (czas trwania animacji)
  });

// Funkcja wyszukiwania produktu
function searchProduct() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  window.location.href = `search-results.html?query=${encodeURIComponent(
    searchInput
  )}`;
}

// Funkcja do wczytania danych produktów z JSON i generowania kart produktów
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

      // Przypisujemy produkty o ID > 999 do specjalnej kategorii
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

window.addEventListener("load", function () {
  // Dodajemy klasę 'loaded' do body, aby uruchomić animację
  document.body.classList.add("loaded");

  // Dodajemy klasę 'loaded' do tytułu specjalnej kategorii
  document.querySelector(".special-title").classList.add("loaded");
});
