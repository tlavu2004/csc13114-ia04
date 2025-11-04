export const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>/?\\|-])[A-Za-z\d!@#$%^&*()_+\[\]{};':",.<>/?\\|-]{8,128}$/;
  return regex.test(password);
};

export const validateLogin = (email, password) => {
  if (!isValidEmail(email)) {
    return { valid: false, message: "Invalid email format" };
  }
  if (!isStrongPassword(password)) {
    return { valid: false, message: "Weak password" };
  }
  return { valid: true };
};