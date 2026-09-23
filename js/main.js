// 1. Находим элементы на странице по их ID или классам
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

// 2. Вешаем "слушатель клика" на кнопки товаров
orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Считываем имя товара из data-product="..."
        const productName = button.dataset.product;
        
        // Кладём это имя в скрытое поле формы
        selectedProductInput.value = productName;
        
        // Магия: приказываем браузеру открыть модальное окно!
        orderDialog.showModal();
    });
});

// 3. Вешаем клик на кнопку «Закрыть» внутри окна
closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
});
// 4. Находим саму форму и блок с сообщением об успехе
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// 5. Обрабатываем отправку формы
orderForm.addEventListener('submit', (event) => {
    // Отменяем перезагрузку страницы браузером
    event.preventDefault();

    // Превращаем все элементы формы в массив
    const formElements = Array.from(orderForm.elements);

    // Сбрасываем старые признаки ошибок
    formElements.forEach((element) => {
        if (element.willValidate) {
            element.removeAttribute('aria-invalid');
        }
    });

    // Проверяем встроенные HTML-ограничения формы
    if (!orderForm.checkValidity()) {
        formElements.forEach((element) => {
            if (element.willValidate && !element.checkValidity()) {
                element.setAttribute('aria-invalid', 'true');
            }
        });
        // Показываем стандартные подсказки браузера
        orderForm.reportValidity();
        return;
    }

    // Показываем сообщение об успешной отправке
    successMessage.hidden = false;
    // Очищаем поля формы
    orderForm.reset();
    // Закрываем модальное окно
    orderDialog.close();
});
