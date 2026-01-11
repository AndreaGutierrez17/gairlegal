(function () {
  const chips = document.querySelectorAll(".pa2-chip");
  const items = Array.from(document.querySelectorAll(".pa2-item"));
  const empty = document.getElementById("pa2Empty");
  const search = document.getElementById("pa2Search");

  let active = "all";
  let q = "";

  function normalize(str){
    return (str || "").toLowerCase().trim();
  }

  function matches(item){
    const tags = normalize(item.getAttribute("data-tags"));
    const title = normalize(item.getAttribute("data-title"));

    const tagOK = (active === "all") || tags.includes(active);
    const qOK = !q || title.includes(q) || tags.includes(q);

    return tagOK && qOK;
  }

  function render(){
    let visible = 0;

    items.forEach(item => {
      const ok = matches(item);
      item.style.display = ok ? "" : "none";
      if(ok) visible++;
    });

    if(empty) empty.hidden = visible !== 0;
  }

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      chips.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      active = btn.getAttribute("data-filter") || "all";
      render();
    });
  });

  if(search){
    search.addEventListener("input", (e) => {
      q = normalize(e.target.value);
      render();
    });
  }

  render();
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
