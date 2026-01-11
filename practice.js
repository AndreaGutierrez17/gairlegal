(function () {
  const experts = [
    {
      name: "Christie Blake",
      role: "Partner",
      img: "img/team/christie-blake.jpg",
      profile: "team.html"
    },
    {
      name: "Jennifer Gair",
      role: "Managing Partner",
      img: "img/team/jennifer-gair.jpg",
      profile: "team.html"
    },
    {
      name: "Anthony Cummins",
      role: "Director",
      img: "img/team/anthony-cummins.jpg",
      profile: "team.html"
    }
  ];

  const img = document.getElementById("expertImg");
  const name = document.getElementById("expertName");
  const role = document.getElementById("expertRole");
  const profile = document.getElementById("expertProfile");
  const dots = Array.from(document.querySelectorAll(".pr-expert-dots .dot"));

  if (!img || !name || !role || !profile || dots.length === 0) return;

  let i = 0;
  let timer = null;

  function setActive(index) {
    i = index;
    const e = experts[i];
    img.src = e.img;
    img.alt = e.name;
    name.textContent = e.name;
    role.textContent = e.role;
    profile.href = e.profile;

    dots.forEach(d => d.classList.remove("is-active"));
    const d = dots.find(x => Number(x.dataset.i) === i);
    if (d) d.classList.add("is-active");
  }

  function start() {
    stop();
    timer = setInterval(() => {
      const next = (i + 1) % experts.length;
      setActive(next);
    }, 4500);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  dots.forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.i || 0);
      setActive(idx);
      start();
    });
  });

  const card = document.getElementById("expertCard");
  if (card) {
    card.addEventListener("mouseenter", stop);
    card.addEventListener("mouseleave", start);
    card.addEventListener("focusin", stop);
    card.addEventListener("focusout", start);
  }

  setActive(0);
  start();
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
