/**
 * SAURABH PIGEON NET - MODERN INTERACTIONS SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCalculator();
  initFaqAccordion();
  initFormSubmissions();
  initScrollTop();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Interactive Price & Area Calculator
 */
function initCalculator() {
  const serviceSelect = document.getElementById('calc-service');
  const lengthInput = document.getElementById('calc-length');
  const heightInput = document.getElementById('calc-height');
  const areaDisplay = document.getElementById('calc-area-val');
  const priceDisplay = document.getElementById('calc-price-val');
  const bookBtn = document.getElementById('calc-book-btn');

  if (!serviceSelect || !lengthInput || !heightInput) return;

  const rates = {
    'balcony-net': { min: 16, max: 22, unit: 'sq.ft', name: 'Balcony Pigeon Netting' },
    'invisible-grill': { min: 110, max: 140, unit: 'sq.ft', name: 'Invisible Grill (316 SS)' },
    'bird-spikes': { min: 120, max: 160, unit: 'r.ft', name: 'Anti-Bird Spikes' },
    'bamboo-blinds': { min: 30, max: 45, unit: 'sq.ft', name: 'Bamboo Chicks & Netting' },
    'duct-net': { min: 14, max: 18, unit: 'sq.ft', name: 'Duct Area Bird Netting' },
    'safety-net': { min: 18, max: 26, unit: 'sq.ft', name: 'Children & Pet Safety Net' }
  };

  function updateCalculation() {
    const serviceKey = serviceSelect.value;
    const l = parseFloat(lengthInput.value) || 0;
    const h = parseFloat(heightInput.value) || 0;
    const rateInfo = rates[serviceKey] || rates['balcony-net'];

    let totalUnits = 0;
    if (serviceKey === 'bird-spikes') {
      // Linear feet
      totalUnits = l;
      areaDisplay.textContent = `${totalUnits.toFixed(0)} Running Feet`;
    } else {
      totalUnits = l * h;
      areaDisplay.textContent = `${totalUnits.toFixed(0)} Sq. Feet (${l} ft × ${h} ft)`;
    }

    if (totalUnits <= 0) {
      priceDisplay.textContent = '₹0';
      return;
    }

    const minPrice = Math.round(totalUnits * rateInfo.min);
    const maxPrice = Math.round(totalUnits * rateInfo.max);

    priceDisplay.textContent = `₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}*`;

    // Update WhatsApp pre-filled link
    const waText = encodeURIComponent(
      `Hello Saurabh Pigeon Net,\nI calculated an estimate on your website:\n• Service: ${rateInfo.name}\n• Dimensions: ${l} ft × ${h} ft (${totalUnits.toFixed(0)} ${rateInfo.unit})\n• Estimated Cost: ₹${minPrice} - ₹${maxPrice}\nPlease confirm availability for free inspection at my apartment.`
    );
    if (bookBtn) {
      bookBtn.href = `https://wa.me/919958586250?text=${waText}`;
    }
  }

  serviceSelect.addEventListener('change', updateCalculation);
  lengthInput.addEventListener('input', updateCalculation);
  heightInput.addEventListener('input', updateCalculation);

  // Initial calculation
  updateCalculation();
}

/**
 * FAQ Accordion Toggle
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const btn = otherItem.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isAlreadyActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Lead Form Submissions & WhatsApp Redirection
 */
function initFormSubmissions() {
  const forms = [
    { formId: 'hero-quote-form', msgId: 'hero-form-msg' },
    { formId: 'contact-page-form', msgId: 'contact-form-msg' }
  ];

  forms.forEach(({ formId, msgId }) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value || 'Customer';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const service = form.querySelector('[name="service"]')?.value || 'Bird Netting';
      const address = form.querySelector('[name="address"]')?.value || 'Greater Noida';

      if (!phone || phone.trim().length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      const waMessage = encodeURIComponent(
        `Hello Saurabh Pigeon Net,\nI would like to book a FREE Balcony/Site Inspection:\n• Name: ${name}\n• Mobile: ${phone}\n• Service: ${service}\n• Society/Location: ${address}\nPlease contact me to schedule.`
      );

      const msgEl = document.getElementById(msgId);
      if (msgEl) {
        msgEl.style.display = 'block';
        msgEl.innerHTML = `
          <div style="background:#ecfdf5; border:1px solid #6ee7b7; color:#065f46; padding:0.85rem; border-radius:8px; margin-top:1rem; font-size:0.875rem;">
            <strong>✓ Enquiry Received!</strong> Opening WhatsApp now to connect directly with Saurabh Pigeon Net team...
          </div>
        `;
      }

      setTimeout(() => {
        window.open(`https://wa.me/919958586250?text=${waMessage}`, '_blank');
      }, 700);
    });
  });
}

/**
 * Scroll To Top Helper
 */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
