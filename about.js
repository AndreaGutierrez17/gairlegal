// Enquiry side panel (banner style)
(() => {
  const enq = document.getElementById("enq");
  if (!enq) return;

  const openers = document.querySelectorAll("[data-enq-open]");
  const closers = enq.querySelectorAll("[data-enq-close]");
  const panel = enq.querySelector(".enq-panel");

  const open = () => {
    enq.classList.add("is-open");
    enq.setAttribute("aria-hidden", "false");
    document.body.classList.add("enq-lock");

    // focus first input
    const first = enq.querySelector("input, select, textarea, button");
    if (first) setTimeout(() => first.focus(), 50);
  };

  const close = () => {
    enq.classList.remove("is-open");
    enq.setAttribute("aria-hidden", "true");
    document.body.classList.remove("enq-lock");
  };

  openers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  });

  closers.forEach(btn => btn.addEventListener("click", close));

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && enq.classList.contains("is-open")) close();
  });

  // click outside panel closes
  enq.addEventListener("click", (e) => {
    if (!panel) return;
    if (enq.classList.contains("is-open") && e.target === enq) close();
  });
})();
