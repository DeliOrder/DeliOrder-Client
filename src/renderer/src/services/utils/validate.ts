export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

interface ValidationResultsType {
  isLongEnough: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasNoWhitespace: boolean;
  hasSameValue: boolean;
}

export const validatePassword = (password: string, passwordCheck: string) => {
  const minLength = 8;
  const validationResults: ValidationResultsType = {
    isLongEnough: password.length >= minLength,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/.test(password),
    hasNoWhitespace: !/\s/.test(password),
    hasSameValue: password === passwordCheck,
  };

  const failedList = Object.keys(validationResults).filter(
    (key) => !validationResults[key as keyof ValidationResultsType],
  );

  return failedList.length > 0
    ? { valid: false, errors: failedList }
    : { valid: true };
};
