class MarchBanner {
    constructor() {
        this.banner = document.getElementById('marchBanner');
        this.checkDate = this.checkDate.bind(this);
    }

    init() {
        if (!this.banner) {
            console.error('March banner element not found');
            return;
        }
        
        this.checkDate();
        setInterval(this.checkDate, 60000);
    }

    checkDate() {
        const now = new Date();

        //const isMarch8 = true; // Принудительный показ
        const isMarch8 = now.getMonth() === 2 && now.getDate() === 8; // 8 марта
        
        if (isMarch8) {
            this.activate();
        } else {
            this.deactivate();
        }
    }

    activate() {
        this.banner.classList.add('active');
        document.body.classList.add('march-banner-active'); // Добавьте эту строку
        this.createConfetti();
        this.updateLayout();
    }

    deactivate() {
        this.banner.classList.remove('active');
        document.body.classList.remove('march-banner-active'); // И эту
        this.clearEffects();
    }

    createConfetti() {
        this.clearEffects();
        const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#a1c4fd', '#ffffff'];
        
        // Конфетти
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'march-confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 8 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confetti.style.animationDuration = 2 + Math.random() * 3 + 's'; // Быстрее
            
            if (Math.random() > 0.7) {
                confetti.style.borderRadius = '50%';
            } else if (Math.random() > 0.5) {
                confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            this.banner.appendChild(confetti);
        }
        
        // Блестки
        for (let i = 0; i < 30; i++) {
            const glitter = document.createElement('div');
            glitter.className = 'glitter';
            glitter.style.left = Math.random() * 100 + '%';
            glitter.style.top = Math.random() * 100 + '%';
            glitter.style.animationDelay = Math.random() * 3 + 's';
            glitter.style.animationDuration = 1 + Math.random() * 2 + 's';
            this.banner.appendChild(glitter);
        }
    }

    clearEffects() {
        const effects = this.banner.querySelectorAll('.march-confetti, .glitter');
        effects.forEach(el => el.remove());
    }

    updateLayout() {
        document.documentElement.style.setProperty(
            '--banner-height', 
            this.banner.offsetHeight + 'px'
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MarchBanner().init();
});