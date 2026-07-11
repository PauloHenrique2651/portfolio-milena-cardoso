(function () {
  const ids = ['s1', 's2', 's3', 's4', 's5'];
  const sections = ids.map((id) => document.getElementById(id));
  const dots = Array.from(document.querySelectorAll('#dot-nav .dot'));
  const progressBar = document.getElementById('progress-bar');

  const heroBg = document.getElementById('hero-bg');
  const heroContent = document.getElementById('hero-content');
  const scrollHint = document.getElementById('scroll-hint');

  const aboutImg = document.getElementById('about-img');
  const aboutContent = document.getElementById('about-content');

  const interestsBg = document.getElementById('interests-bg');
  const interestsLabel = document.getElementById('interests-label');
  const interestsChips = document.getElementById('interests-chips');

  const momentImg = document.getElementById('moment-img');
  const momentContent = document.getElementById('moment-content');

  const contactContent = document.getElementById('contact-content');

  let rafId;
  function tick() {
    rafId = requestAnimationFrame(tick);
    const vh = window.innerHeight || 900;

    const p = sections.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return Math.max(0, Math.min(1, 1 - r.top / vh));
    });
    const [p1, p2, p3, p4, p5] = p;

    // dots
    let active = 0;
    for (let i = 0; i < 5; i++) if (p[i] > 0.5) active = i;
    dots.forEach((d, i) => d.classList.toggle('active', i === active));

    // progress bar
    const totalP = (p1 + p2 + p3 + p4 + p5) / 5;
    progressBar.style.width = (totalP * 100) + '%';

    // hero
    heroBg.style.transform = 'translateY(' + (p2 * vh * 0.18) + 'px)';
    heroContent.style.transform = 'translateY(' + (p2 * vh * 0.4) + 'px) scale(' + (1 - p2 * 0.1) + ')';
    heroContent.style.opacity = Math.max(0, 1 - p2 * 1.4);
    scrollHint.style.opacity = Math.max(0, 1 - p2 * 4);

    // about
    aboutImg.style.transform = 'translateY(' + (-p2 * 40 + (1 - p2) * 20) + 'px) scale(1.08)';
    aboutContent.style.opacity = p2;
    aboutContent.style.transform = 'translateY(' + ((1 - p2) * 50) + 'px)';

    // interests
    interestsBg.style.transform = 'translateY(' + ((1 - p3) * 30 - 15) + 'px)';
    interestsLabel.style.opacity = p3;
    interestsChips.style.opacity = p3;
    interestsChips.style.transform = 'translateY(' + ((1 - p3) * 40) + 'px)';

    // moment
    momentImg.style.transform = 'translateY(' + ((1 - p4) * 24 - 12) + 'px) scale(1.06)';
    momentContent.style.opacity = p4;
    momentContent.style.transform = 'translateY(' + ((1 - p4) * 36) + 'px)';

    // contact
    contactContent.style.opacity = p5;
    contactContent.style.transform = 'translateY(' + ((1 - p5) * 30) + 'px)';
  }
  rafId = requestAnimationFrame(tick);

  // custom cursor
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring && matchMedia('(pointer: fine)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let hovering = false;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      const el = e.target;
      const interactive = !!(el && el.closest && el.closest('a,button,[role="button"],img'));
      if (interactive !== hovering) {
        hovering = interactive;
        if (interactive) {
          ring.style.width = '58px';
          ring.style.height = '58px';
          ring.style.margin = '-29px 0 0 -29px';
          ring.style.background = 'oklch(0.65 0.19 350 / 0.35)';
        } else {
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.margin = '-18px 0 0 -18px';
          ring.style.background = 'transparent';
        }
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });

    function cursorTick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(cursorTick);
    }
    requestAnimationFrame(cursorTick);
  } else if (dot && ring) {
    dot.style.display = 'none';
    ring.style.display = 'none';
  }
})();
