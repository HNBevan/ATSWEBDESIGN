/* ---- FAQ ---- */
function toggleFaq(el) {
    const item = el.parentElement;
    document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('open'); });
    item.classList.toggle('open');
}

/* ---- Hide nav on scroll down, show on scroll up ---- */
(function () {
    const navbar = document.getElementById('navbar');
    let lastY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;

            if (y > 120) {
                navbar.classList.toggle('nav-hidden', y > lastY);
            } else {
                navbar.classList.remove('nav-hidden');
            }

            navbar.style.boxShadow = y > 50
                ? '0 4px 30px rgba(0,0,0,0.15)'
                : '0 2px 20px rgba(0,0,0,0.08)';

            lastY = y;
            ticking = false;
        });
    });
}());

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

/* ---- Mobile menu ---- */
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
    document.getElementById('searchOverlay').classList.remove('open');
});
document.querySelectorAll('#mobileMenu > a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

/* ---- Mobile accordion dropdowns ---- */
function initMobDropdown(btnId, bodyId) {
    var btn = document.getElementById(btnId);
    var body = document.getElementById(bodyId);
    if (!btn || !body) return;
    var chevron = btn.querySelector('.mob-chevron') || btn.closest('.mob-drop-split') && btn.closest('.mob-drop-split').querySelector('.mob-chevron');
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = body.classList.contains('open');
        body.classList.toggle('open', !isOpen);
        if (chevron) chevron.classList.toggle('open', !isOpen);
    });
}
initMobDropdown('mobRegionsBtn', 'mobRegionsBody');
initMobDropdown('mobBlogBtn', 'mobBlogBody');

/* Close accordions when mobile menu closes */
document.getElementById('hamburger').addEventListener('click', function () {
    if (!document.getElementById('mobileMenu').classList.contains('open')) {
        ['mobRegionsBody','mobBlogBody'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.classList.remove('open');
        });
        document.querySelectorAll('.mob-chevron').forEach(function(c) { c.classList.remove('open'); });
    }
});

/* ---- Mobile search button ---- */
var mobileSearchBtn = document.getElementById('searchToggleMobile');
if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', function () {
        var ov = document.getElementById('searchOverlay');
        if (!ov) return;
        if (ov.classList.contains('open')) {
            closeSearch();
        } else {
            openSearch();
            document.getElementById('mobileMenu').classList.remove('open');
        }
    });
}

