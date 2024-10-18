document.addEventListener("DOMContentLoaded", () => {
  // Pobranie danych zamówienia z localStorage
  const order = JSON.parse(localStorage.getItem("order"));

  if (!order) {
    document.getElementById("confirmation-container").innerHTML =
      "<p>Brak danych o zamówieniu.</p>";
    return;
  }

  // Wyświetlanie szczegółów zamówienia
  const orderDetails = document.getElementById("order-details");
  orderDetails.innerHTML = `
    <h3>Informacje o zamówieniu</h3>
    <p><strong>Imię i Nazwisko:</strong> ${order.name}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Adres dostawy:</strong> ${order.address}</p>
    <p><strong>Telefon:</strong> ${order.phone}</p>
    <p><strong>Metoda dostawy:</strong> ${order.deliveryMethod}</p>
  `;

  // Wyświetlanie produktów
  const orderItems = document.getElementById("order-items");
  order.items.forEach((item) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");
    orderItem.innerHTML = `
      <p><strong>Produkt:</strong> ${item.name}</p>
      <p><strong>Cena:</strong> ${item.price}</p>
    `;
    orderItems.appendChild(orderItem);
  });

  // Wyświetlanie łącznej ceny
  const totalPriceElement = document.getElementById("order-total-price");
  totalPriceElement.innerText = `${order.totalPrice.toFixed(2)} PLN`;
});

document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do czyszczenia koszyka
  function clearCart() {
    localStorage.removeItem("cart"); // Usuwamy koszyk z localStorage
  }

  // Czysty koszyk po wczytaniu strony
  clearCart();
});
