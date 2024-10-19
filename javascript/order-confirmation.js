document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do pobierania danych zamówienia z localStorage
  function getOrderData() {
    const orderData = JSON.parse(localStorage.getItem("order"));
    // Sprawdzenie, czy dane zamówienia istnieją
    if (!orderData) {
      alert("Brak danych zamówienia!");
      window.location.href = "index.html"; // Przekierowanie na stronę główną, jeśli brak danych
    }
    return orderData;
  }

  // Funkcja do wyświetlania szczegółów zamówienia
  function displayOrderDetails() {
    const orderData = getOrderData();

    // Wyświetlanie produktów z zamówienia
    const checkoutItemsContainer = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    const deliveryMethodElement = document.getElementById("delivery-method");
    const addressElement = document.getElementById("address");
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");

    checkoutItemsContainer.innerHTML = "";
    let totalPrice = 0;

    // Wyświetlanie produktów z zamówienia
    orderData.items.forEach((product) => {
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");
      orderItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-details">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </div>
      `;
      checkoutItemsContainer.appendChild(orderItem);

      // Sumowanie ceny produktów
      totalPrice += parseFloat(
        product.price.replace(" PLN", "").replace(",", ".")
      );
    });

    // Wyświetlanie szczegółów zamówienia
    totalPriceElement.innerText = `${totalPrice.toFixed(2)} PLN`;
    deliveryMethodElement.innerText =
      orderData.deliveryMethod || "Brak metody dostawy";
    addressElement.innerText = orderData.address || "Brak adresu";
    nameElement.innerText = orderData.name || "Brak nazwy";
    emailElement.innerText = orderData.email || "Brak adresu email";
  }

  // Funkcja do usunięcia danych zamówienia z localStorage
  function clearOrderData() {
    localStorage.removeItem("order");
  }

  // Wyświetlanie szczegółów zamówienia po załadowaniu strony
  displayOrderDetails();

  // Dodanie nasłuchiwania na kliknięcie przycisku powrotu
  const returnButton = document.querySelector("button");
  if (returnButton) {
    returnButton.addEventListener("click", () => {
      clearOrderData(); // Usuwamy dane zamówienia przed przekierowaniem
    });
  }
});
