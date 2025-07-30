// Инициализация меню
function initNavbar() {
    // Мобильное меню
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarNav = document.getElementById('navbarNav');

    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarNav.classList.toggle('active');
        });
    }

    // Подсветка активной страницы
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'fortuttiguild.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Обработчик логотипа
    const navLogo = document.getElementById('navLogo');
    if (navLogo) {
        navLogo.addEventListener('click', function(e) {
            if (window.location.pathname.includes('fortuttiguild.html')) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (navbarNav) navbarNav.classList.remove('active');
                if (navbarToggler) navbarToggler.classList.remove('active');
            }
        });
    }
}

// Обработчик изменения размера окна
function handleResize() {
    const navbarNav = document.getElementById('navbarNav');
    const navbarToggler = document.getElementById('navbarToggler');
    
    if (window.innerWidth > 992) {
        if (navbarNav) navbarNav.classList.remove('active');
        if (navbarToggler) navbarToggler.classList.remove('active');
    }
}

// Запуск при загрузке и изменении размера окна
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    window.addEventListener('resize', handleResize);
});