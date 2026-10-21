document.addEventListener('DOMContentLoaded', () => {
    const orderDialog = document.getElementById('order-dialog');
    const orderButtons = document.querySelectorAll('.product-card__button, .button');
    const closeDialogButton = document.getElementById('close-order-dialog');
    const selectedProductInput = document.getElementById('selected-product');
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('success-message');

    if (!orderDialog || !orderForm) return;

    // Открытие модального окна при клике на "Заказать"
    orderButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            // Если это ссылка, ведущая на order.html, то пускай браузер переходит по ней
            if (button.tagName === 'A' && button.getAttribute('href') === 'order.html') {
                return;
            }
            
            e.preventDefault();
            const productName = button.dataset.product || 'Выбранный товар';
            if (selectedProductInput) {
                selectedProductInput.value = productName;
            }
            orderDialog.showModal();
        });
    });

    // Закрытие окна
    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            orderDialog.close();
        });
    }

    // Валидация и отправка формы по БЭМ-требованиям
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formElements = Array.from(orderForm.elements);

        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });
            orderForm.reportValidity();
            return;
        }

        if (successMessage) {
            successMessage.hidden = false;
        }
        orderForm.reset();
        orderDialog.close();
    });
});