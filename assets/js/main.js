(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    siteNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active nav link on scroll
  var sections = ['profile', 'skills', 'experience', 'projects', 'credentials', 'contact'];
  var navLinks = {};
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && href.charAt(0) === '#') navLinks[href.slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && navLinks[entry.target.id]) {
          Object.values(navLinks).forEach(function (a) { a.classList.remove('active'); });
          navLinks[entry.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  function copyText(text, feedbackMsg) {
    var feedback = document.getElementById('copyFeedback');
    function done() {
      if (feedback) {
        feedback.textContent = feedbackMsg;
        setTimeout(function () { feedback.textContent = ''; }, 2500);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
  }

  var copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      copyText('varungopal309@gmail.com', 'Email copied.');
    });
  }

  var copyProfileBtn = document.getElementById('copyProfileBtn');
  var profileJson = document.getElementById('profileJson');
  if (copyProfileBtn && profileJson) {
    copyProfileBtn.addEventListener('click', function () {
      copyText(profileJson.innerText.trim(), 'Profile JSON copied.');
    });
  }

  // Skills filter
  var filterInput = document.getElementById('skillFilter');
  var skillsGrid = document.getElementById('skillsGrid');
  var skillsEmpty = document.getElementById('skillsEmpty');
  if (filterInput && skillsGrid) {
    filterInput.addEventListener('input', function () {
      var q = filterInput.value.trim().toLowerCase();
      var visible = 0;
      skillsGrid.querySelectorAll('.skill-card').forEach(function (card) {
        var hay = (card.getAttribute('data-skills') || '') + ' ' + card.textContent.toLowerCase();
        var show = !q || hay.indexOf(q) !== -1;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (skillsEmpty) skillsEmpty.hidden = visible !== 0;
    });
  }

  // Contact form -> mailto (no backend, no data stored)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cfName').value.trim();
      var email = document.getElementById('cfEmail').value.trim();
      var message = document.getElementById('cfMessage').value.trim();
      var subject = encodeURIComponent('Portfolio enquiry from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:varungopal309@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
})();
