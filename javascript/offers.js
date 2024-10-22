document.addEventListener("DOMContentLoaded", function () {
  fetch("data/offers.json")
    .then((response) => response.json())
    .then((data) => {
      const latestOffer = data.reduce(
        (max, offer) => (offer.id > max.id ? offer : max),
        data[0]
      );

      const latestOfferHTML = `
        <img src="${latestOffer.image}" alt="${latestOffer.title}" />
        <h2 class="offer-title">${latestOffer.title}</h2>
        <p class="offer-details">${latestOffer.details}</p>
        <p class="offer-price">${latestOffer.price}</p>
        <a href="${latestOffer.url}" class="offer-link">Zobacz ofertę</a>
      `;

      document.getElementById("latest-offer-fullrow").innerHTML =
        latestOfferHTML;

      const otherOffersHTML = data
        .filter((offer) => offer.id !== latestOffer.id)
        .map(
          (offer) => `
          <div class="offer-card">
            <img src="${offer.image}" alt="${offer.title}" class="offer-image" />
            <h3 class="offer-title">${offer.title}</h3>
            <p class="offer-price">${offer.price}</p>
            <a href="${offer.url}" class="offer-link">Zobacz ofertę</a>
          </div>
        `
        )
        .join("");

      document.getElementById("other-offers-container").innerHTML =
        otherOffersHTML;
    })
    .catch((error) => {
      console.error("Błąd przy wczytywaniu oferty:", error);
    });
});
