function isEmail(email) {
  const emailPattern =
    /^([a-zA-Z][\w\.\-]+[a-zA-Z0-9])@([a-zA-Z0-9]{2,20})\.([a-zA-Z]{2,5})(\.[a-zA-Z]{2,5})?$/;
  return emailPattern.test(email);
}

function isStrongPassword(password) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordPattern.test(password);
}

export { isEmail, isStrongPassword };
