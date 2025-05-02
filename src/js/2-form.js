const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

loadFormData();

form.addEventListener('input', onInputChange);
form.addEventListener('submit', onFormSubmit);

function onInputChange() {
  const formData = {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    if (parsedData.email) form.elements.email.value = parsedData.email;
    if (parsedData.message) form.elements.message.value = parsedData.message;
  } catch (error) {
    console.error('Error parsing saved data', error);
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log({ email, message });

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}