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
