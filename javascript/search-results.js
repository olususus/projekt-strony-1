document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query") || ""; // Jeśli brak query, użyj pustego ciągu
  const searchQueryElement = document.getElementById("search-query");

  // Jeśli element 'search-query' istnieje, ustawiamy tekst zapytania
  if (searchQueryElement) {
    searchQueryElement.textContent = query;
  }

  // Pobieramy dane o produktach z pliku JSON
  fetch("data/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Błąd podczas pobierania pliku JSON");
      }
      return response.json();
    })
    .then((products) => {
      // Filtrujemy produkty na podstawie zapytania
      const matchingProducts = products
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // Wyświetlamy maksymalnie 5 wyników

      const resultsList = document.getElementById("results-list");

      if (matchingProducts.length > 0) {
        matchingProducts.forEach((product) => {
          const productElement = document.createElement("div");
          productElement.classList.add("search-result-item");
          productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-info">
              <h3><a href="${product.url}">${product.name}</a></h3>
              <p>${product.price}</p>
            </div>
          `;
          resultsList.appendChild(productElement);
        });
      } else {
        resultsList.innerHTML = "<p>Nie znaleziono wyników.</p>";
      }
    })
    .catch((error) => {
      console.error("Błąd podczas ładowania produktów:", error);
      const resultsList = document.getElementById("results-list");
      if (resultsList) {
        resultsList.innerHTML =
          "<p>Wystąpił błąd podczas ładowania danych produktów.</p>";
      }
    });
});
