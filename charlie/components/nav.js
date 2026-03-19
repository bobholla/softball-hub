/**
 * Shared navigation component for softball.softballdynasty.com
 * Injects the top nav bar, sidebar, and overlay into every page.
 * Usage: <script src="/components/nav.js"></script> at end of <body>
 *
 * Each page sets window.currentPage before loading this script to highlight
 * the active sidebar link. Example:
 *   <script>window.currentPage = 'training/philosophy';</script>
 *   <script src="/components/nav.js"></script>
 */

(function () {
  const page = window.currentPage || '';

  function active(id) {
    return page === id ? ' active' : '';
  }

  function current(id) {
    return page === id ? ' sidebar-link-current' : '';
  }

  function href(path) {
    return '/' + path;
  }

  // Build top nav
  const topNav = document.createElement('nav');
  topNav.className = 'top-nav';
  topNav.innerHTML = `
    <a href="${href('index.html')}" class="nav-brand">
      <div class="nav-brand-icon">\u{1F94E}</div>
      <div>
        <span class="nav-brand-text">Charlie Holladay</span>
        <span class="nav-brand-sub">Softball Dynasty</span>
      </div>
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle sidebar">&#9776;</button>
  `;

  // Build overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebarOverlay';

  // Build sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';
  sidebar.innerHTML = `
    <div class="sidebar-label">Home</div>
    <div class="sidebar-section">
      <a href="${href('index.html')}" class="sidebar-link${active('home')}">
        <span class="link-icon">\u{1F3E0}</span> Dashboard
      </a>
    </div>

    <div class="sidebar-label">Training</div>
    <div class="sidebar-section">
      <a href="${href('training/index.html')}" class="sidebar-link${active('training/dashboard')}">
        <span class="link-icon">\u{1F4CB}</span> Dashboard
      </a>
      <a href="${href('training/athlete-profile.html')}" class="sidebar-link${active('training/athlete-profile')}">
        <span class="link-icon">\u{1F464}</span> Athlete Profile
      </a>
      <a href="${href('training/philosophy.html')}" class="sidebar-link${active('training/philosophy')}">
        <span class="link-num">01</span> Training Philosophy
      </a>
      <a href="${href('training/offseason.html')}" class="sidebar-link${active('training/offseason')}">
        <span class="link-num">02</span> Offseason Program
      </a>
      <a href="${href('training/preseason.html')}" class="sidebar-link${active('training/preseason')}">
        <span class="link-num">03</span> Preseason Program
      </a>
      <a href="${href('training/inseason.html')}" class="sidebar-link${active('training/inseason')}">
        <span class="link-num">04</span> In-Season Program
      </a>
      <a href="${href('training/summer.html')}" class="sidebar-link${active('training/summer')}">
        <span class="link-num">05</span> Summer Program
      </a>
      <a href="${href('training/exercises.html')}" class="sidebar-link${active('training/exercises')}">
        <span class="link-num">06</span> Exercise Library
      </a>
      <a href="${href('training/hitting-dev.html')}" class="sidebar-link${active('training/hitting-dev')}">
        <span class="link-num">07</span> Hitting Development
      </a>
      <a href="${href('training/arm-care.html')}" class="sidebar-link${active('training/arm-care')}">
        <span class="link-num">08</span> Arm Care
      </a>
      <a href="${href('training/mobility.html')}" class="sidebar-link${active('training/mobility')}">
        <span class="link-num">09</span> Mobility &amp; Recovery
      </a>
      <a href="${href('training/nutrition.html')}" class="sidebar-link${active('training/nutrition')}">
        <span class="link-num">10</span> Nutrition
      </a>
      <a href="${href('training/testing.html')}" class="sidebar-link${active('training/testing')}">
        <span class="link-num">11</span> Testing &amp; Tracking
      </a>
      <a href="${href('training/troubleshooting.html')}" class="sidebar-link${active('training/troubleshooting')}">
        <span class="link-num">12</span> Troubleshooting
      </a>
      <a href="${href('training/recovery-program.html')}" class="sidebar-link${current('training/recovery-program')}">
        <span class="link-icon">\u2B50</span> Nerve Recovery Program
      </a>
    </div>

    <div class="sidebar-label">Hitting Program</div>
    <div class="sidebar-section">
      <a href="${href('training/hitting/index.html')}" class="sidebar-link${active('training/hitting/index')}">
        <span class="link-icon">\u26BE</span> Power Hitting
      </a>
      <a href="${href('training/hitting/routines.html')}" class="sidebar-link${active('training/hitting/routines')}">
        <span class="link-icon">\u{1F4C5}</span> Routines
      </a>
      <a href="${href('training/hitting/mechanics.html')}" class="sidebar-link${active('training/hitting/mechanics')}">
        <span class="link-icon">\u2699</span> Mechanics
      </a>
      <a href="${href('training/hitting/bat-speed.html')}" class="sidebar-link${active('training/hitting/bat-speed')}">
        <span class="link-icon">\u26A1</span> Bat Speed
      </a>
      <a href="${href('training/hitting/pitch-recognition.html')}" class="sidebar-link${active('training/hitting/pitch-recognition')}">
        <span class="link-icon">\u{1F441}</span> Pitch Recognition
      </a>
      <a href="${href('training/hitting/elite-hitters.html')}" class="sidebar-link${active('training/hitting/elite-hitters')}">
        <span class="link-icon">\u{1F31F}</span> Elite Hitters
      </a>
    </div>

    <div class="sidebar-label">Recruiting</div>
    <div class="sidebar-section">
      <a href="${href('recruiting/index.html')}" class="sidebar-link${active('recruiting/dashboard')}">
        <span class="link-icon">\u{1F4CB}</span> Dashboard
      </a>
      <a href="${href('recruiting/timeline.html')}" class="sidebar-link${active('recruiting/timeline')}">
        <span class="link-icon">\u{1F4C5}</span> Timeline
      </a>
      <a href="${href('recruiting/measurables.html')}" class="sidebar-link${active('recruiting/measurables')}">
        <span class="link-icon">\u{1F4CA}</span> Measurables
      </a>
      <a href="${href('recruiting/tournaments.html')}" class="sidebar-link${active('recruiting/tournaments')}">
        <span class="link-icon">\u{1F3C6}</span> Tournaments
      </a>
      <a href="${href('recruiting/social-media.html')}" class="sidebar-link${active('recruiting/social-media')}">
        <span class="link-icon">\u{1F4F1}</span> Social Media
      </a>
      <a href="${href('recruiting/coach-contact.html')}" class="sidebar-link${active('recruiting/coach-contact')}">
        <span class="link-icon">\u2709</span> Coach Contact
      </a>
      <a href="${href('recruiting/camps.html')}" class="sidebar-link${active('recruiting/camps')}">
        <span class="link-icon">\u26FA</span> Camps
      </a>
      <a href="${href('recruiting/profile.html')}" class="sidebar-link${active('recruiting/profile')}">
        <span class="link-icon">\u{1F4C4}</span> Player Profile
      </a>
    </div>

    <div class="sidebar-label">Game Prep</div>
    <div class="sidebar-section">
      <a href="${href('pitch-calling/index.html')}" class="sidebar-link${active('pitch-calling/index')}">
        <span class="link-icon">\u{1F3AF}</span> Pitch Calling Guide
      </a>
    </div>
  `;

  // Insert into page
  document.body.insertBefore(topNav, document.body.firstChild);
  document.body.insertBefore(overlay, topNav.nextSibling);

  // If the page uses a .layout wrapper, insert sidebar inside it
  const layout = document.querySelector('.layout');
  if (layout) {
    layout.insertBefore(sidebar, layout.firstChild);
  } else {
    document.body.insertBefore(sidebar, overlay.nextSibling);
  }

  // Toggle logic
  const toggle = document.getElementById('navToggle');
  const sidebarEl = document.getElementById('sidebar');
  const overlayEl = document.getElementById('sidebarOverlay');

  function toggleMenu() {
    sidebarEl.classList.toggle('open');
    overlayEl.classList.toggle('open');
  }

  toggle.addEventListener('click', toggleMenu);
  overlayEl.addEventListener('click', toggleMenu);

  // Close sidebar on link click (mobile)
  sidebarEl.querySelectorAll('.sidebar-link').forEach(function (link) {
    link.addEventListener('click', function () {
      sidebarEl.classList.remove('open');
      overlayEl.classList.remove('open');
    });
  });
})();
