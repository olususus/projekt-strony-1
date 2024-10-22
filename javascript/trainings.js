document.addEventListener("DOMContentLoaded", () => {
  fetch("data/trainings.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("trainings-container");
      data.forEach((training) => {
        const trainingElement = document.createElement("div");
        trainingElement.className = "training-box";
        trainingElement.innerHTML = `
                    <h2>${training.name}</h2>
                    <p><strong>Data:</strong> ${new Date(
                      training.date
                    ).toLocaleString("pl-PL")}</p>
                    <p><strong>Miejsce:</strong> ${training.location}</p>
                    <p><strong>Czas trwania:</strong> ${training.duration}</p>
                    <p>${training.description}</p>
                `;
        container.appendChild(trainingElement);
      });
    })
    .catch((error) => console.error("Błąd w ładowaniu treningów:", error));
});
