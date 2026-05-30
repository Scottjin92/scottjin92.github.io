/* =========================================================
   Roger Yue — portfolio interactions
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  /* ----- Portfolio data (pulled from vimeo.com/rogeryue) ----- */
  const WORK = [
    { id: "1158911531", title: "Château des Rêves", cat: "Aerial", dur: "3:05" },
    { id: "1009982481", title: "133 Esplanade E — North Vancouver", cat: "Real Estate", dur: "2:04" },
    { id: "370975720", title: "ForestCure — “Tree of Life”", cat: "Documentary", dur: "10:37" },
    { id: "305631412", title: "Sleeping Beauty", cat: "Commercial", dur: "0:56" },
    { id: "286301216", title: "T&T Supermarket — “Love Is Simple”", cat: "Commercial", dur: "2:44" },
    { id: "286300787", title: "越北京 (Beyond Beijing) — Sean Zh", cat: "Music Video", dur: "3:01" },
    { id: "286300682", title: "Belford Properties — Art Wall III", cat: "Commercial", dur: "2:20" },
    { id: "286300639", title: "Belford Properties — Art Wall II", cat: "Commercial", dur: "1:50" },
    { id: "286300544", title: "Belford Properties — Art Wall I", cat: "Commercial", dur: "1:32" },
    { id: "286300357", title: "Infinity Health & Cosmetics", cat: "Commercial", dur: "1:01" },
    { id: "286300098", title: "6+1 — Sean Zh", cat: "Music Video", dur: "2:33" },
    { id: "286299369", title: "Speed Up Education", cat: "Commercial", dur: "4:08" },
    { id: "286299058", title: "Pencil Gang", cat: "Commercial", dur: "2:15" },
    { id: "286292324", title: "Ms. Understood — Sean Zh", cat: "Music Video", dur: "4:05" }
  ];
  const CATEGORIES = ["All", "Aerial", "Real Estate", "Commercial", "Music Video", "Documentary"];

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Render the work grid + filters
     --------------------------------------------------------- */
  function renderWork() {
    const grid = $("#workGrid");
    const filters = $("#filters");
    if (!grid) return;

    CATEGORIES.forEach((cat, i) => {
      const b = document.createElement("button");
      b.className = "filter" + (i === 0 ? " is-active" : "");
      b.type = "button";
      b.textContent = cat;
      b.dataset.cat = cat;
      filters.appendChild(b);
    });

    WORK.forEach((v) => {
      const card = document.createElement("button");
      card.className = "work-card reveal";
      card.type = "button";
      card.dataset.cat = v.cat;
      card.dataset.video = v.id;
      card.setAttribute("aria-label", "Play " + v.title);

      const thumb = document.createElement("span");
      thumb.className = "work-thumb";

      const img = document.createElement("img");
      img.src = "assets/thumbs/" + v.id + ".jpg";
      img.alt = v.title + " — still";
      img.loading = "lazy";

      const play = document.createElement("span");
      play.className = "play-btn";
      play.setAttribute("aria-hidden", "true");
      play.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

      const dur = document.createElement("span");
      dur.className = "work-duration";
      dur.textContent = v.dur;

      thumb.append(img, play, dur);

      const info = document.createElement("span");
      info.className = "work-info";
      const cat = document.createElement("span");
      cat.className = "work-cat"; cat.textContent = v.cat;
      const title = document.createElement("span");
      title.className = "work-title"; title.textContent = v.title;
      info.append(cat, title);

      card.append(thumb, info);
      grid.appendChild(card);
    });

    // Filtering
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", filters).forEach((f) => f.classList.toggle("is-active", f === btn));
      const cat = btn.dataset.cat;
      $$(".work-card", grid).forEach((card) => {
        card.classList.toggle("is-hidden", cat !== "All" && card.dataset.cat !== cat);
      });
    });
  }

  /* ---------------------------------------------------------
     Lightbox video player
     --------------------------------------------------------- */
  const lightbox = $("#lightbox");
  const lbFrame = $("#lightboxFrame");
  let lastFocus = null;

  function openVideo(id) {
    if (!lightbox || !id) return;
    lastFocus = document.activeElement;
    const iframe = document.createElement("iframe");
    iframe.src = "https://player.vimeo.com/video/" + id + "?autoplay=1&title=0&byline=0&portrait=0&dnt=1";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.setAttribute("allowfullscreen", "");
    iframe.title = "Video player";
    lbFrame.innerHTML = "";
    lbFrame.appendChild(iframe);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lightboxClose").focus();
  }

  function closeVideo() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lbFrame.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Delegate: any element with [data-video] opens the player
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-video]");
    if (trigger) { e.preventDefault(); openVideo(trigger.dataset.video); return; }
    if (e.target.closest("[data-close]")) closeVideo();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
  });

  /* ---------------------------------------------------------
     Hero background video (desktop, motion-friendly only)
     --------------------------------------------------------- */
  function heroVideo() {
    const media = $("#heroMedia");
    if (!media || reduceMotion || window.innerWidth < 768) return;
    const iframe = document.createElement("iframe");
    iframe.src = "https://player.vimeo.com/video/370975720?background=1&autoplay=1&loop=1&muted=1&dnt=1";
    iframe.allow = "autoplay; fullscreen";
    iframe.tabIndex = -1;
    iframe.setAttribute("aria-hidden", "true");
    media.appendChild(iframe);
  }

  /* ---------------------------------------------------------
     Sticky nav state + mobile menu
     --------------------------------------------------------- */
  function navBehaviour() {
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("#navToggle");
    const menu = $("#mobileMenu");
    const setMenu = (open) => {
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("is-open")); }
      else { menu.classList.remove("is-open"); setTimeout(() => (menu.hidden = true), 300); }
    };
    toggle.addEventListener("click", () => setMenu(menu.hidden));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  }

  /* ---------------------------------------------------------
     Scroll reveal + active section link
     --------------------------------------------------------- */
  function scrollEffects() {
    // mark elements to reveal
    const revealEls = $$(".section__head, .feature-card, .card, .about__media, .about__body, .contact__intro, .contact__form, .strip__item");
    revealEls.forEach((el) => el.classList.add("reveal"));

    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      $$(".reveal").forEach((el) => io.observe(el));
    } else {
      $$(".reveal").forEach((el) => el.classList.add("is-in"));
    }

    // active nav link
    const links = $$('.nav__links > a[href^="#"]');
    const map = new Map();
    links.forEach((l) => { const id = l.getAttribute("href").slice(1); const sec = document.getElementById(id); if (sec) map.set(sec, l); });
    if ("IntersectionObserver" in window && map.size) {
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            links.forEach((l) => l.classList.remove("is-active"));
            const active = map.get(en.target);
            if (active) active.classList.add("is-active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      map.forEach((_l, sec) => io2.observe(sec));
    }
  }

  /* ---------------------------------------------------------
     Contact form
     --------------------------------------------------------- */
  function contactForm() {
    const form = $("#contactForm");
    const status = $("#formStatus");
    if (!form) return;

    // placeholder social links shouldn't jump the page
    $$('a[data-placeholder]').forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));

    const isPlaceholder = form.action.indexOf("your-form-id") !== -1;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status";
      if (!form.checkValidity()) { form.reportValidity(); return; }

      // Not yet wired to a backend → fall back to a pre-filled email.
      if (isPlaceholder) {
        const d = new FormData(form);
        const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nProject: ${d.get("project_type")}\n\n${d.get("message")}`;
        window.location.href = `mailto:scottjin92@gmail.com?subject=${encodeURIComponent("Project enquiry — " + d.get("name"))}&body=${encodeURIComponent(body)}`;
        status.textContent = "Opening your email app… or write to scottjin92@gmail.com directly.";
        status.classList.add("is-ok");
        return;
      }

      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (res.ok) {
          form.reset();
          status.textContent = "Thanks — your message is on its way. I'll be in touch soon.";
          status.classList.add("is-ok");
        } else {
          throw new Error("bad response");
        }
      } catch (err) {
        status.textContent = "Something went wrong. Please email scottjin92@gmail.com instead.";
        status.classList.add("is-err");
      }
    });
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    renderWork();
    heroVideo();
    navBehaviour();
    scrollEffects();
    contactForm();
    const yr = $("#year");
    if (yr) yr.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