/* ---- SEARCH ---- */
const searchData = [
    /* Pages */
    { title: 'About Us', desc: '18+ years delivering HSE-compliant training across the UK. Established 2006.', icon: 'fa-info-circle', href: 'about.html' },
    { title: 'Course Catalogue', desc: 'Browse all health, safety and first aid training courses', icon: 'fa-book-open', href: 'courses.html' },
    { title: 'Gallery', desc: 'Training sessions in action across the UK', icon: 'fa-images', href: 'gallery.html' },
    { title: 'Testimonials', desc: 'Client reviews and feedback from our training courses', icon: 'fa-star', href: 'testimonials.html' },
    { title: 'Blog', desc: 'Fire safety, first aid and workplace training guides', icon: 'fa-newspaper', href: 'blog.html' },
    { title: 'Contact Us', desc: 'Get in touch Mon-Fri 9am-5pm for a free, no-obligation quote', icon: 'fa-envelope', href: 'contact.html' },
    { title: 'Get a Free Quote', desc: 'Book on-site training - response within 24 hours', icon: 'fa-file-alt', href: 'contact.html' },
    /* Training regions */
    { title: 'London & South East Training', desc: 'On-site training across London, Kent, Sussex, Surrey and Essex', icon: 'fa-map-marker-alt', href: 'london-south-east.html' },
    { title: 'South West & Wales Training', desc: 'On-site training across Bristol, Cardiff, Exeter and Bath', icon: 'fa-map-marker-alt', href: 'south-west-wales.html' },
    { title: 'Midlands Training', desc: 'On-site training across Birmingham, Coventry, Nottingham and Leicester', icon: 'fa-map-marker-alt', href: 'midlands.html' },
    { title: 'North England & Scotland Training', desc: 'On-site training across Manchester, Leeds, Sheffield and Edinburgh', icon: 'fa-map-marker-alt', href: 'north-england-scotland.html' },
    /* First Aid courses */
    { title: 'Emergency First Aid at Work (EFAW)', desc: '1 day HSE-approved first aid course, valid 3 years, ideal for low-risk workplaces', icon: 'fa-first-aid', href: 'courses.html#first-aid' },
    { title: 'First Aid at Work (FAW)', desc: '3 day full qualification, HSE compliant, valid 3 years', icon: 'fa-first-aid', href: 'courses.html#first-aid' },
    { title: 'First Aid at Work Requalification', desc: 'FAW renewal course, 2 days, valid 3 years', icon: 'fa-first-aid', href: 'courses.html#first-aid' },
    { title: 'Paediatric First Aid', desc: 'Ofsted and EYFS compliant, 2 days, ideal for childcare nursery settings', icon: 'fa-first-aid', href: 'courses.html#first-aid' },
    { title: 'Basic First Aid Awareness', desc: 'Half day introductory first aid course with certificate', icon: 'fa-first-aid', href: 'courses.html#first-aid' },
    { title: 'BLS NHS Compliant', desc: 'Basic Life Support for healthcare and surgery professionals, annual renewal', icon: 'fa-heartbeat', href: 'courses.html#first-aid' },
    { title: 'AED & CPR Course', desc: 'Defibrillator and CPR training, half day, certificate included', icon: 'fa-heart', href: 'courses.html#first-aid' },
    /* Fire Safety courses */
    { title: 'Fire Warden Training', desc: 'Half day fire warden course, 1 year validity, all workplaces', icon: 'fa-fire-extinguisher', href: 'courses.html#fire-safety' },
    { title: 'Fire Marshal Training', desc: 'Full day senior fire marshal qualification', icon: 'fa-fire-extinguisher', href: 'courses.html#fire-safety' },
    { title: 'Fire Safety Awareness Training', desc: 'Live extinguisher practice, half to full day, suitable for all staff', icon: 'fa-fire', href: 'courses.html#fire-safety' },
    { title: 'Fire Risk Assessment', desc: 'Regulatory Reform (Fire Safety) Order 2005 compliance assessment for your premises', icon: 'fa-clipboard-check', href: 'courses.html#fire-safety' },
    { title: 'Fire Evacuation Chair Training', desc: 'Safe evacuation procedures for mobility-impaired persons, half day', icon: 'fa-wheelchair', href: 'courses.html#fire-safety' },
    /* Food Safety courses */
    { title: 'Level 1 Food Safety', desc: 'Half day introductory food hygiene and safety course with certificate', icon: 'fa-utensils', href: 'courses.html#food-safety' },
    { title: 'Level 2 Food Hygiene', desc: '1 day industry standard food hygiene including HACCP, certificate', icon: 'fa-utensils', href: 'courses.html#food-safety' },
    { title: 'Allergen Awareness Training', desc: "Natasha's Law, 14 allergens, half day with certificate", icon: 'fa-leaf', href: 'courses.html#food-safety' },
    /* Health & Safety courses */
    { title: 'Manual Handling Training', desc: 'Half day, safe lifting and carrying, Manual Handling Regulations 1992', icon: 'fa-hands-helping', href: 'courses.html#health-safety' },
    { title: 'Working at Heights Training', desc: '1 day fall prevention training, Work at Height Regulations 2005', icon: 'fa-arrow-up', href: 'courses.html#health-safety' },
    { title: 'Health & Safety Awareness', desc: 'Half day for all employees, induction-ready with certificate', icon: 'fa-hard-hat', href: 'courses.html#health-safety' },
    { title: 'IOSH Managing Safely', desc: '3 day internationally recognised qualification for managers and supervisors', icon: 'fa-hard-hat', href: 'courses.html#health-safety' },
    { title: 'Risk Assessment Training', desc: '1 day workplace hazard identification using the five steps methodology', icon: 'fa-clipboard-list', href: 'courses.html#health-safety' },
    { title: 'COSHH Awareness Training', desc: 'Control of Substances Hazardous to Health, half day, COSHH Regulations 2002', icon: 'fa-flask', href: 'courses.html#health-safety' },
    /* Specialist courses */
    { title: 'Disability Discrimination Awareness', desc: '3.5 hours, DDA legal compliance, inclusive and accessible workplace training', icon: 'fa-universal-access', href: 'courses.html#specialist' },
    { title: 'Mental Health First Aid', desc: 'MHFA 3.5 hours, ALGEE framework, mental wellbeing and stigma awareness', icon: 'fa-brain', href: 'courses.html#specialist' },
    /* Blog articles */
    { title: 'Fire Safety Training in London', desc: 'Guide to fire warden and fire marshal training requirements in London', icon: 'fa-fire', href: 'blog-fire-safety-london.html' },
    { title: 'Why First Aid Training is Crucial', desc: 'The importance of HSE-compliant workplace first aid training', icon: 'fa-first-aid', href: 'blog-first-aid-training.html' },
];

