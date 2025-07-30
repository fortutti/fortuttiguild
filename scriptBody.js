

// 1. Инициализация галереи (без перезаписи важных стилей)
    function initGallery() {
        const gallery = document.querySelector('.collage-gallery');
        if (!gallery) return;
                
        // Сохраняем оригинальные отступы
        const originalGap = window.getComputedStyle(gallery).gap || '20px';
                
        // Применяем только необходимые стили
        gallery.style.opacity = '1';
        gallery.style.visibility = 'visible';
        gallery.style.gap = originalGap; // Восстанавливаем отступы
                
        console.log('Gallery initialized with gap:', originalGap);
    }

// 2. Анимация для других секций
    function initAnimations() {
        document.querySelectorAll('section:not(.collage-gallery)').forEach(section => {
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
                    
        setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        }, 200);
    });
}

// Главная функция инициализации
    function initAll() {
        initGallery();
        initFullscreen();
        initAnimations();
    }

// Запуск
if (document.readyState === 'complete') {
    initAll();
} else {
    document.addEventListener('DOMContentLoaded', initAll);
}

// Дополнительная инициализация через 100мс для страховки
setTimeout(initAll, 100);