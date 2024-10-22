document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    backToTopButton.classList.remove("visible");
  });

  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop <= 300 &&
      document.documentElement.scrollTop <= 300
    ) {
      backToTopButton.classList.remove("visible");
    }
  });
});