const toggle = document.getElementById('searchToggle');
const overlay = document.getElementById('searchOverlay');
const input = document.getElementById('searchInput');
const resultsBox = document.getElementById('searchResults');
const noResults = document.getElementById('searchNoResults');
const closeBtn = document.getElementById('searchClose');

function openSearch() {
    if (!overlay) return;
    overlay.classList.add('open');
    document.getElementById('mobileMenu').classList.remove('open');
    setTimeout(() => input && input.focus(), 50);
}
function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (input) input.value = '';
    if (resultsBox) { resultsBox.innerHTML = ''; resultsBox.classList.remove('has-results'); }
    if (noResults) noResults.classList.remove('show');
}

if (toggle) toggle.addEventListener('click', () => overlay.classList.contains('open') ? closeSearch() : openSearch());
if (closeBtn) closeBtn.addEventListener('click', closeSearch);

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
document.addEventListener('click', e => {
    if (overlay && !overlay.contains(e.target) && e.target !== toggle) closeSearch();
});

if (input) input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    resultsBox.innerHTML = '';
    resultsBox.classList.remove('has-results');
    noResults.classList.remove('show');
    if (!q) return;

    const matches = searchData.filter(d =>
        d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)
    );

    if (matches.length === 0) { noResults.classList.add('show'); return; }

    resultsBox.classList.add('has-results');
    matches.slice(0, 8).forEach(item => {
        const a = document.createElement('a');
        a.className = 'search-result-item';
        a.href = item.href;
        a.innerHTML = `
            <div class="search-result-icon"><i class="fas ${item.icon}"></i></div>
            <div class="search-result-text">
                <strong>${item.title}</strong>
                <span>${item.desc}</span>
            </div>`;
        a.addEventListener('click', closeSearch);
        resultsBox.appendChild(a);
    });
});

