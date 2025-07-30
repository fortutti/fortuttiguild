


const audio = document.getElementById('audio');
        const player = document.getElementById('player');
        const playBtn = document.getElementById('play-btn');
        const progressBar = document.getElementById('progress-bar');
        const progress = document.getElementById('progress');
        const currentTimeEl = document.getElementById('current-time');
        const volumeBtn = document.getElementById('volume-btn');
        const volumeBar = document.getElementById('volume-bar');
        const volumeProgress = document.getElementById('volume-progress');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');

        // Воспроизведение/пауза
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                player.classList.add('playing');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                audio.pause();
                player.classList.remove('playing');
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });

        // Обновление прогресса
        audio.addEventListener('timeupdate', () => {
            const { currentTime, duration } = audio;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Форматирование времени
            const mins = Math.floor(currentTime / 60);
            const secs = Math.floor(currentTime % 60);
            currentTimeEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        });

        // Клик по прогресс-бару
        progressBar.addEventListener('click', (e) => {
            const width = progressBar.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            audio.currentTime = (clickX / width) * duration;
        });

        // Клик по громкости
        volumeBar.addEventListener('click', (e) => {
            const width = volumeBar.clientWidth;
            const clickX = e.offsetX;
            const volume = clickX / width;
            audio.volume = volume;
            volumeProgress.style.width = `${volume * 100}%`;
            
            // Обновление иконки громкости
            updateVolumeIcon(volume);
        });

        // Кнопка громкости
        volumeBtn.addEventListener('click', () => {
            if (audio.volume > 0) {
                audio.volume = 0;
                volumeProgress.style.width = '0%';
                updateVolumeIcon(0);
            } else {
                audio.volume = 0.8;
                volumeProgress.style.width = '80%';
                updateVolumeIcon(0.8);
            }
        });

        // Обновление иконки громкости
        function updateVolumeIcon(volume) {
            const volumeIcon = volumeBtn.querySelector('svg');
            volumeIcon.innerHTML = '';
            
            if (volume === 0) {
                volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
            } else if (volume < 0.5) {
                volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
            } else {
                volumeIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>';
            }
        }

        // Инициализация громкости
        audio.volume = 0.8;
        updateVolumeIcon(0.8);

        // Когда трек закончился
        audio.addEventListener('ended', () => {
            player.classList.remove('playing');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            progress.style.width = '0%';
            currentTimeEl.textContent = '0:00';
        });