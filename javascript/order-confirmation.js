document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do pobierania danych zamówienia z localStorage
  function getOrderData() {
    const orderData = JSON.parse(localStorage.getItem("order"));
    if (!orderData) {
      alert("Brak danych zamówienia!");
      window.location.href = "index.html"; // Przekierowanie na stronę główną
    }
    return orderData;
  }

  // Funkcja do wyświetlania szczegółów zamówienia
  function displayOrderDetails() {
    const { items, totalPrice, deliveryMethod, address, name, email } =
      getOrderData();

    const checkoutItemsContainer = document.getElementById("order-items");
    checkoutItemsContainer.innerHTML = ""; // Wyczyść przed dodaniem nowych danych
    let total = 0;

    // Wyświetlanie produktów z zamówienia
    items.forEach(({ image, name, price }) => {
      checkoutItemsContainer.innerHTML += `
        <div class="order-item">
          <img src="${image}" alt="${name}" />
          <div class="product-details">
            <h3>${name}</h3>
            <p>${price}</p>
          </div>
        </div>
      `;
      total += parseFloat(price.replace(" PLN", "").replace(",", "."));
    });

    // Wyświetlanie szczegółów zamówienia
    document.getElementById("total-price").innerText = `${total.toFixed(
      2
    )} PLN`;
    document.getElementById("delivery-method").innerText =
      deliveryMethod || "Brak metody dostawy";
    document.getElementById("address").innerText = address || "Brak adresu";
    document.getElementById("name").innerText = name || "Brak nazwy";
    document.getElementById("email").innerText = email || "Brak adresu email";
  }

  // Funkcja do usunięcia danych zamówienia z localStorage
  function clearOrderData() {
    localStorage.removeItem("order");
  }

  // Wyświetlanie szczegółów zamówienia po załadowaniu strony
  displayOrderDetails();

  // Nasłuchuj kliknięcia przycisku powrotu
  document.querySelector("button")?.addEventListener("click", () => {
    clearOrderData(); // Usuwamy dane zamówienia przed przekierowaniem
  });
});