/* ---- Scroll reveal ---- */
(function () {
    function tag(el, dir, delay) {
        if (!el || el.hasAttribute('data-reveal')) return;
        el.setAttribute('data-reveal', dir || 'up');
        if (delay) el.style.transitionDelay = delay + 'ms';
    }
    function staggerChildren(parent, dir, stepMs) {
        if (!parent) return;
        [].forEach.call(parent.children, function (el, i) {
            tag(el, dir || 'up', i * (stepMs || 80));
        });
    }

    /* Section headers — cascade tag → title → subtitle */
    /* Skip tags inside hero sections — those use CSS animations */
    document.querySelectorAll('.section-tag').forEach(function (el) {
        if (!el.closest('.hero') && !el.closest('.page-hero') && !el.closest('.blog-hero')) {
            tag(el, 'fade', 0);
        }
    });
    document.querySelectorAll('.section-title').forEach(function (el) { tag(el, 'up', 70); });
    document.querySelectorAll('.section-subtitle').forEach(function (el) { tag(el, 'up', 150); });

    /* Trust bar */
    document.querySelectorAll('.trust-badge').forEach(function (el, i) { tag(el, 'fade', i * 45); });

    /* Hero form card */
    document.querySelectorAll('.hero-form-card').forEach(function (el) { tag(el, 'right', 200); });

    /* h1s NOT in hero sections — heroes use CSS animations instead */
    document.querySelectorAll('h1').forEach(function (el) {
        if (!el.closest('.hero') && !el.closest('.page-hero') && !el.closest('.blog-hero') && !el.closest('.article-hero')) {
            tag(el, 'up', 100);
        }
    });

    /* Two-column splits: image left, text right */
    document.querySelectorAll('.about-grid').forEach(function (g) {
        if (g.children[0]) tag(g.children[0], 'left', 0);
        if (g.children[1]) tag(g.children[1], 'right', 120);
    });
    document.querySelectorAll('.category-header').forEach(function (g) {
        tag(g.querySelector('.category-img'), 'left', 0);
        tag(g.querySelector('.category-info'), 'right', 100);
    });
    document.querySelectorAll('.compliance-grid').forEach(function (g) {
        if (g.children[0]) tag(g.children[0], 'left', 0);
        if (g.children[1]) tag(g.children[1], 'right', 100);
    });
    document.querySelectorAll('.benefits-grid').forEach(function (g) {
        if (g.children[0]) tag(g.children[0], 'left', 0);
        if (g.children[1]) tag(g.children[1], 'right', 100);
    });
    document.querySelectorAll('.contact-grid, .contact-layout').forEach(function (g) {
        if (g.children[0]) tag(g.children[0], 'left', 0);
        if (g.children[1]) tag(g.children[1], 'right', 120);
    });

    /* Staggered card grids — homepage */
    document.querySelectorAll('.courses-grid, .why-grid, .protection-grid').forEach(function (g) { staggerChildren(g, 'up', 90); });
    document.querySelectorAll('.testimonials-grid').forEach(function (g) { staggerChildren(g, 'up', 100); });
    document.querySelectorAll('.sectors-grid, .sectors-alt-grid').forEach(function (g) { staggerChildren(g, 'up', 55); });
    document.querySelectorAll('.compliance-badges').forEach(function (g) { staggerChildren(g, 'fade', 75); });
    document.querySelectorAll('.regions-grid, .coverage-grid').forEach(function (g) { staggerChildren(g, 'up', 90); });
    /* Courses page */
    document.querySelectorAll('.catalogue-grid').forEach(function (g) { staggerChildren(g, 'up', 65); });
    /* Gallery page */
    document.querySelectorAll('.gallery-grid').forEach(function (g) { staggerChildren(g, 'fade', 45); });
    /* Blog page */
    document.querySelectorAll('.blog-listing-grid').forEach(function (g) { staggerChildren(g, 'up', 100); });
    /* Testimonials page */
    document.querySelectorAll('.testimonials-page-grid').forEach(function (g) { staggerChildren(g, 'up', 80); });
    /* About page */
    document.querySelectorAll('.about-training-grid, .about-courses-grid, .about-coverage-grid').forEach(function (g) { staggerChildren(g, 'up', 80); });
    document.querySelectorAll('.about-stat-grid').forEach(function (g) { staggerChildren(g, 'fade', 80); });
    /* Regional pages */
    document.querySelectorAll('.mini-courses-grid, .courses-category-grid').forEach(function (g) { staggerChildren(g, 'up', 70); });
    /* Contact page form + info two-column */
    document.querySelectorAll('.contact-form-section-grid').forEach(function (g) {
        if (g.children[0]) tag(g.children[0], 'left', 0);
        if (g.children[1]) tag(g.children[1], 'right', 120);
    });
    /* Regional page area cards */
    document.querySelectorAll('.south-east-grid').forEach(function (g) { staggerChildren(g, 'up', 70); });
    /* Contact info cards row */
    document.querySelectorAll('.contact-info-cards').forEach(function (g) { staggerChildren(g, 'up', 70); });
    /* Legal pages */
    document.querySelectorAll('.legal-grid, .rights-grid').forEach(function (g) { staggerChildren(g, 'up', 80); });

    /* ── Misc standalone elements ── */
    document.querySelectorAll('.expert-card').forEach(function (el) { tag(el, 'up', 220); });
    document.querySelectorAll('.about-stat-card').forEach(function (el, i) { tag(el, 'fade', i * 120); });
    document.querySelectorAll('.anim-card').forEach(function (el) { tag(el, 'up'); });

    /* Split elements into two groups:
       - Above fold: trigger with setTimeout so the browser has time to
         paint the opacity:0 state first (works on cached refreshes too).
       - Below fold: use IntersectionObserver to reveal on scroll. */
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(function () { el.classList.add('visible'); }, 50);
        } else {
            io.observe(el);
        }
    });
}());

/* ---- Cookie consent banner ---- */
(function () {
    var consent = localStorage.getItem('ats_cookie_consent');
    if (consent) return; /* Already decided — no banner */

    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML =
        '<div class="cookie-banner-inner">' +
            '<div class="cookie-banner-text">' +
                '<p>We use essential cookies to keep the site running and, with your consent, <strong>Google Analytics</strong> to understand how visitors use our site. No personal data is sold or shared. ' +
                '<a href="cookie-policy.html">Cookie Policy</a> &middot; <a href="privacy-policy.html">Privacy Policy</a></p>' +
            '</div>' +
            '<div class="cookie-banner-actions">' +
                '<button class="btn-cookie-decline" id="cookieDecline">Essential Only</button>' +
                '<button class="btn-cookie-accept" id="cookieAccept">Accept Analytics</button>' +
            '</div>' +
        '</div>';

    document.body.appendChild(banner);

    function setConsent(choice) {
        localStorage.setItem('ats_cookie_consent', choice);
        banner.remove();
        if (choice === 'granted' && typeof gtag === 'function') {
            gtag('consent', 'update', { analytics_storage: 'granted' });
        }
    }

    document.getElementById('cookieAccept').addEventListener('click', function () { setConsent('granted'); });
    document.getElementById('cookieDecline').addEventListener('click', function () { setConsent('denied'); });
}());
