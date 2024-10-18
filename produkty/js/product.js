document.addEventListener("DOMContentLoaded", () => {
  // Tablica produktów
  const products = [
    {
      id: 1,
      name: "Karnet - Project Sigma Gym",
      price: "99,99 PLN",
      image: "../images/karnet1.png",
    },
    {
      id: 2,
      name: "Karnet - Premium Gym",
      price: "149,99 PLN",
      image: "../images/karnet2.png",
    },
    // Możesz dodać więcej produktów
  ];

  // Funkcja do pobierania parametru 'id' z URL
  function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id"));
  }

  const productId = getProductIdFromURL(); // Pobranie id z URL

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
});
