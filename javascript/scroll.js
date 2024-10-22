document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("back-to-top");

  // Wyświetl przycisk po przewinięciu w dół
  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      backToTopButton.classList.add("visible"); // Dodaj klasę
    } else {
      backToTopButton.classList.remove("visible"); // Usuń klasę
    }
  });

  // Dodaj działanie przycisku
  backToTopButton.addEventListener("click", () => {
    // Przewiń na górę
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Płynne przewijanie
    });

    // Stopniowe znikanie
    backToTopButton.classList.remove("visible"); // Zniknij przycisk
  });

  // Upewnij się, że przycisk zniknie po przewinięciu
  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop <= 300 &&
      document.documentElement.scrollTop <= 300
    ) {
      backToTopButton.classList.remove("visible"); // Zniknij przycisk
    }
  });
});
