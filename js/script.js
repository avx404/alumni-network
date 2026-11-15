/* Student Alumni Network | behaviour for all pages */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// 1. Theme toggle: saved choice, else system preference
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) { }
const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.setAttribute("data-theme", saved || (sysDark ? "dark" : "light"));
$("#themeBtn").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { }
});

// 2. Mobile menu
const menuBtn = $(".menu-btn"), menu = $("#menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
});

// 3. Back-to-top button
const topBtn = $("#topBtn");
window.addEventListener("scroll", () => { topBtn.hidden = window.scrollY < 300; });
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// 4. Directory live search
const search = $("#search");
if (search) {
  const rows = $$("#dirTable tbody tr"), count = $("#count");
  const update = () => {
    const term = search.value.toLowerCase().trim(); let n = 0;
    rows.forEach((r) => {
      const show = r.textContent.toLowerCase().includes(term);
      r.hidden = !show; if (show) n++;
    });
    count.textContent = n + " of " + rows.length + " alumni shown" + (n === 0 ? ". Try a different word." : "");
  };
  search.addEventListener("input", update); update();
}

// 5. Event filter
$$("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.filter;
    $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    $$("[data-category]").forEach((ev) => { ev.hidden = !(choice === "all" || ev.dataset.category === choice); });
  });
});

// 6. Registration form validation (browser-side only; nothing is stored)
const form = $("#regForm");
if (form) {
  const err = (id, msg) => { $("#" + id + "-error").textContent = msg; };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = form.elements; let ok = true, first = null;
    ["name", "email", "phone", "batch"].forEach((id) => err(id, ""));
    const fail = (id, msg) => { err(id, msg); ok = false; first = first || f[id]; };
    if (f.name.value.trim().length < 3) fail("name", "Enter your full name (at least 3 characters).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) fail("email", "Enter an email like name@example.com.");
    if (!/^[0-9]{10}$/.test(f.phone.value.trim())) fail("phone", "Enter exactly 10 digits, no spaces.");
    if (f.batch.value === "") fail("batch", "Select your batch.");
    if (!ok) { first.focus(); $("#formOk").textContent = ""; return; }
    $("#formOk").textContent = "Thank you, " + f.name.value.trim() + ". Your registration is recorded for this demo (not stored).";
    form.reset();
  });
}
