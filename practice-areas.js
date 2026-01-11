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
