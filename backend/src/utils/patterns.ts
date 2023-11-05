export default {
  isEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  ID: /^[0-9a-fA-F]{24}$/,
  isValidId: /^[0-9a-fA-F]{24}$/,
  isValidAccessToken: /^[0-9a-fA-F]{32}$/,
  isValidColor: /RGB\(\s*(?:(?:\d{1,2}|1\d\d|2(?:[0-4]\d|5[0-5]))\s*,?){3}\)$/,
  isValidPhoneNumber: /^[7-9]{1}[0-9]{9}$/,
  isValidArrayOfObjectId : /^(?:[0-9a-fA-F]{24},\s*)*[0-9a-fA-F]{24}$/,
  isValidVerificationCode : /^.{6}$/,
  isValidBudgetType : /^(LOW|MID|HIGH)$/,
  isValidDate : /\b(0[1-9]|[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2]|[1-9])-\d{4}\b/,
  isValidTime : /^(?:[01]\d|2[0-3]):[0-5]\d$/,
};
