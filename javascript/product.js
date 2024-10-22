document.addEventListener("DOMContentLoaded", () => {
  function getProductIdFromURL() {
    return parseInt(new URLSearchParams(window.location.search).get("id"));
  }

  const productId = getProductIdFromURL();
  console.log("Product ID from URL:", productId);
  fetch("./data/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Błąd podczas pobierania pliku JSON");
      }
      return response.json();
    })
    .then((products) => {
      console.log("Products loaded:", products);
      const product = products.find((p) => p.id === productId);

      if (product) {
        document.getElementById("product-name").textContent = product.name;
        document.getElementById(
          "product-price"
        ).textContent = `Cena: ${product.price}`;
        document.getElementById("product-img").src = product.image;
        document.getElementById("product-img").alt = product.name;
        document.getElementById("product-description").textContent =
          product.description;
      } else {
        displayProductNotFound();
      }

      document.getElementById("add-tocart").addEventListener("click", () => {
        if (product) {
          addToCart(product);
        }
      });
    })
    .catch((error) => {
      console.error("Błąd podczas ładowania produktów:", error);
      alert("Wystąpił problem z załadowaniem danych produktu.");
    });

  function displayProductNotFound() {
    document.getElementById("product-name").textContent =
      "Produkt nie znaleziony";
    document.getElementById("product-price").textContent = "";
    document.getElementById("product-img").src = "";
    document.getElementById("product-description").textContent = "";
  }

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produkt dodany do koszyka!");
  }
});
