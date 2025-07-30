// Новогодний баннер
        
        
    // Проверка даты и времени
    function checkDateTime() {
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-11 (январь - 0)
        const currentDate = now.getDate(); // 1-31
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const banner = document.getElementById('newYearBanner');
        const bannerContainer = document.querySelector('.new-year-banner-container');
        
        // Проверяем период с 00:00 1 января до 23:59 3 января
        //const isNewYearPeriod = true; // Принудительный показ
        const isNewYearPeriod = 
            currentMonth === 0 && 
            ((currentDate === 1 && (currentHours >= 0)) ||
            (currentDate === 2) ||
            (currentDate === 3 && (currentHours < 24)));
        
        if (isNewYearPeriod) {
            banner.style.display = 'flex';
            banner.classList.add('banner-visible');
            bannerContainer.classList.add('banner-container-visible');
            startFireworks();
            startSnowfall();
        } else {
            banner.style.display = 'none';
            banner.classList.remove('banner-visible');
            bannerContainer.classList.remove('banner-container-visible');
            stopAnimations();
        }
    }
            
        // Остановка анимаций
        function stopAnimations() {
            const canvas = document.getElementById('fireworksCanvas');
            const ctx = canvas.getContext('2d');
            
            // Очищаем canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Удаляем все снежинки
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(snowflake => snowflake.remove());
        }
        
        // Запускаем проверку при загрузке страницы
        checkDateTime();
        
        // Также проверяем каждую минуту на случай, если страница открыта долго
        setInterval(checkDateTime, 60000);
        
        // Снегопад
        function startSnowfall() {
            const banner = document.getElementById('newYearBanner');
            const snowflakesCount = 50;
            
            for (let i = 0; i < snowflakesCount; i++) {
                createSnowflake();
            }
            
            function createSnowflake() {
                const snowflake = document.createElement('div');
                snowflake.classList.add('snowflake');
                
                const size = Math.random() * 5 + 2;
                const startPositionX = Math.random() * window.innerWidth;
                const animationDuration = Math.random() * 5 + 5;
                const opacity = Math.random() * 0.5 + 0.5;
                const delay = Math.random() * 5;
                
                snowflake.style.width = `${size}px`;
                snowflake.style.height = `${size}px`;
                snowflake.style.left = `${startPositionX}px`;
                snowflake.style.top = `-10px`;
                snowflake.style.opacity = opacity;
                
                banner.appendChild(snowflake);
                
                const animation = snowflake.animate(
                    [
                        { top: '-10px', left: `${startPositionX}px` },
                        { top: '130px', left: `${startPositionX + (Math.random() * 100 - 50)}px` }
                    ],
                    {
                        duration: animationDuration * 1000,
                        delay: delay * 1000,
                        iterations: Infinity
                    }
                );
                
                // Удаляем снежинки, которые вышли за пределы баннера
                animation.onfinish = () => {
                    snowflake.remove();
                    createSnowflake();
                };
            }
        }
        
        // Фейерверк
        function startFireworks() {
            const canvas = document.getElementById('fireworksCanvas');
            const ctx = canvas.getContext('2d');
            
            // Устанавливаем размер canvas равным размеру баннера
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            // Массив для хранения частиц фейерверка
            let particles = [];
            
            // Цвета для фейерверков
            const colors = [
                '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
                '#ff00ff', '#00ffff', '#ff9900', '#9900ff',
                '#ff0099', '#00ff99', '#99ff00', '#0099ff'
            ];
            
            // Функция создания частицы
            function Particle(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.velocity = {
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                };
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.01;
                this.size = Math.random() * 3 + 1;
            }
            
            // Обновление частицы
            Particle.prototype.update = function() {
                this.velocity.y += 0.05; // гравитация
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= this.decay;
                return this.alpha > 0;
            };
            
            // Отрисовка частицы
            Particle.prototype.draw = function() {
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            };
            
            // Создание взрыва фейерверка
            function createFirework(x, y) {
                const particleCount = 100;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle(x, y, color));
                }
            }
            
            // Анимация фейерверков
            function animate() {
                // Затемнение для эффекта следа
                ctx.fillStyle = 'rgba(10, 10, 42, 0.2)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Обновление и отрисовка частиц
                particles = particles.filter(particle => {
                    particle.update();
                    particle.draw();
                    return particle.alpha > 0;
                });
                
                // Случайные взрывы
                if (Math.random() < 0.05) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height * 0.6;
                    createFirework(x, y);
                }
                
                requestAnimationFrame(animate);
            }
            
            // Начальные взрывы
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height * 0.6;
                    createFirework(x, y);
                }, i * 300);
            }
            
            animate();
            
            // Обработка изменения размера окна
            window.addEventListener('resize', () => {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            });
        }       


        