// ============================================
// BARAC — Main Script
// ============================================

(function () {
  // ===== Menu =====
  const toggle   = document.querySelector('.nav__toggle');
  const links    = document.querySelector('.nav__links');
  const backdrop = document.querySelector('.nav__backdrop');
  const body     = document.body;

  function openMenu() {
    if (!links) return;
    links.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (toggle) {
      toggle.classList.add('active');
      toggle.textContent = '✕';
      toggle.setAttribute('aria-expanded', 'true');
    }
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!links) return;
    links.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (toggle) {
      toggle.classList.remove('active');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    }
    body.style.overflow = '';
  }

  if (toggle && links) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      links.classList.contains('open') ? closeMenu() : openMenu();
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
    });
  }

  // ===== Nav shrink on scroll =====
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.padding = window.scrollY > 50 ? '0.75rem 0' : '1.25rem 0';
    });
  }

  // ===== Fade-in on scroll (fires once) =====
  const fadeTargets = document.querySelectorAll(
    '.card, .about__text, .about__image, .trust__grid > div, .cta__inner'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeTargets.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // ===== Team bio modal =====
  const BIOS = {
    bahadur: {
      name: 'Prof. Dr. Bahadur Meah',
      role: 'Director of Administration & Research',
      body: `
        <p>Prof. Dr. Bahadur Meah holds an MS and PhD in Plant Pathology and brings 42 years of research experience to BARAC. As Director of Administration & Research, he leads the firm's bio-pesticide and Integrated Pest Management (IPM) work.</p>
        <p>He formulated and developed Tricho-compost, Tricho-pesticide, Tricho-powder, Tricho-paste, Garlic Tablet, and Allamanda Tablet — bio-based products proven in laboratory, net-house, and farmer field trials. His work spans practical field trials, field days, and knowledge dissemination among farmers.</p>
        <p>He developed the Integrated Pest Management (IPM) Laboratory and established the Plant Disease Diagnostic Clinic (PDDC) in Bangladesh — the first of its kind in South East Asia. He has consulted as a Plant Pathologist and Trichoderma expert for FAO, INNOVISION Consulting, and DEVELOPMENT WHEEL.</p>
      `
    },

    mohammad: {
      name: 'Prof. Dr. Mohammad Ali',
      role: 'Technical Director & Founding Member',
      body: `
        <p>Prof. Dr. Mohammad Ali is a founding member and the Technical Director of BARAC Associates Ltd. His multidisciplinary background spans forestry, sustainable resource management, environmental policy, and pharmaceutical quality assurance.</p>
        <p>He holds a PhD from the University of Aberdeen (UK), a Master's from the Australian National University, and a BSc (Hons) in Forestry from the Institute of Forestry and Environmental Sciences, University of Chittagong (Bangladesh). His specializations include Forestry, Sustainable Resource and Environmental Management, and Land Use Policy.</p>
        <p>Dr. Ali has taught and researched at the University of Chittagong, North South University, ANU, Aberdeen, and the University of Guelph, covering subjects from agro-forestry and climate change to GIS, biodiversity, and environmental economics. He has published peer-reviewed articles, books, book chapters, and reports, and has led UN-funded development and research projects as Director and Technical Coordinator.</p>
      `
    },

    idris: {
      name: 'Dr. Idris Mohammed',
      role: 'Environmental Researcher',
      body: `
        <p>Dr. Idris Mohammed is a Canadian-Bangladeshi educator and researcher recognized by the World Health Organization (WHO) as a human ecologist. He received the International Certificate of Human Ecology from the WHO Regional Office for Europe (France) in 1994.</p>
        <p>He holds a BSc (Hons) in Forestry from the University of Chittagong, Bangladesh; a Master's in Environmental Science and a Postgraduate Diploma in Human Ecology from the Vrije Universiteit Brussel, Belgium; and a PhD in Forestry from the University of Toronto, Canada.</p>
        <p>His research has spanned dendrochronology at McGill, conifer plantation studies at the University of Toronto, and forest soils, bio-energy, and agro-forestry at the University of Guelph, where he served as Laboratory Manager of the Forest Soils and Agro-Forestry Research Laboratory for 12 years. He moved to Canada in December 1999 and has also worked on carbon sequestration projects in Eden Mills, Ontario.</p>
        <p>Earlier in his career he worked with James Finlay Plc. in Bangladesh — a pioneer of the Ratan Cane Plantation Project — and led bamboo and tea estate work at Baraoora and Gazipore. He has trained and supervised students and scientists across Ghana, Nigeria, Indonesia, India, France, Germany, and Canada.</p>
        <p>Dr. Mohammed is the founder and coordinator of the Bangladeshi Community of Guelph (BCG), helped reopen the Bangla School for Bangladeshi-Canadian children, and received the Canada 150 Community Leaders Award (2017) and the Guelph District Multicultural Award (2018).</p>
      `
    }
  };

  const bioModal   = document.getElementById('bio-modal');
  const bioContent = document.getElementById('modal-content');

  function openBio(key) {
    const m = BIOS[key];
    if (!m || !bioModal || !bioContent) return;
    bioContent.innerHTML = `<h2>${m.name}</h2><p class="role">${m.role}</p>${m.body}`;
    bioModal.classList.add('open');
    bioModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBio() {
    if (!bioModal) return;
    bioModal.classList.remove('open');
    bioModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-person]').forEach(btn => {
    btn.addEventListener('click', () => openBio(btn.dataset.person));
  });

  if (bioModal) {
    bioModal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', closeBio);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && bioModal.classList.contains('open')) closeBio();
    });
  }

  // ===== Gallery lightbox =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lightbox-img');
  const lbCaption    = document.getElementById('lightbox-caption');

  if (lightbox && galleryItems.length) {
    function openLightbox(src, caption) {
      if (lbImg) lbImg.src = src;
      if (lbImg) lbImg.alt = caption || '';
      if (lbCaption) lbCaption.textContent = caption || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img     = item.querySelector('img');
        const caption = item.querySelector('figcaption');
        if (img) openLightbox(img.src, caption ? caption.textContent : '');
      });
    });

    lightbox.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }
})();