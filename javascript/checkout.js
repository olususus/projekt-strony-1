document.addEventListener("DOMContentLoaded", () => {
  // Funkcja do pobrania koszyka z localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Funkcja do wyświetlania produktów w koszyku
  function displayCheckoutItems() {
    const cart = getCart();
    const checkoutItemsContainer = document.getElementById("checkout-items");
    const totalPriceElement = document.getElementById("total-price");

    if (cart.length === 0) {
      checkoutItemsContainer.innerHTML = "<p>Twój koszyk jest pusty.</p>";
    } else {
      checkoutItemsContainer.innerHTML = "";
      let totalPrice = 0;

      cart.forEach((product) => {
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

        // Sumowanie ceny produktów
        totalPrice += parseFloat(
          product.price.replace(" PLN", "").replace(",", ".")
        );
      });

      // Wyświetlanie łącznej ceny
      totalPriceElement.innerText = `${totalPrice.toFixed(2)} PLN`;
    }
  }

  // Funkcja do złożenia zamówienia
  function submitOrder() {
    const cart = getCart();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const deliveryMethod = document.querySelector(
      'input[name="delivery"]:checked'
    );

    if (!name || !email || !address || !phone || !deliveryMethod) {
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

    // Wyślij dane zamówienia na serwer
    fetch("submit-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.text()) // Odczytaj odpowiedź jako tekst
      .then((data) => {
        console.log("Odpowiedź z serwera:", data);

        // Rozdziel odpowiedź, jeśli zawiera dwa obiekty JSON
        const splitData = data.split("}{").join("}|||{"); // Zmieniamy na unikalny separator
        const parts = splitData.split("|||");

        parts.forEach((part) => {
          try {
            const jsonResponse = JSON.parse(part);
            if (jsonResponse.success) {
              // Jeśli odpowiedź zawiera ID zamówienia, przekieruj użytkownika
              if (jsonResponse.order_id) {
                window.location.href = `order-confirmation.html?order_id=${jsonResponse.order_id}`;
              } else {
                console.log(jsonResponse.message); // Inny komunikat sukcesu
              }
            } else {
              alert("Wystąpił błąd podczas składania zamówienia.");
            }
          } catch (error) {
            console.error("Błąd podczas przetwarzania odpowiedzi JSON:", error);
            alert("Wystąpił błąd podczas składania zamówienia.");
          }
        });
      })
      .catch((error) => {
        console.error("Błąd:", error);
        alert("Wystąpił błąd podczas składania zamówienia.");
      });
  }

  // Funkcja do obliczenia łącznej ceny
  function calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += parseFloat(
        product.price.replace(" PLN", "").replace(",", ".")
      );
    });
    return totalPrice;
  }

  // Wyświetlanie produktów po załadowaniu strony
  displayCheckoutItems();

  // Obsługuje kliknięcie przycisku "Złóż zamówienie"
  const submitOrderButton = document.getElementById("place-order");
  if (submitOrderButton) {
    submitOrderButton.addEventListener("click", submitOrder);
  }
});
