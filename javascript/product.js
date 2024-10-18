document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelector(".add-tocart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
      const product = {
        name: "Karnet - Project Sigma Gym",
        price: "99,99 PLN",
        image: "karnet1.png", // Dopasuj do faktycznej nazwy obrazu w folderze "images"
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Produkt dodany do koszyka!");

      // Opcjonalnie: zaktualizowanie ikony koszyka, jeśli chcesz to zrobić tutaj
      const cartLink = document.querySelector(".cart-link img");
      if (cartLink) {
        cartLink.setAttribute("alt", `Koszyk (${cart.length})`);
      }
    });
  }
});
