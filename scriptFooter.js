  document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущий год
    const currentYear = new Date().getFullYear();
    
    // Находим элемент футера с годом
    const footerYearElement = document.querySelector('footer h5');
    
    // Обновляем текст с текущим годом
    if (footerYearElement) {
      footerYearElement.textContent = `© ${currentYear} ФорТутти`;
    }
  });