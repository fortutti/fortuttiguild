

// scriptBirthday.js
class BirthdayBanner {
    constructor() {
        this.banner = document.getElementById('birthdayBanner');
        this.checkDate = this.checkDate.bind(this);
    }

    init() {
        if (!this.banner) {
            console.warn('Birthday banner element not found');
            return;
        }
        
        this.checkDate();
        setInterval(this.checkDate, 60000);
    }

    checkDate() {
        const now = new Date();
        //console.log('Current date:', now.getDate(), 'Month:', now.getMonth());
        // Месяцы в JS: 0-11, поэтому 8 = сентябрь
        //const isBirthday = true; // Принудительный показ
        const isBirthday = now.getMonth() === 8 && now.getDate() === 28;
        
        if (isBirthday) {
            this.activate();
        } else {
            this.deactivate();
        }
    }

    activate() {
        this.banner.classList.add('active');
        document.body.classList.add('bday-banner-active');
        this.createEffects();
        this.updateLayout();
    }

    deactivate() {
        this.banner.classList.remove('active');
        document.body.classList.remove('bday-banner-active');
        this.clearEffects();
        this.updateLayout(); // Добавьте эту строку
    }

    updateLayout() {
        // Обновляем CSS переменную
        document.documentElement.style.setProperty(
            '--banner-height', 
            this.banner.offsetHeight + 'px'
        );
    }

    createEffects() {
    // Очистка старых частиц
    this.clearEffects();
    
    // Создание искр (теперь они будут "дрожать" на месте)
    for (let i = 0; i < 40; i++) {
        const spark = document.createElement('div');
        spark.className = 'bday-particle bday-spark';
        spark.style.left = Math.random() * 100 + '%';
        spark.style.top = Math.random() * 100 + '%';
        
        // Уменьшаем дистанцию для более "дрожащего" эффекта
        const angle = Math.random() * Math.PI * 2;
        const distance = 5 + Math.random() * 15; // Уменьшенная дистанция
        spark.style.setProperty('--spark-x', Math.cos(angle) * distance + 'px');
        spark.style.setProperty('--spark-y', Math.sin(angle) * distance + 'px');
        
        spark.style.animationDuration = 1 + Math.random() * 2 + 's'; // Разная скорость
        this.banner.appendChild(spark);
    }
    
    // Создание пузырей (теперь они будут циклически подниматься)
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bday-particle bday-bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.top = 100 + Math.random() * 20 + '%'; // Начинают снизу
        bubble.style.width = 10 + Math.random() * 10 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = 5 + Math.random() * 5 + 's'; // Разная скорость
        this.banner.appendChild(bubble);
    }
}

    clearEffects() {
        const particles = this.banner.querySelectorAll('.bday-particle');
        particles.forEach(p => p.remove());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BirthdayBanner().init();
});