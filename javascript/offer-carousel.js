fetch("data/offers.json")
  .then((response) => response.json())
  .then((offers) => {
    const offersContainer = document.getElementById("offers-container");
    const latestOfferFullRow = document.getElementById("latest-offer-fullrow");
    const otherOffersContainer = document.getElementById(
      "other-offers-container"
    );

    // Sortowanie ofert według id (od największego do najmniejszego)
    offers.sort((a, b) => b.id - a.id);

    // Funkcja do tworzenia karty oferty
    function createOfferCard(offer, isFullRow = false) {
      const offerCard = document.createElement("div");
      offerCard.classList.add("offer-card", isFullRow ? "fullrow" : "");

      offerCard.innerHTML = `
        <img src="${offer.image}" alt="${offer.title}" />
        <p class="offer-title">${offer.title}</p>
        <p class="offer-details">${offer.details}</p>
        <p class="offer-price">Cena: ${offer.price}</p>
        <a href="${offer.url}" class="offer-link">Sprawdź ofertę</a>
      `;

      return offerCard;
    }

    // Wyświetlenie oferty z najwyższym id w sekcji "ostatnich ofert" zajmującej cały rząd
    latestOfferFullRow.appendChild(createOfferCard(offers[0], true));

    // Tworzenie kontenera dla innych ofert (max 3 w rzędzie)
    otherOffersContainer.classList.add("offers-row");

    // Dodanie do kontenera maksymalnie 3 innych ofert
    offers.slice(1, 4).forEach((offer, index) => {
      const offerCard = createOfferCard(offer);
      offerCard.style.animationDelay = `${index * 0.2}s`;
      otherOffersContainer.appendChild(offerCard);
    });

    // Dodanie kontenerów do głównego kontenera
    offersContainer.appendChild(latestOfferFullRow);
    offersContainer.appendChild(otherOffersContainer);

    // Animacja dla kontenera z ofertami
    offersContainer.style.animation = "fadeIn 1s forwards";
  })
  .catch((error) => {
    console.error("Błąd wczytywania ofert:", error);
  });
