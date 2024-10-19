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

// Wczytanie produktów z pliku JSON
fetch("./data/products.json")
  .then((response) => response.json())
  .then((data) => {
    const latestProductContainer = document.getElementById(
      "latest-product-container"
    );

    // Sprawdź, czy kontener istnieje
    if (!latestProductContainer) {
      console.error(
        "Błąd: Nie znaleziono elementu 'latest-product-container'."
      );
      return; // Przerwij działanie, jeśli nie ma kontenera
    }

    // Znalezienie produktu z najwyższym ID (ostatnio dodany)
    const latestProduct = data.reduce((max, product) => {
      return product.id > max.id ? product : max;
    });

    // Utworzenie elementu HTML dla najnowszego produktu
    const productElement = document.createElement("div");
    productElement.classList.add("product-card");

    productElement.innerHTML = `
      <a href="${latestProduct.url}">
        <div
          class="product-image"
          style="background-image: url('${latestProduct.image}')"
        ></div>
        <p class="product-name">${latestProduct.name}</p>
        <p class="product-price">${latestProduct.price}</p>
      </a>
    `;

    // Dodanie nowego elementu do kontenera
    latestProductContainer.appendChild(productElement);
  })
  .catch((error) => {
    console.error("Błąd wczytywania produktów:", error);
  });
