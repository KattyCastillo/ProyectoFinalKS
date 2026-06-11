export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cardRegex = /^\d{13,19}$/;
  return cardRegex.test(cardNumber.replace(/\s/g, ''));
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
};

export const validateCVV = (cvv: string): boolean => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

export const validateExpiryDate = (date: string): boolean => {
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return dateRegex.test(date);
};
