function checkSantaTime() {
    const now = new Date();

    // Определяем, к какому году относится ближайшая новогодняя ночь
    let nyYear = now.getFullYear();

    // Если сейчас январь (месяц 0) и день <= 3 → новогодняя ночь была в ПРОШЛОМ году
    if (now.getMonth() === 0 && now.getDate() <= 3) {
        nyYear = now.getFullYear() - 1;
    }
    // Во всех остальных случаях (декабрь, февраль и т.д.) — новогодняя ночь ещё впереди или прошла давно

    const startDate = new Date(nyYear, 11, 31, 23, 59, 0);      // 31 декабря, 23:59
    const endDate = new Date(nyYear + 1, 0, 3, 23, 59, 59);   // 3 января, 23:59

    const santaContainer = document.getElementById('santa-container');
    const shouldShow = now >= startDate && now <= endDate;

    if (shouldShow) {
        santaContainer.style.display = 'block';
        santaContainer.style.zIndex = '101';
        createDecorations();
    } else {
        santaContainer.style.display = 'none';
    }

    // Для диагностики (можно удалить позже)
    // console.log('🎅 Дед Мороз:', shouldShow ? 'ПОКАЗАН' : 'СКРЫТ', '| Период:', startDate, '—', endDate);
}

function createDecorations() {
    const decorationsContainer = document.getElementById('decorations');
    if (decorationsContainer) {
        decorationsContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'decoration';
            decoration.style.left = (Math.random() * 80 + 10) + '%';
            decoration.style.top = (Math.random() * 60 + 20) + '%';
            decoration.style.animationDelay = (i * 0.2) + 's';
            decorationsContainer.appendChild(decoration);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkSantaTime();
    setInterval(checkSantaTime, 30000); // Проверяем каждые 30 секунд (надёжнее, чем 60)
});

window.addEventListener('resize', checkSantaTime);