/**
 * Bobby Kamal Aizan - Contact Form & Direct Email Handoff
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
    const subjectInput = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      const requiredMsg = typeof getTranslation === 'function'
        ? getTranslation('contact_err_required')
        : 'Mohon lengkapi semua kolom yang wajib diisi (*).';
      showFormAlert(requiredMsg, 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const invalidEmailMsg = typeof getTranslation === 'function'
        ? getTranslation('contact_err_email')
        : 'Format alamat email tidak valid.';
      showFormAlert(invalidEmailMsg, 'error');
      return;
    }

    const recipient = 'bobbykamalaizan@gmail.com';
    const mailSubject = subjectInput || `Pesan Portofolio dari ${name}`;
    const mailBody = `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    if (submitBtn) {
      submitBtn.disabled = true;
      const openingText = typeof getTranslation === 'function'
        ? getTranslation('contact_btn_sending')
        : 'Membuka Email...';
      submitBtn.innerHTML = `<i class="bi bi-envelope-open me-1"></i> ${openingText}`;
    }

    window.location.href = mailtoUrl;

    localStorage.removeItem('bobby_portfolio_contact_draft');
    form.reset();

    if (submitBtn) {
      setTimeout(() => {
        submitBtn.disabled = false;
        const defaultSendText = typeof getTranslation === 'function'
          ? getTranslation('contact_btn_send')
          : 'Kirim via Email';
        submitBtn.innerHTML = `<i class="bi bi-send-fill me-1"></i> ${defaultSendText}`;
      }, 2000);
    }

    const successTemplate = typeof getTranslation === 'function'
      ? getTranslation('contact_toast_sent')
      : 'Aplikasi email dibuka untuk mengirim pesan dari {name} ({email}) ke bobbykamalaizan@gmail.com.';
    const successMsg = successTemplate.replace('{name}', name).replace('{email}', email);
    showFormAlert(successMsg, 'success');
  });

  function showFormAlert(message, type) {
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.className = `form-submit-alert ${type}`;
    alertBox.style.display = 'flex';

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 7500);
  }
}

function initCopyActions() {
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'bobbykamalaizan@gmail.com';
      const copiedText = typeof getTranslation === 'function'
        ? getTranslation('contact_toast_copied')
        : 'Alamat email berhasil disalin ke clipboard!';

      navigator.clipboard.writeText(email).then(() => {
        if (typeof showHudToast === 'function') {
          showHudToast(copiedText, 'bi-check-circle-fill text-success');
        }
      }).catch(() => {
        if (typeof showHudToast === 'function') {
          showHudToast(`Email: ${email}`, 'bi-envelope-fill');
        }
      });
    });
  }
}

function initDraftPersistence() {
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const msgInput = document.getElementById('contact-message');

  if (!nameInput || !emailInput || !msgInput) return;

  const saved = localStorage.getItem('bobby_portfolio_contact_draft');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.name) nameInput.value = data.name;
      if (data.email) emailInput.value = data.email;
      if (data.message) msgInput.value = data.message;
    } catch (e) {
      console.warn('Could not load draft:', e);
    }
  }

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
