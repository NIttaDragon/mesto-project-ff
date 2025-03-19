//обработка всех форм страницы
const enableValidation = (enableValidationData) => {
  const formList = Array.from(document.querySelectorAll(enableValidationData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setFormEventListeners(formElement, enableValidationData.inputSelector, enableValidationData.submitButtonSelector, enableValidationData.inputErrorClass, enableValidationData.errorClass);
  });
};

//связь доступности кнопки и валидности данных + добавление прослушивателя на ввод данных
function setFormEventListeners(formName, inputSelector, submitButtonSelector, inputErrorClass, errorClass) {
  const inputsList = Array.from(formName.querySelectorAll(inputSelector));
  const buttonElement = formName.querySelector(submitButtonSelector);
  toggleButtonState(inputsList, buttonElement);
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formName, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputsList, buttonElement);
    })
  })
}

//управление доступностью кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

//проверка валидности всей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//проверка валидности ввода в форму
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}
 //вывод ошибок под поле формы
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//скрытие вывода ошибок под полем формы
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//очистка старых ошибок ввода
function clearValidation(formElement, validationConfig) {
  const inputsList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputsList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  })
  formElement.querySelector(validationConfig.submitButtonSelector).disabled = true;
}

export {enableValidation, clearValidation}