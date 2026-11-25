'use strict';

/* ==========================================================
   PORTFÓLIO · Lucas Mendes
   Os dados de contato ficam no index.html (e-mail e telefone);
   este arquivo só lê o que está lá, para não haver dois lugares a atualizar.
   ========================================================== */

const $ = id => document.getElementById(id);

/* ---------- ANO NO RODAPÉ ---------- */
const yearEl = $('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- MENU DO CELULAR ---------- */
const menuToggle = $('menuToggle');
const navMenu = $('navMenu');

if (menuToggle && navMenu) {
  const definirMenu = aberto => {
    navMenu.classList.toggle('active', aberto);
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  };

  menuToggle.addEventListener('click', () => definirMenu(!navMenu.classList.contains('active')));

  // Fecha ao escolher um item, ao tocar fora ou ao apertar Esc
  navMenu.addEventListener('click', e => { if (e.target.closest('a')) definirMenu(false); });
  document.addEventListener('click', e => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) definirMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      definirMenu(false);
      menuToggle.focus();
    }
  });

  // Se a tela crescer (ex.: girar o celular), volta ao menu normal
  window.matchMedia('(min-width: 961px)').addEventListener('change', e => {
    if (e.matches) definirMenu(false);
  });

  /* ---------- DESTAQUE DA SEÇÃO ATUAL NO MENU ---------- */
  if ('IntersectionObserver' in window) {
    const links = new Map(
      [...navMenu.querySelectorAll('a[href^="#"]')].map(a => [a.getAttribute('href').slice(1), a])
    );

    const observador = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (!entrada.isIntersecting) return;
        links.forEach(l => l.removeAttribute('aria-current'));
        const atual = links.get(entrada.target.id);
        if (atual) atual.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(s => observador.observe(s));
  }
}

/* ---------- IMPRIMIR / SALVAR EM PDF ---------- */
const printCvBtn = $('printCvBtn');
if (printCvBtn) printCvBtn.addEventListener('click', () => window.print());

/* ---------- CONTATO ---------- */
const emailLink = $('emailLink');
const phoneLink = $('phoneLink');
const EMAIL = emailLink ? emailLink.textContent.trim() : '';

// Mantém o botão do WhatsApp sempre igual ao telefone que aparece na página
const whatsappBtn = $('whatsappBtn');
if (whatsappBtn && phoneLink) {
  const digitos = phoneLink.getAttribute('href').replace(/\D/g, '');
  const texto = 'Olá Lucas, analisei seu portfólio profissional e gostaria de conversar sobre uma oportunidade.';
  if (digitos) whatsappBtn.href = `https://wa.me/${digitos}?text=${encodeURIComponent(texto)}`;
}

const copyEmailBtn = $('copyEmailBtn');
const copyFeedback = $('copyFeedback');

if (copyEmailBtn && copyFeedback && EMAIL) {
  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyFeedback.textContent = 'Endereço de e-mail copiado para a área de transferência.';
      setTimeout(() => { copyFeedback.textContent = ''; }, 4000);
    } catch (erro) {
      copyFeedback.textContent = `E-mail: ${EMAIL}`;
    }
  });
}

/* ---------- FORMULÁRIO (abre o e-mail do visitante com a mensagem pronta) ---------- */
const recruiterForm = $('recruiterForm');
const formStatus = $('formStatus');

if (recruiterForm && formStatus && EMAIL) {
  recruiterForm.addEventListener('submit', e => {
    e.preventDefault();

    const nome = $('senderName').value.trim();
    const email = $('senderEmail').value.trim();
    const assunto = $('senderSubject').value;
    const mensagem = $('senderMessage').value.trim();

    const corpo = `Nome/Empresa: ${nome}\r\nE-mail de retorno: ${email}\r\n\r\nMensagem:\r\n${mensagem}`;
    const url = `mailto:${EMAIL}?subject=${encodeURIComponent(`${assunto} - ${nome}`)}&body=${encodeURIComponent(corpo)}`;

    formStatus.textContent = 'Abrimos o seu aplicativo de e-mail com a mensagem pronta. Revise e envie. Se nada abriu, use o e-mail de contato ao lado.';
    window.location.href = url;
  });
}