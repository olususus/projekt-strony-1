document.addEventListener("DOMContentLoaded", () => {
  function getOrderData() {
    const orderData = JSON.parse(localStorage.getItem("order"));
    if (!orderData) {
      alert("Brak danych zamówienia!");
      window.location.href = "index.html";
    }
    return orderData;
  }

  function displayOrderDetails() {
    const { items, totalPrice, deliveryMethod, address, name, email } =
      getOrderData();

    const checkoutItemsContainer = document.getElementById("order-items");
    checkoutItemsContainer.innerHTML = "";
    let total = 0;

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

    document.getElementById("total-price").innerText = `${total.toFixed(
      2
    )} PLN`;
    document.getElementById("delivery-method").innerText =
      deliveryMethod || "Brak metody dostawy";
    document.getElementById("address").innerText = address || "Brak adresu";
    document.getElementById("name").innerText = name || "Brak nazwy";
    document.getElementById("email").innerText = email || "Brak adresu email";
  }

  function clearOrderData() {
    localStorage.removeItem("order");
  }

  displayOrderDetails();

  document.querySelector("button")?.addEventListener("click", () => {
    clearOrderData();
  });
});
