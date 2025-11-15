class SnowflakeManager {
    constructor() {
        this.snowflakes = [];
        this.isActive = false;
        this.intervalId = null;
        this.snowflakeInterval = null;
        
        console.log('❄️ SnowflakeManager инициализирован');
        
        const now = new Date();
        console.log('📅 Текущая дата:', now.toLocaleDateString());
        console.log('📅 Месяц:', now.getMonth() + 1);
        
        this.checkDate();
        
        this.intervalId = setInterval(() => this.checkDate(), 60000);
        window.addEventListener('resize', () => this.handleResize());
    }

    isWinterPeriod() {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        
        console.log('🔍 Проверка зимнего периода. Месяц:', currentMonth);

        if (currentMonth === 12 || currentMonth === 1 || currentMonth === 2) {
            console.log('✅ Зимний период');
            return true;
        } else {
            console.log('❌ Не зимний период');
            return false;
        }
    }

    checkDate() {
        console.log('🕐 Проверка даты для снегопада...');
        const shouldBeActive = this.isWinterPeriod();
        
        if (shouldBeActive && !this.isActive) {
            console.log('🎉 Запускаем снегопад!');
            this.startSnowfall();
        } else if (!shouldBeActive && this.isActive) {
            console.log('🛑 Останавливаем снегопад!');
            this.stopSnowfall();
        }
    }

    startSnowfall() {
        if (this.isActive) return;
        
        this.isActive = true;
        console.log('🌨️ Запуск снегопада...');
        
        this.createSnowflakes();
        this.snowflakeInterval = setInterval(() => this.createSnowflake(), 400);
    }

    stopSnowfall() {
        if (!this.isActive) return;
        
        this.isActive = false;
        console.log('🛑 Остановка снегопада...');
        
        if (this.snowflakeInterval) {
            clearInterval(this.snowflakeInterval);
            this.snowflakeInterval = null;
        }
        
        this.snowflakes.forEach(snowflake => {
            snowflake.style.transition = 'opacity 1s ease-out';
            snowflake.style.opacity = '0';
            setTimeout(() => {
                if (snowflake.parentNode) {
                    snowflake.parentNode.removeChild(snowflake);
                }
            }, 1000);
        });
        
        this.snowflakes = [];
    }

    createSnowflakes() {
        console.log('❄️ Создаем начальные снежинки...');
        for (let i = 0; i < 15; i++) {
            setTimeout(() => this.createSnowflake(), Math.random() * 2000);
        }
    }

    createSnowflake() {
        if (!this.isActive) return;

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake-winter';
        
        // Полный набор символов снежинок
        const snowflakeChars = ['❄', '❅', '❆', '•', '✻', '✲'];
        snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

        // Размеры снежинок
        const sizes = ['snow-small', 'snow-medium', 'snow-large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        snowflake.classList.add(size);

        // Стили для снежинок (голубые оттенки)
        const styles = ['snow-style1', 'snow-style2', 'snow-style3', 'snow-style4', 'snow-style5'];
        const style = styles[Math.floor(Math.random() * styles.length)];
        snowflake.classList.add(style);

        // Анимации для снежинок
        const animations = ['snow-animation1', 'snow-animation2', 'snow-animation3'];
        const animation = animations[Math.floor(Math.random() * animations.length)];
        snowflake.classList.add(animation);

        // Скорости
        const speeds = ['snow-fast', 'snow-normal', 'snow-slow'];
        const speed = speeds[Math.floor(Math.random() * speeds.length)];
        snowflake.classList.add(speed);

        const startX = Math.random() * window.innerWidth;
        snowflake.style.left = startX + 'px';
        snowflake.style.animationDelay = (Math.random() * 3) + 's';
        snowflake.style.opacity = (0.5 + Math.random() * 0.4).toString();

        document.body.appendChild(snowflake);
        this.snowflakes.push(snowflake);

        let animationDuration = 12;
        if (speed === 'snow-fast') animationDuration = 6;
        if (speed === 'snow-slow') animationDuration = 20;

        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
                this.snowflakes = this.snowflakes.filter(s => s !== snowflake);
            }
        }, animationDuration * 1000);
    }

    handleResize() {
        // Логика изменения размера
    }
}

// Функция для инициализации снегопада
function initWinterSnowfall() {
    console.log('🚀 Инициализация зимнего снегопада...');
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📄 DOM загружен, создаем SnowflakeManager');
            window.snowflakeManager = new SnowflakeManager();
        });
    } else {
        console.log('📄 DOM уже загружен, создаем SnowflakeManager');
        window.snowflakeManager = new SnowflakeManager();
    }
}

// Автоматическая инициализация
initWinterSnowfall();

// Глобальные функции с префиксами
window.testSnowfallWinter = function() {
    console.log('🧪 ТЕСТ: Принудительный запуск снегопада');
    if (window.snowflakeManager) {
        window.snowflakeManager.startSnowfall();
    }
}

window.stopSnowfallWinter = function() {
    console.log('🛑 ТЕСТ: Принудительная остановка снегопада');
    if (window.snowflakeManager) {
        window.snowflakeManager.stopSnowfall();
    }
}