// javascript/offer-carousel.js

// Funkcja do generowania oferty
function createOfferElement(offer) {
  const offerElement = document.createElement("div");
  offerElement.classList.add("offer-item");

  offerElement.innerHTML = `
    <img src="${offer.image}" alt="${offer.title}" />
    <h2>${offer.title}</h2>
    <p>${offer.details}</p>
    <p class="price">${offer.price} PLN</p>
    <p class="expiry-date">Wygasa: ${offer.expiryDate}</p>
    <a href="${offer.url}" class="btn">Zobacz ofertę</a>
  `;
  return offerElement;
}

// Funkcja inicjalizująca karuzelę
function initCarousel(offers) {
  const carouselContainer = document.querySelector(".carousel-container");

  // Usuwamy wszystkie wcześniejsze oferty
  carouselContainer.innerHTML = "";

  offers.forEach((offer) => {
    const offerElement = createOfferElement(offer);
    carouselContainer.appendChild(offerElement);
  });

  let currentIndex = 0;

  function moveToNextOffer() {
    currentIndex++;
    if (currentIndex >= offers.length) currentIndex = 0; // Reset, jeśli osiągniemy ostatnią ofertę

    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  setInterval(moveToNextOffer, 3000); // Zmiana co 3 sekundy
}

// Funkcja do ładowania danych z pliku JSON
function loadOffers() {
  fetch("data/offers.json")
    .then((response) => response.json())
    .then((data) => {
      initCarousel(data); // Inicjalizujemy karuzelę z danymi z pliku
    })
    .catch((error) => {
      console.error("Błąd podczas ładowania ofert:", error);
    });
}

// Uruchomienie karuzeli po załadowaniu strony
window.addEventListener("load", loadOffers);
