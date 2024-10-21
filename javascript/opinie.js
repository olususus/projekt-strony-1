document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  let opinionsData = [];

  // Pobieranie danych z JSON
  fetch("data/opinie.json")
    .then((response) => response.json())
    .then((data) => {
      opinionsData = data;
      renderOpinion(currentIndex);
    })
    .catch((error) => {
      console.error("Błąd przy wczytywaniu opinii:", error);
    });

  // Funkcja renderująca opinię
  function renderOpinion(index) {
    const box = document.querySelector(".box-opinia");
    const opinieKaruzela = document.querySelector(".opinie-karuzela");

    // Ukrycie obecnej opinii i pobranie nowej wysokości
    box.classList.remove("active");
    const tempContent = `
      <h2 class="opinia-owner">${opinionsData[index].name}</h2>
      <p class="opinia">${opinionsData[index].opinion}</p>
    `;
    box.innerHTML = tempContent;

    // Zmiana wysokości karuzeli na podstawie nowej treści
    opinieKaruzela.style.height = `${box.scrollHeight}px`;

    // Płynne pokazanie nowej opinii
    setTimeout(() => {
      box.classList.add("active");
    }, 300);
  }

  // Obsługa przycisków karuzeli
  document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % opinionsData.length;
    renderOpinion(currentIndex);
  });

  document.getElementById("prev").addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + opinionsData.length) % opinionsData.length;
    renderOpinion(currentIndex);
  });
});
