/**
 * Eventina Organisers — Forms System & Lead Capture Engine
 * Pure Vanilla JavaScript (Zero Dependencies)
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. ENQUIRY FORM HANDLER
  // ==========================================================================
  const enquiryForm = document.getElementById('enquiry-form');
  const enquirySuccessCard = document.getElementById('enquiry-success');
  const enquirySubmitBtn = document.getElementById('enquiry-submit-btn');
  const enquiryRefSpan = document.getElementById('enquiry-ref-id');
  const newEnquiryBtn = document.getElementById('new-enquiry-btn');

  // Set min date for date input to today
  const eventDateInput = document.getElementById('event-date');
  if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.min = today;
  }

  // Pre-fill service from URL param if available (e.g. ?service=weddings)
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const serviceCheckbox = document.querySelector(`input[name="services"][value="${serviceParam}"]`);
    if (serviceCheckbox) {
      serviceCheckbox.checked = true;
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    // Allows 10-digit Indian numbers or international + format
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^\+?[0-9]{10,14}$/.test(cleaned);
  }

  function showError(fieldId, errorMsg) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (field) {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.add('is-visible');
    }
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (field) {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.classList.remove('is-visible');
      errorEl.textContent = '';
    }
  }

  // Bind live clear on input
  ['client-name', 'client-phone', 'client-email', 'event-type', 'event-date', 'event-city', 'event-budget', 'privacy-consent'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id));
      el.addEventListener('change', () => clearError(id));
    }
  });

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('client-name')?.value.trim();
      const phone = document.getElementById('client-phone')?.value.trim();
      const email = document.getElementById('client-email')?.value.trim();
      const eventType = document.getElementById('event-type')?.value;
      const eventDate = document.getElementById('event-date')?.value;
      const city = document.getElementById('event-city')?.value.trim();
      const budget = document.getElementById('event-budget')?.value;
      const privacyConsent = document.getElementById('privacy-consent')?.checked;
      const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);

      // 1. Name validation
      if (!name || name.length < 2) {
        showError('client-name', 'Please provide your full name.');
        isValid = false;
      } else {
        clearError('client-name');
      }

      // 2. Phone validation
      if (!phone || !validatePhone(phone)) {
        showError('client-phone', 'Please enter a valid phone number (e.g. +91 98765 43210).');
        isValid = false;
      } else {
        clearError('client-phone');
      }

      // 3. Email validation
      if (!email || !validateEmail(email)) {
        showError('client-email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError('client-email');
      }

      // 4. Event type
      if (!eventType) {
        showError('event-type', 'Please select an event format.');
        isValid = false;
      } else {
        clearError('event-type');
      }

      // 5. Event date
      if (!eventDate) {
        showError('event-date', 'Please select your anticipated event date.');
        isValid = false;
      } else {
        clearError('event-date');
      }

      // 6. City
      if (!city || city.length < 2) {
        showError('event-city', 'Please state the city or destination venue.');
        isValid = false;
      } else {
        clearError('event-city');
      }

      // 7. Budget
      if (!budget) {
        showError('event-budget', 'Please select an approximate budget range.');
        isValid = false;
      } else {
        clearError('event-budget');
      }

      // 8. Service requirements check
      const servicesErrorEl = document.getElementById('services-error');
      if (selectedServices.length === 0) {
        if (servicesErrorEl) {
          servicesErrorEl.textContent = 'Please select at least one service requirement.';
          servicesErrorEl.classList.add('is-visible');
        }
        isValid = false;
      } else if (servicesErrorEl) {
        servicesErrorEl.classList.remove('is-visible');
      }

      // Privacy Consent
      if (!privacyConsent) {
        showError('privacy-consent', 'You must agree to the privacy policy to proceed.');
        isValid = false;
      } else {
        clearError('privacy-consent');
      }

      if (!isValid) {
        // Focus first invalid element
        const firstInvalid = enquiryForm.querySelector('.is-invalid, input[aria-invalid="true"]');
        firstInvalid?.focus();
        return;
      }

      // Simulate form submission & database dispatch
      if (enquirySubmitBtn) {
        enquirySubmitBtn.disabled = true;
        enquirySubmitBtn.innerHTML = `
          <span>Submitting Details...</span>
          <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; animation: spin 1s linear infinite;" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
        `;
      }

      // Generate Reference Code
      const randomRef = 'EVT-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      const leadPayload = {
        reference: randomRef,
        timestamp: new Date().toISOString(),
        client: { name, phone, email },
        event: {
          type: eventType,
          date: eventDate,
          city: city,
          budget: budget,
          services: selectedServices,
          notes: document.getElementById('event-notes')?.value.trim() || ''
        }
      };

      // Store in localStorage for persistence / dashboard review
      try {
        const storedLeads = JSON.parse(localStorage.getItem('eventina_leads') || '[]');
        storedLeads.push(leadPayload);
        localStorage.setItem('eventina_leads', JSON.stringify(storedLeads));
      } catch (err) {
        // Safe fallback
      }

      setTimeout(() => {
        enquiryForm.style.display = 'none';
        if (enquirySuccessCard) {
          enquirySuccessCard.classList.add('is-active');
        }
        if (enquiryRefSpan) {
          enquiryRefSpan.textContent = randomRef;
        }

        // Scroll to success card smoothly
        enquirySuccessCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 700);
    });
  }

  if (newEnquiryBtn && enquiryForm && enquirySuccessCard) {
    newEnquiryBtn.addEventListener('click', () => {
      enquiryForm.reset();
      enquiryForm.style.display = 'block';
      enquirySuccessCard.classList.remove('is-active');
      if (enquirySubmitBtn) {
        enquirySubmitBtn.disabled = false;
        enquirySubmitBtn.innerHTML = `
          <span>Submit Event Enquiry</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 10H16M11 5L16 10L11 15" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      }
    });
  }

  // ==========================================================================
  // 2. CONTACT US QUICK MESSAGE FORM HANDLER
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const contactSuccessAlert = document.getElementById('contact-success-alert');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || name.length < 2) {
        showError('contact-name', 'Please provide your name.');
        isValid = false;
      } else {
        clearError('contact-name');
      }

      if (!email || !validateEmail(email)) {
        showError('contact-email', 'Please provide a valid email address.');
        isValid = false;
      } else {
        clearError('contact-email');
      }

      if (!phone || !validatePhone(phone)) {
        showError('contact-phone', 'Please enter a valid phone number.');
        isValid = false;
      } else {
        clearError('contact-phone');
      }

      if (!message || message.length < 10) {
        showError('contact-message', 'Please write a brief message of at least 10 characters.');
        isValid = false;
      } else {
        clearError('contact-message');
      }

      if (!isValid) return;

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = `<span>Sending Message...</span>`;
      }

      setTimeout(() => {
        contactForm.reset();
        if (contactSuccessAlert) {
          contactSuccessAlert.style.display = 'block';
          contactSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = `
            <span>Send Message</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 10H16M11 5L16 10L11 15" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
        }
      }, 600);
    });
  }

})();
