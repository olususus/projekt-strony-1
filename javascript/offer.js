async function generatePlan() {
  const goal = document.getElementById("goal").value;
  const intensity = document.getElementById("intensity").value;
  const duration = document.getElementById("duration").value;

  try {
    const response = await fetch("data/personalised.json");
    const trainings = await response.json();

    const filteredTrainings = trainings.filter(
      (training) =>
        training.goal === goal &&
        training.intensity === intensity &&
        training.duration <= duration
    );

    displayPlan(filteredTrainings);
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
}

function displayPlan(trainings) {
  const planList = document.getElementById("plan-list");
  planList.innerHTML = "";

  if (trainings.length > 0) {
    trainings.forEach((training) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
  <strong>${training.name}</strong> - Czas: ${training.duration} minut
  <div class="training-description">
    ${training.description}
  </div>
`;

      listItem.addEventListener("mouseenter", () => {
        listItem.classList.add("show-description");
      });
      listItem.addEventListener("mouseleave", () => {
        listItem.classList.remove("show-description");
      });
      planList.appendChild(listItem);
    });
  } else {
    planList.innerHTML = "<li>Nie znaleziono odpowiednich treningów</li>";
  }
}

document
  .getElementById("show-all-trainings-btn")
  .addEventListener("click", async function () {
    try {
      const response = await fetch("data/personalised.json");
      const trainings = await response.json();

      const planList = document.getElementById("plan-list");
      planList.innerHTML = "";

      trainings.forEach((training) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          ${training.name} - Cel: ${training.goal}, Intensywność: ${training.intensity}, Czas: ${training.duration} min
          <div class="training-description">
            Opis treningu: ${training.description}
          </div>
        `;
        listItem.addEventListener("mouseenter", () => {
          listItem.classList.add("show-description");
        });
        listItem.addEventListener("mouseleave", () => {
          listItem.classList.remove("show-description");
        });
        planList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Błąd przy pobieraniu treningów:", error);
    }
  });
