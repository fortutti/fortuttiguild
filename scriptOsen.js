// Всегда показывать листья для отладки
function isAutumnSeason() {
    return true;
}

// Красивые осенние листья (только желтые и оранжевые оттенки)
const leafSymbols = ['🍂', '🍁', '🎃', '⭐', '🔶'];
const leafColors = [
    '#FFD700', // золотой
    '#FFEC8B', // светло-желтый
    '#FFA500', // оранжевый
    '#FF8C00', // темно-оранжевый
    '#FF6347', // красно-оранжевый
    '#DAA520', // золотистый
    '#F4A460', // песочный
    '#DEB887'  // бурный
];

// Создаем контейнер для листьев
function createLeavesContainer() {
    const oldContainer = document.getElementById('autumn-leaves-container');
    if (oldContainer) {
        oldContainer.remove();
    }
    
    const container = document.createElement('div');
    container.id = 'autumn-leaves-container';
    document.body.appendChild(container);
    
    console.log('Контейнер для листьев создан');
    return container;
}

// Анимация листа с помощью JavaScript
function animateLeaf(leaf, startX, startY) {
    const startTime = Date.now();
    const duration = 8000 + Math.random() * 7000; // 8-15 секунд
    const swayAmount = 80 + Math.random() * 120;
    const rotationSpeed = 0.3 + Math.random() * 1.2;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
            // Позиция по Y (падение)
            const currentY = startY + (window.innerHeight + 100) * progress;
            
            // Покачивание по X (синусоида)
            const sway = Math.sin(progress * Math.PI * 5) * swayAmount * progress;
            const currentX = startX + sway;
            
            // Вращение
            const rotation = progress * 360 * rotationSpeed;
            
            // Применяем трансформацию
            leaf.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
            
            // Прозрачность в начале и конце
            if (progress < 0.1) {
                leaf.style.opacity = progress * 10;
            } else if (progress > 0.9) {
                leaf.style.opacity = (1 - progress) * 10;
            } else {
                leaf.style.opacity = 0.8 + Math.random() * 0.2; // легкое мерцание
            }
            
            requestAnimationFrame(update);
        } else {
            // Анимация завершена - удаляем лист
            if (leaf.parentNode) {
                leaf.parentNode.removeChild(leaf);
            }
        }
    }
    
    update();
}

// Создаем один лист
function createLeaf(container) {
    const leaf = document.createElement('div');
    leaf.className = 'autumn-leaf';
    
    // Случайные параметры - появляются рандомно сверху по всей ширине
    const startX = Math.random() * (window.innerWidth + 200) - 100; // даже за краями
    const startY = -30 - Math.random() * 50; // разная высота начала
    const size = 18 + Math.random() * 20; // Разный размер листьев
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    const symbol = leafSymbols[Math.floor(Math.random() * leafSymbols.length)];
    
    // Устанавливаем начальные стили
    leaf.style.left = '0px';
    leaf.style.top = '0px';
    leaf.style.color = color;
    leaf.style.fontSize = size + 'px';
    leaf.style.opacity = '0';
    leaf.style.willChange = 'transform';
    
    // Случайные эффекты для разнообразия
    const brightness = 0.7 + Math.random() * 0.6;
    const hueRotate = Math.random() * 20;
    leaf.style.filter = `hue-rotate(${hueRotate}deg) brightness(${brightness})`;
    
    leaf.innerHTML = symbol;
    container.appendChild(leaf);
    
    console.log('Лист создан:', symbol, 'цвет:', color);
    
    // Запускаем анимацию
    setTimeout(() => {
        animateLeaf(leaf, startX, startY);
    }, Math.random() * 500);
    
    return leaf;
}

// Основная функция
function initAutumnLeaves() {
    console.log('Инициализация осеннего листопада...');
    
    if (!isAutumnSeason()) {
        console.log('Сейчас не осенний сезон');
        return;
    }
    
    const container = createLeavesContainer();
    
    // Создаем начальные листья с разной задержкой
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createLeaf(container);
        }, i * 600 + Math.random() * 400);
    }
    
    // Продолжаем создавать листья
    const leafInterval = setInterval(() => {
        if (container.children.length < 15) {
            createLeaf(container);
        }
    }, 2000);
    
    console.log('Осенний листопад запущен! 🍂');
    
    // Очистка при разгрузке страницы
    window.addEventListener('beforeunload', () => {
        clearInterval(leafInterval);
    });
}

// Запускаем когда страница готова
function checkDOMReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutumnLeaves);
    } else {
        setTimeout(initAutumnLeaves, 1000);
    }
}

// Запускаем проверку
checkDOMReady();

// Также запускаем при полной загрузке страницы
window.addEventListener('load', initAutumnLeaves);