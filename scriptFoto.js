(() => {
      const gallery = document.querySelector('.gallery-grid');
      const fullscreenViewer = document.querySelector('.fullscreen-viewer');
      const fullscreenImage = document.querySelector('.fullscreen-image');
      const fullscreenImageContainer = document.querySelector('.fullscreen-image-container');
      const btnPrev = document.querySelector('.prev');
      const btnNext = document.querySelector('.next');
      const closeBtn = document.querySelector('.close-viewer');

      // Collect photo items data
      const photoItems = Array.from(gallery.querySelectorAll('.gallery-image-container'));
      const photos = photoItems.map((item) => {
        const img = item.querySelector('img');
        const caption = item.closest('.gallery-item').querySelector('.caption-text').innerHTML;
        return {
          src: img.src,
          alt: img.alt,
          caption,
        };
      });

      let currentIndex = null;
      let lastFocusedElement = null;
      let scrollPosition = 0;
      let isZoomed = false;
      let initialDistance = null;
      let initialScale = 1;
      let startX = 0;
      let startY = 0;
      let translateX = 0;
      let translateY = 0;

      // Open fullscreen viewer for given index
      function openFullscreen(index) {
        if (index < 0 || index >= photos.length) return;
        currentIndex = index;
        const photo = photos[index];
        fullscreenImage.src = photo.src;
        fullscreenImage.alt = photo.alt;
        fullscreenViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
        scrollPosition = window.scrollY;
        lastFocusedElement = document.activeElement;
        resetImageTransform();
      }

      // Close fullscreen viewer and restore focus
      function closeFullscreen() {
        fullscreenViewer.classList.remove('active');
        document.body.style.overflow = '';
        fullscreenImage.src = '';
        fullscreenImage.alt = '';
        window.scrollTo(0, scrollPosition);
        if (lastFocusedElement && lastFocusedElement.focus) {
          lastFocusedElement.focus();
        }
        currentIndex = null;
        resetImageTransform();
      }

      // Reset image transform
      function resetImageTransform() {
        isZoomed = false;
        fullscreenImage.style.transform = 'scale(1) translate(0, 0)';
        fullscreenImage.classList.remove('zoomed');
        initialScale = 1;
        translateX = 0;
        translateY = 0;
      }

      // Show next photo
      function showNext() {
        if (currentIndex === null) return;
        let nextIndex = currentIndex + 1;
        if (nextIndex >= photos.length) nextIndex = 0;
        openFullscreen(nextIndex);
      }

      // Show previous photo
      function showPrev() {
        if (currentIndex === null) return;
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = photos.length - 1;
        openFullscreen(prevIndex);
      }

      // Handle pinch zoom
      function handlePinch(e) {
        e.preventDefault();
        if (e.touches.length === 2) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const currentDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
          );

          if (initialDistance === null) {
            initialDistance = currentDistance;
            initialScale = isZoomed ? 1.5 : 1;
          } else {
            const scale = (currentDistance / initialDistance) * initialScale;
            fullscreenImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            if (scale > 1.2) {
              isZoomed = true;
              fullscreenImage.classList.add('zoomed');
            } else {
              isZoomed = false;
              fullscreenImage.classList.remove('zoomed');
            }
          }
        }
      }

      // Handle touch move for panning
      function handleTouchMove(e) {
        if (!isZoomed) return;
        e.preventDefault();
        
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          const deltaX = touch.clientX - startX;
          const deltaY = touch.clientY - startY;
          
          translateX += deltaX;
          translateY += deltaY;
          
          // Apply limits to prevent dragging too far
          const maxTranslate = 100;
          translateX = Math.max(-maxTranslate, Math.min(maxTranslate, translateX));
          translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
          
          fullscreenImage.style.transform = `scale(1.5) translate(${translateX}px, ${translateY}px)`;
          
          startX = touch.clientX;
          startY = touch.clientY;
        }
      }

      // Handle touch start for panning
      function handleTouchStart(e) {
        if (isZoomed && e.touches.length === 1) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }
      }

      // Reset touch state
      function handleTouchEnd() {
        initialDistance = null;
      }

      // Click on gallery item opens fullscreen
      photoItems.forEach((item, index) => {
        item.addEventListener('click', () => openFullscreen(index));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFullscreen(index);
          }
        });
        
        // Touch events for mobile
        item.addEventListener('touchend', (e) => {
          if (e.changedTouches.length === 1) {
            const touch = e.changedTouches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target === item || item.contains(target)) {
              e.preventDefault();
              openFullscreen(index);
            }
          }
        });
      });

      // Fullscreen image events
      fullscreenImage.addEventListener('click', (e) => {
        if (!isZoomed) {
          closeFullscreen();
        } else {
          resetImageTransform();
        }
      });

      // Fullscreen viewer events
      fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
          closeFullscreen();
        }
      });

      // Navigation buttons
      btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
      });
      
      btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
      });
      
      closeBtn.addEventListener('click', closeFullscreen);

      // Touch events for navigation buttons
      btnNext.addEventListener('touchend', (e) => {
        e.stopPropagation();
        showNext();
      });
      
      btnPrev.addEventListener('touchend', (e) => {
        e.stopPropagation();
        showPrev();
      });
      
      closeBtn.addEventListener('touchend', (e) => {
        e.stopPropagation();
        closeFullscreen();
      });

      // Keyboard navigation in fullscreen
      document.addEventListener('keydown', (e) => {
        if (fullscreenViewer.classList.contains('active')) {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            showNext();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showPrev();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            closeFullscreen();
          }
        }
      });

      // Touch events for zoom and pan
      fullscreenImageContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
      fullscreenImageContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
      fullscreenImageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      fullscreenImageContainer.addEventListener('touchcancel', handleTouchEnd, { passive: true });
      
      // Pinch zoom
      fullscreenImageContainer.addEventListener('touchmove', handlePinch, { passive: false });

      // Swipe navigation
      let touchStartX = null;
      let touchStartY = null;
      
      fullscreenViewer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && !isZoomed) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });
      
      fullscreenViewer.addEventListener('touchend', (e) => {
        if (touchStartX === null || touchStartY === null || isZoomed) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            showPrev();
          } else {
            showNext();
          }
        }
        touchStartX = null;
        touchStartY = null;
      }, { passive: true });
    })();