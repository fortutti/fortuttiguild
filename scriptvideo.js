function getVKVideoUrl(videoId) {
    const oid = "-227639548";
    return `https://vk.com/video_ext.php?oid=${oid}&id=${videoId}&hash=057a3b534b3c6c35`;
}

// Восстановление позиции и подсветка видео при возврате из плеера
function handleVideoNavigation() {
    const navData = sessionStorage.getItem('videoNavigation');
    if (navData) {
        const { id, source, scrollY } = JSON.parse(navData);
        
        if (source === 'player') {
            setTimeout(() => {
                // Восстанавливаем позицию прокрутки
                if (scrollY) {
                    window.scrollTo(0, scrollY);
                }

                // Находим элемент видео в галерее
                const videoLink = document.querySelector(`.video-item a[href*="id=${id}"]`);
                
                if (videoLink) {
                    const videoItem = videoLink.closest('.video-item');
                    
                    // Прокручиваем к видео (дополнительно)
                    setTimeout(() => {
                        videoItem.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                        
                        // Подсвечиваем видео
                        videoItem.classList.add('highlighted-video');
                        
                        // Убираем подсветку через 3 секунды
                        setTimeout(() => {
                            videoItem.classList.remove('highlighted-video');
                        }, 3000);
                    }, 100);
                }
            }, 100);
            
            sessionStorage.removeItem('videoNavigation');
        }
    }
}

// Сохранение позиции перед переходом в плеер
function saveVideoPosition(videoId) {
    sessionStorage.setItem('videoNavigation', JSON.stringify({
        id: videoId,
        source: 'gallery',
        scrollY: window.scrollY
    }));
}

// Настройка обработчиков событий для видео
function setupVideoLinks() {
    const videoLinks = document.querySelectorAll('.video-link, .video-item a[href*="player.html"]');
    
    videoLinks.forEach(link => {
        // Сохранение позиции при клике
        link.addEventListener('click', function(e) {
            const videoId = this.getAttribute('data-video-id') || 
                           this.getAttribute('href').split('id=')[1].split('&')[0];
            saveVideoPosition(videoId);
        });
        
        // Подсветка при наведении
        link.addEventListener('mouseenter', function() {
            const videoItem = this.closest('.video-item');
            if (videoItem) {
                videoItem.classList.add('video-hover');
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const videoItem = this.closest('.video-item');
            if (videoItem) {
                videoItem.classList.remove('video-hover');
            }
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем стили для подсветки
    const style = document.createElement('style');
    style.textContent = `
        .video-item.highlighted-video {
            transform: scale(1.03);
            box-shadow: 0 0 15px rgba(255, 140, 0, 0.7);
            transition: all 0.3s ease;
        }
        .video-item.video-hover {
            transform: scale(1.02);
            box-shadow: 0 0 10px rgba(255, 140, 0, 0.5);
            transition: all 0.2s ease;
        }
    `;
    document.head.appendChild(style);

    // Инициализация функций
    setupVideoLinks();
    handleVideoNavigation();

    // Функция для мгновенной сортировки
    function sortVideosInstantly() {
        const gallery = document.querySelector('.video-gallery');
        if (!gallery) return;
        
        const videos = Array.from(gallery.querySelectorAll('.video-item'));
                
        videos.sort((a, b) => {
            const dateA = getDateFromVideoItem(a);
            const dateB = getDateFromVideoItem(b);
            return dateB - dateA;
        });
                
        const originalTransition = gallery.style.transition;
        gallery.style.transition = 'none';
                
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }
                
        videos.forEach(video => {
            gallery.appendChild(video);
        });
                
        setTimeout(() => {
            gallery.style.transition = originalTransition;
        }, 0);
    }
            
    function getDateFromVideoItem(videoItem) {
        const dateText = videoItem.querySelector('.video-date')?.textContent;
        if (!dateText) return new Date(0);
        const [day, month, year] = dateText.split('.').map(Number);
        return new Date(year, month - 1, day);
    }
            
    // Сортировка при загрузке
    setTimeout(sortVideosInstantly, 0);
            
    // Полноэкранный просмотр видео
    const videoFullscreen = document.querySelector('.video-fullscreen');
    if (videoFullscreen) {
        const fullscreenContainer = videoFullscreen.querySelector('.fullscreen-container');
        const closeFullscreenBtn = videoFullscreen.querySelector('.close-fullscreen');
        const videoLinks = document.querySelectorAll('.video-link');
                
        // Открытие видео в полноэкранном режиме
        function openFullscreenVideo(videoId) {
            const vkVideoUrl = `https://vk.com/video_ext.php?oid=-227639548&id=${videoId}`;
            
            fullscreenContainer.innerHTML = `
                <iframe src="${vkVideoUrl}" 
                        width="100%" 
                        height="100%" 
                        frameborder="0" 
                        allowfullscreen="1" 
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture">
                </iframe>
            `;
            
            videoFullscreen.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
                
        // Закрытие полноэкранного режима
        function closeFullscreenVideo() {
            fullscreenContainer.innerHTML = '';
            videoFullscreen.classList.remove('active');
            document.body.style.overflow = '';
        }
                
        // Обработка кликов по видео
        videoLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const videoId = this.getAttribute('data-video-id') || 
                                this.getAttribute('href').split('id=')[1].split('&')[0];
                openFullscreenVideo(videoId);
            });
                    
            // Обработка касаний для мобильных устройств
            link.addEventListener('touchend', function(e) {
                if (e.cancelable) {
                    e.preventDefault();
                }
                const videoId = this.getAttribute('data-video-id') || 
                                this.getAttribute('href').split('id=')[1].split('&')[0];
                openFullscreenVideo(videoId);
            }, { passive: false });
        });
                
        // Закрытие по кнопке
        closeFullscreenBtn.addEventListener('click', closeFullscreenVideo);
                
        // Закрытие по клику вне видео
        videoFullscreen.addEventListener('click', function(e) {
            if (e.target === this) {
                closeFullscreenVideo();
            }
        });
                
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoFullscreen.classList.contains('active')) {
                closeFullscreenVideo();
            }
        });
                
        // Управление жестами для мобильных устройств
        let touchStartX = 0;
        let touchStartY = 0;
                
        videoFullscreen.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });
                
        videoFullscreen.addEventListener('touchend', function(e) {
            if (e.changedTouches.length === 1) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const diffX = touchEndX - touchStartX;
                const diffY = touchEndY - touchStartY;
                        
                // Закрытие свайпом вниз
                if (Math.abs(diffY) > 50 && diffY > 0 && Math.abs(diffY) > Math.abs(diffX)) {
                    closeFullscreenVideo();
                }
            }
        }, { passive: true });
    }
});