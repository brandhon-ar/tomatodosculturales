// ===== SCRIPT PARA TOMATODOS CULTURALES =====

// 1. Resaltar el enlace activo del navbar al hacer scroll
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 120; // offset para el navbar fijo

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // ejecutar al cargar

  // 2. Smooth scroll para los enlaces del navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 70; // ajuste por navbar fijo
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        // Cerrar el menú en móvil
        const navbarCollapse = document.getElementById('navMenu');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // 3. Interacción simple con botones "Agregar"
  const addButtons = document.querySelectorAll('.btn-outline-primary');
  addButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = this.closest('.product-card');
      const productName = card.querySelector('.card-title').textContent;
      // Feedback visual
      const originalText = this.textContent;
      this.textContent = '✓ Agregado';
      this.classList.remove('btn-outline-primary');
      this.classList.add('btn-success');
      setTimeout(() => {
        this.textContent = originalText;
        this.classList.remove('btn-success');
        this.classList.add('btn-outline-primary');
      }, 1500);
      // Mostrar alerta simple
      alert(`🍅 ¡${productName} agregado al carrito!`);
    });
  });

  // 4. Efecto sutil al pasar el mouse sobre las tarjetas
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
});