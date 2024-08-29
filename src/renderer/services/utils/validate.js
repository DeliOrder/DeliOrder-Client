export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password, passwordCheck) => {
  const minLength = 8;
  const validationResults = {
    isLongEnough: password.length >= minLength,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/.test(password),
    hasNoWhitespace: !/\s/.test(password),
    hasSameValue: password === passwordCheck,
  };

  const failedList = Object.keys(validationResults).filter(
    (key) => !validationResults[key],
  );

  return failedList.length > 0
    ? { valid: false, errors: failedList }
    : { valid: true };
};
