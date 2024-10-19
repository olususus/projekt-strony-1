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

    // Przetwarzanie każdego produktu z pliku JSON
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const productLink = document.createElement("a");
      productLink.href = product.url;

      // Tworzenie div z obrazkiem produktu
      const productImageDiv = document.createElement("div");
      productImageDiv.classList.add("product-image");
      productImageDiv.style.backgroundImage = `url('${product.image}')`;

      // Tworzenie nazwy produktu
      const productName = document.createElement("p");
      productName.classList.add("product-name");
      productName.textContent = product.name;

      // Tworzenie ceny produktu
      const productPrice = document.createElement("p");
      productPrice.classList.add("product-price");
      productPrice.textContent = product.price;

      // Dodanie obrazka, nazwy i ceny do linku
      productLink.appendChild(productImageDiv);
      productLink.appendChild(productName);
      productLink.appendChild(productPrice);

      // Dodanie linku do karty produktu
      productCard.appendChild(productLink);

      // Dodanie karty produktu do kontenera
      productsContainer.appendChild(productCard);
    });
  })
  .catch((error) => {
    console.error("Błąd wczytywania produktów:", error);
  });

document.addEventListener("DOMContentLoaded", function () {
  fetch("data/products.json")
    .then((response) => response.json())
    .then((products) => {
      if (products && products.length > 0) {
        const latestProduct = products.reduce((prev, current) => {
          return prev.id > current.id ? prev : current;
        });

        displayLatestProduct(latestProduct);
      }
    })
    .catch((error) => console.error("Błąd wczytywania produktów:", error));
});

function displayLatestProduct(product) {
  const welcomeSection = document.querySelector(".welcome-section");

  const productHTML = `
    <div class="latest-product">
      <h2>Ostatnio dodany produkt</h2>
      <div class="product-card">
        <div
          class="product-image"
          style="background-image: url('${product.image}')"
        ></div>
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price}</p>
        <a href="${product.url}" class="product-link">Zobacz więcej</a>
      </div>
    </div>
  `;

  welcomeSection.insertAdjacentHTML("beforeend", productHTML);
}
