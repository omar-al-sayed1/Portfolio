/* ============================================================
   Portfolio interactions — Omar Al Sayed
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Year ---- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Theme toggle (persisted) ---- */
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  try {
    const saved = localStorage.getItem("oas-theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}
  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("oas-theme", next); } catch (e) {}
    });
  }

  /* ---- Nav stuck state + scroll progress ---- */
  const nav = document.getElementById("nav");
  const bar = document.querySelector(".scroll-progress");
  function onScroll() {
    const sc = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("is-stuck", sc > 40);
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (sc / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-up stats ---- */
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseInt(el.getAttribute("data-count"), 10) || 0;
        let cur = 0;
        const step = Math.max(1, Math.round(target / 24));
        const tick = function () {
          cur += step;
          if (cur >= target) { el.textContent = target; return; }
          el.textContent = cur;
          requestAnimationFrame(tick);
        };
        tick();
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  /* ---- 3D tilt (pointer) ---- */
  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      const strength = el.classList.contains("portrait__frame") ? 8 : 6;
      const baseRotate = el.classList.contains("portrait__frame") ? 3 : 0;
      el.addEventListener("pointermove", function (e) {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(900px) rotateX(" + (-py * strength) + "deg) rotateY(" +
          (px * strength + baseRotate) + "deg) translateY(-4px)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = el.classList.contains("portrait__frame")
          ? "rotate(3deg)" : "";
      });
    });
  }
})();
