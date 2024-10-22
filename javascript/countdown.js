// Ustaw datę otwarcia nowej siłowni
const countdownDate = new Date("January 1, 2025 00:00:00").getTime();

// Aktualizuj co sekundę
const x = setInterval(function () {
  // Pobierz dzisiejszą datę i godzinę
  const now = new Date().getTime();

  // Oblicz odległość między teraz a datą otwarcia
  const distance = countdownDate - now;

  // Oblicz czas na dni, godziny, minuty i sekundy
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Wyświetl wyniki w odpowiednich elementach
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // Jeśli odliczanie się zakończy, wyświetl komunikat
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-timer").innerHTML =
      "Nowa siłownia otwarta!";
  }
}, 1000);
