// Функция для открытия изображения в полноэкранном режиме
        function openFullscreen(btn) {
            const img = btn.previousElementSibling;
            const modal = document.getElementById('imageModal');
            const fullscreenImg = document.getElementById('fullscreenImage');
            
            fullscreenImg.src = img.src;
            fullscreenImg.alt = img.alt;
            modal.style.display = 'flex';
        }

        // Функция для закрытия модального окна
        function closeModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        // Закрытие модального окна при клике вне изображения
        window.onclick = function(event) {
            const modal = document.getElementById('imageModal');
            if (event.target == modal) {
                closeModal();
            }
        }


