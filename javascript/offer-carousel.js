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

    // Wyświetlenie oferty z najwyższym id w sekcji "ostatnich ofert" zajmującej cały rząd
    const latestOffer = offers[0];
    const latestOfferCard = document.createElement("div");
    latestOfferCard.classList.add("offer-card", "fullrow");

    const latestOfferImage = document.createElement("img");
    latestOfferImage.src = latestOffer.image;
    latestOfferImage.alt = latestOffer.title;

    const latestOfferTitle = document.createElement("p");
    latestOfferTitle.classList.add("offer-title");
    latestOfferTitle.textContent = latestOffer.title;

    const latestOfferDetails = document.createElement("p");
    latestOfferDetails.classList.add("offer-details");
    latestOfferDetails.textContent = latestOffer.details;

    const latestOfferPrice = document.createElement("p");
    latestOfferPrice.classList.add("offer-price");
    latestOfferPrice.textContent = `Cena: ${latestOffer.price}`;

    const latestOfferLink = document.createElement("a");
    latestOfferLink.href = latestOffer.url;
    latestOfferLink.classList.add("offer-link");
    latestOfferLink.textContent = "Sprawdź ofertę";

    latestOfferCard.appendChild(latestOfferImage);
    latestOfferCard.appendChild(latestOfferTitle);
    latestOfferCard.appendChild(latestOfferDetails);
    latestOfferCard.appendChild(latestOfferPrice);
    latestOfferCard.appendChild(latestOfferLink);

    latestOfferFullRow.appendChild(latestOfferCard);

    // Tworzenie kontenera dla innych ofert (max 3 w rzędzie)
    otherOffersContainer.classList.add("offers-row");

    // Dodanie do kontenera maksymalnie 3 innych ofert
    offers.slice(1, 4).forEach((offer, index) => {
      const offerCard = document.createElement("div");
      offerCard.classList.add("offer-card");
      offerCard.style.animationDelay = `${index * 0.2}s`;

      const offerImage = document.createElement("img");
      offerImage.src = offer.image;
      offerImage.alt = offer.title;

      const offerTitle = document.createElement("p");
      offerTitle.classList.add("offer-title");
      offerTitle.textContent = offer.title;

      const offerDetails = document.createElement("p");
      offerDetails.classList.add("offer-details");
      offerDetails.textContent = offer.details;

      const offerPrice = document.createElement("p");
      offerPrice.classList.add("offer-price");
      offerPrice.textContent = `Cena: ${offer.price}`;

      const offerLink = document.createElement("a");
      offerLink.href = offer.url;
      offerLink.classList.add("offer-link");
      offerLink.textContent = "Sprawdź ofertę";

      offerCard.appendChild(offerImage);
      offerCard.appendChild(offerTitle);
      offerCard.appendChild(offerDetails);
      offerCard.appendChild(offerPrice);
      offerCard.appendChild(offerLink);

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
