document.addEventListener("DOMContentLoaded", () => {
  // Pobranie koszyka z localStorage
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

  // Zapisanie koszyka do localStorage
  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  // Usuwanie produktu z koszyka
  const removeFromCart = (index) => {
    const cart = getCart();
    cart.splice(index, 1); // Usuwa produkt na danym indeksie
    saveCart(cart);
    displayCartItems();
    updateCartCount();
  };

  // Wyświetlanie produktów w koszyku
  const displayCartItems = () => {
    const cart = getCart();
    const cartItemsContainer = document.getElementById("cart-items");

    if (!cartItemsContainer)
      return console.error('Element z id "cart-items" nie został znaleziony!');

    cartItemsContainer.innerHTML =
      cart.length === 0 ? "<p>Twój koszyk jest pusty.</p>" : "";

    cart.forEach((product, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-details">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </div>
        <button class="remove-item" data-index="${index}">Usuń</button>
      `;

      cartItem
        .querySelector(".remove-item")
        .addEventListener("click", (event) => {
          const index = event.target.getAttribute("data-index");
          cartItem.classList.add("removing");

          setTimeout(() => removeFromCart(index), 500);
        });

      cartItemsContainer.appendChild(cartItem);
    });
  };

  // Aktualizacja liczby produktów w koszyku
  const updateCartCount = () => {
    const cart = getCart();
    const cartLink = document.querySelector(".cart-link img");

    if (!cartLink)
      return console.error("Ikona koszyka nie została znaleziona!");

    const cartCount = cart.length;
    cartLink.setAttribute("alt", `Koszyk (${cartCount})`);
  };

  // Wyświetlenie zawartości koszyka oraz aktualizacja liczby produktów
  if (document.getElementById("cart-items")) displayCartItems();
  updateCartCount();
});
