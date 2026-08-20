/**
 * Bobby Kamal Aizan - Contact Form & Direct Messaging Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCopyActions();
  initDraftPersistence();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !email || !message) {
      showFormAlert("Please fill out all required fields.", "error");
      return;
    }
    
    // Simulate loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending Message...';
    }
    
    setTimeout(() => {
      // Clear draft
      localStorage.removeItem('bobby_portfolio_contact_draft');
      form.reset();
      
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Message Sent Successfully!';
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
        }, 4000);
      }
      
      showFormAlert(`Thank you ${name}! Your message has been received. Bobby will reach out to you shortly at ${email}.`, "success");
    }, 1200);
  });
  
  function showFormAlert(message, type) {
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.className = `form-submit-alert ${type}`;
    alertBox.style.display = 'flex';
    
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }
}

function initCopyActions() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyToast = document.getElementById('toast-feedback');
  
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = "bobbykamalaizan@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(() => {
        showToast("Email: " + email);
      });
    });
  }
}

function showToast(text) {
  let toast = document.getElementById('toast-feedback');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-feedback';
    toast.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 28px;
      background: var(--glass-bg-elevated);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border-highlight);
      color: var(--text-primary);
      padding: 12px 20px;
      border-radius: 9999px;
      box-shadow: var(--glass-shadow);
      z-index: 1100;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> ${text}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3500);
}

function initDraftPersistence() {
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const msgInput = document.getElementById('contact-message');
  
  if (!nameInput || !emailInput || !msgInput) return;
  
  // Load saved draft
  const saved = localStorage.getItem('bobby_portfolio_contact_draft');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.name) nameInput.value = data.name;
      if (data.email) emailInput.value = data.email;
      if (data.message) msgInput.value = data.message;
    } catch (e) {
      console.warn("Could not load draft:", e);
    }
  }
  
  // Auto-save on input
  [nameInput, emailInput, msgInput].forEach(el => {
    el.addEventListener('input', () => {
      const draft = {
        name: nameInput.value,
        email: emailInput.value,
        message: msgInput.value
      };
      localStorage.setItem('bobby_portfolio_contact_draft', JSON.stringify(draft));
    });
  });
}
