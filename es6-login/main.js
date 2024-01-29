// setCaret
const setCaret = (el) => {
  if (!el) return;

  try {
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(el.childNodes[0], el.innerText.length);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  } catch (err) {
    console.log("Error Setting Caret: ", err);
  }
};


// show hide
const togglePassword = (button) => {
  button.classList.toggle("showing");
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
  input.focus();
  setCaret(input);
};


// validation
function isFormValid() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  emailError.textContent = '';
  passwordError.textContent = '';

  let isValid = true;

  if (!emailInput.value) {
    emailError.textContent = 'Email must be filled in';
    emailError.style.color = 'red';
    isValid = false;
  }

  if (!passwordInput.value) {
    passwordError.textContent = 'Password must be filled in';
    passwordError.style.color = 'red';
    isValid = false;
  }

  return isValid;
}

