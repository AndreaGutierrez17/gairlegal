(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  const ok = document.getElementById("ok");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const required = form.querySelectorAll("[required]");
    let valid = true;

    required.forEach(el => {
      const isCheckbox = el.type === "checkbox";
      const okField = isCheckbox ? el.checked : (el.value && el.value.trim().length > 1);

      el.classList.toggle("is-invalid", !okField);
      el.classList.toggle("is-valid", okField);
      if (!okField) valid = false;
    });

    if (!valid) return;

    ok?.classList.remove("d-none");
    form.reset();
    required.forEach(el => el.classList.remove("is-valid","is-invalid"));
    ok?.scrollIntoView({behavior:"smooth", block:"start"});
  });
})();

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
