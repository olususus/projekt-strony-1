document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do pobierania parametru 'id' z URL
  function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id"));
  }

  const productId = getProductIdFromURL(); // Pobranie id z URL

  console.log("Product ID from URL:", productId); // Dodany log

  // Pobranie danych o produktach z pliku JSON
  fetch("../data/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Błąd podczas pobierania pliku JSON");
      }
      return response.json();
    })
    .then((products) => {
      console.log("Products loaded:", products); // Dodany log
      // Znalezienie produktu z tablicy na podstawie id
      const product = products.find((p) => p.id === productId);

      if (product) {
        // Ustawienie danych produktu na stronie
        document.getElementById("product-name").textContent = product.name;
        document.getElementById(
          "product-price"
        ).textContent = `Cena: ${product.price}`;
        document.getElementById("product-img").src = product.image;
        document.getElementById("product-img").alt = product.name;
      } else {
        // Jeśli produkt nie zostanie znaleziony, wyświetl komunikat
        document.getElementById("product-name").textContent =
          "Produkt nie znaleziony";
        document.getElementById("product-price").textContent = "";
        document.getElementById("product-img").src = "";
      }

      // Obsługa przycisku "Kup teraz"
      document.getElementById("add-tocart").addEventListener("click", () => {
        if (product) {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Produkt dodany do koszyka!");
        }
      });
    })
    .catch((error) => {
      console.error("Błąd podczas ładowania produktów:", error);
      alert("Wystąpił problem z załadowaniem danych produktu.");
    });
});
