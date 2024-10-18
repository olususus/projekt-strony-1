document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do pobrania koszyka z localStorage
  function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
  }

  // Funkcja do zapisania koszyka w localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Funkcja do usuwania produktu z koszyka
  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1); // Usuwa produkt na danym indeksie
    saveCart(cart);
    displayCartItems(); // Odświeżenie zawartości koszyka po usunięciu
    updateCartCount(); // Aktualizacja liczby produktów w koszyku
  }

  // Funkcja do wyświetlania produktów w koszyku
  function displayCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById("cart-items");

    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Twój koszyk jest pusty.</p>";
        return;
      }

      cartItemsContainer.innerHTML = ""; // Opróżnia kontener przed dodaniem nowych produktów
      cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        // Ścieżka do zdjęcia (z folderu "images")
        const productImagePath = `images/${product.image}`;

        cartItem.innerHTML = `
          <img src="${productImagePath}" alt="${product.name}" />
          <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
          </div>
          <button class="remove-item" data-index="${index}">Usuń</button>
        `;

        // Dodanie funkcji usuwania produktu po kliknięciu przycisku "Usuń"
        const removeButton = cartItem.querySelector(".remove-item");
        if (removeButton) {
          removeButton.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            // Animacja przed usunięciem
            cartItem.classList.add("removing");

            // Usuwamy produkt po zakończeniu animacji
            setTimeout(() => {
              removeFromCart(index); // Usuwa produkt z koszyka
            }, 1000); // Czas trwania animacji (1 sekunda)
          });
        }

        cartItemsContainer.appendChild(cartItem);
      });
    } else {
      console.error('Element z id "cart-items" nie został znaleziony!');
    }
  }

  // Funkcja do aktualizacji liczby produktów w koszyku
  function updateCartCount() {
    const cart = getCart();
    const cartLink = document.querySelector(".cart-link img");

    if (cartLink) {
      const cartCount = cart.length;
      cartLink.setAttribute("alt", `Koszyk (${cartCount})`);
    } else {
      console.error("Ikona koszyka nie została znaleziona!");
    }
  }

  // Wyświetlenie zawartości koszyka po załadowaniu strony koszyka
  if (document.getElementById("cart-items")) {
    displayCartItems();
  }
  updateCartCount(); // Aktualizacja liczby produktów w koszyku na ikonie
});
