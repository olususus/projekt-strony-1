document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  let opinionsData = [];

  fetch("data/opinie.json")
    .then((response) => response.json())
    .then((data) => {
      opinionsData = data;
      renderOpinion(currentIndex);
    })
    .catch((error) => {
      console.error("Błąd przy wczytywaniu opinii:", error);
    });

  function renderOpinion(index) {
    const box = document.querySelector(".box-opinia");
    const opinieKaruzela = document.querySelector(".opinie-karuzela");

    box.classList.remove("active");
    const tempContent = `
      <h2 class="opinia-owner">${opinionsData[index].name}</h2>
      <p class="opinia">${opinionsData[index].opinion}</p>
    `;
    box.innerHTML = tempContent;

    opinieKaruzela.style.height = `${box.scrollHeight}px`;

    setTimeout(() => {
      box.classList.add("active");
    }, 300);
  }

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
