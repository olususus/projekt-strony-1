document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do pobrania koszyka z localStorage
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

  // Funkcja do wyświetlania produktów w koszyku
  const displayCheckoutItems = () => {
    const cart = getCart();
    const checkoutItemsContainer = document.getElementById("checkout-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!checkoutItemsContainer || !totalPriceElement) return;

    if (cart.length === 0) {
      checkoutItemsContainer.innerHTML = "<p>Twój koszyk jest pusty.</p>";
    } else {
      checkoutItemsContainer.innerHTML = "";
      const totalPrice = cart.reduce((sum, product) => {
        const price = parseFloat(
          product.price.replace(" PLN", "").replace(",", ".")
        );
        const checkoutItem = document.createElement("div");
        checkoutItem.classList.add("checkout-item");
        checkoutItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
          </div>
        `;
        checkoutItemsContainer.appendChild(checkoutItem);
        return sum + price;
      }, 0);

      totalPriceElement.innerText = `${totalPrice.toFixed(2)} PLN`;
    }
  };

  // Funkcja do złożenia zamówienia
  const submitOrder = () => {
    const cart = getCart();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const deliveryMethod = document.querySelector(
      'input[name="delivery"]:checked'
    );

    if (![name, email, address, phone, deliveryMethod].every(Boolean)) {
      alert("Proszę uzupełnić wszystkie dane.");
      return;
    }

    const order = {
      name,
      email,
      address,
      phone,
      deliveryMethod: deliveryMethod.value,
      items: cart,
      totalPrice: calculateTotalPrice(cart),
    };

    // Zapisz dane zamówienia w localStorage
    localStorage.setItem("order", JSON.stringify(order));

    // Wyświetl komunikat sukcesu
    alert(
      "Zamówienie zostało zapisane w localStorage. Możesz je zobaczyć w przeglądarce."
    );

    // Można dodać przekierowanie po zakończeniu procesu zamówienia, np.:
    window.location.href = "order-confirmation.html"; // lub inna strona
  };

  // Funkcja do obliczenia łącznej ceny
  const calculateTotalPrice = (cart) =>
    cart.reduce((sum, product) => {
      return (
        sum + parseFloat(product.price.replace(" PLN", "").replace(",", "."))
      );
    }, 0);

  // Wyświetlanie produktów po załadowaniu strony
  displayCheckoutItems();

  // Obsługuje kliknięcie przycisku "Złóż zamówienie"
  const submitOrderButton = document.getElementById("place-order");
  submitOrderButton?.addEventListener("click", submitOrder);
});
