(function () {
  const chips = document.querySelectorAll(".t-chip");
  const items = Array.from(document.querySelectorAll(".t-item"));
  const empty = document.getElementById("tEmpty");
  const search = document.getElementById("tSearch");

  let role = "all";
  let q = "";

  function norm(s){ return (s || "").toLowerCase().trim(); }

  function matches(item){
    const r = norm(item.getAttribute("data-role"));
    const n = norm(item.getAttribute("data-name"));
    const roleOK = (role === "all") || r === norm(role);
    const qOK = !q || n.includes(q) || r.includes(q);
    return roleOK && qOK;
  }

  function render(){
    let visible = 0;
    items.forEach(it => {
      const ok = matches(it);
      it.style.display = ok ? "" : "none";
      if(ok) visible++;
    });
    if(empty) empty.hidden = visible !== 0;
  }

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      chips.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      role = btn.getAttribute("data-role") || "all";
      render();
    });
  });

  if(search){
    search.addEventListener("input", (e) => {
      q = norm(e.target.value);
      render();
    });
  }

  render();
})();
