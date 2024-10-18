// Funkcja dodająca klasę 'loaded' po załadowaniu strony
window.addEventListener("load", function () {
  // Dodajemy klasę 'loaded' do body, aby uruchomić animację
  document.body.classList.add("loaded");
});

// Funkcja do płynnego przejścia do strony "products.html"
document
  .getElementById("products-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Zapobiegamy domyślnemu działaniu linku

    // Dodajemy animację fade-out do body przed przejściem
    document.body.classList.add("fade-out");

    // Po zakończeniu animacji przejście do strony
    setTimeout(function () {
      window.location.href = "products.html"; // Przekierowanie na products.html
    }, 500); // Czas, po którym następuje przekierowanie (czas trwania animacji)
  });

// Funkcja wyszukiwania produktu
function searchProduct() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase(); // Pobiera tekst z pola wyszukiwania
  const products = [
    { name: "Produkt 1", url: "produkty/produkt1.html" },
    { name: "Produkt 2", url: "produkty/produkt2.html" },
    { name: "Produkt 3", url: "produkty/produkt3.html" },
    // Dodaj inne produkty tutaj
  ];

  // Szukamy najbliższego dopasowania
  const match = products.find((product) =>
    product.name.toLowerCase().includes(searchInput)
  );

  if (match) {
    // Jeśli znaleziono pasujący produkt, przekierowujemy do strony produktu
    window.location.href = match.url;
  } else {
    // Jeśli nie znaleziono, wyświetlamy komunikat o braku wyników
    alert("Produkt nie został znaleziony!");
  }
}
