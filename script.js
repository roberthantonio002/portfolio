'use strict';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const printCvBtn = document.getElementById('printCvBtn');
if (printCvBtn) {
  printCvBtn.addEventListener('click', () => window.print());
}

const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    const phone = '5548999990000';
    const text = encodeURIComponent('Olá Lucas, analisei seu portfólio profissional e gostaria de conversar sobre uma oportunidade.');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  });
}

const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyFeedback = document.getElementById('copyFeedback');

if (copyEmailBtn && copyFeedback) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = 'lucas.mendes@contabilidadeexec.com.br';
    try {
      await navigator.clipboard.writeText(email);
      copyFeedback.textContent = 'Endereço de e-mail copiado para a área de transferência.';
      setTimeout(() => { copyFeedback.textContent = ''; }, 4000);
    } catch {
      copyFeedback.textContent = `E-mail: ${email}`;
    }
  });
}

const recruiterForm = document.getElementById('recruiterForm');
const formStatus = document.getElementById('formStatus');
const submitFormBtn = document.getElementById('submitFormBtn');

if (recruiterForm && formStatus) {
  recruiterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value.trim();

    submitFormBtn.disabled = true;
    submitFormBtn.textContent = 'Enviando...';

    setTimeout(() => {
      formStatus.textContent = `Obrigado, ${name}! Sua mensagem sobre "${subject}" foi preparada com sucesso.`;
      recruiterForm.reset();
      submitFormBtn.disabled = false;
      submitFormBtn.textContent = 'Enviar Mensagem';

      const mailtoBody = encodeURIComponent(`Nome/Empresa: ${name}\nE-mail de retorno: ${email}\n\nMensagem:\n${message}`);
      window.location.href = `mailto:lucas.mendes@contabilidadeexec.com.br?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${mailtoBody}`;
    }, 600);
  });
}