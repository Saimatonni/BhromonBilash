export default {
  MAX_TRANSACTION_PER_DAY: 4,
  MAX_AADHAAR_TRANSACTION_PER_DAY: 1,
  MAX_TRANSACTION_PER_USER: 4,
  JWT_TOKEN_EXPIRY_TIME: '24h',
  SIGNER_TOKEN_EXPIRY_TIME: 86400, // 1 day
  OTP_EXPIRED_TIME: 5, // 5 min
  USER_ACCESS_TOKEN_EXPIRY: 172800, // 2 day
  SIGNATURE_SESSION_EXPIRY_TIME: 600, // 10 min
  MAX_PAGE_RECORD: 20,
  TOKEN_BYTE_SIZE: 16,
  ALLOWED_EMAIL_DOMAIN_LIST: ['zoop.one'],
  HTTP_CODE: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    LOW_WALLET_BALANCE: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    EXPECTATION_FAILED: 417,
    UNPROCESSABLE_ENTITY: 422,
    PAYMENT_REQUIRED: 429,
    INTERNAL_SERVER_ERROR: 500,
    UNSUPPORTED: 501,
    SOURCE_DOWN: 502,
    SOURCE_TIMED_OUT: 503,
    REQUEST_TIMED_OUT: 504
  },
  EMAIL_SUBJECT: {
    VFLOW_INVITATION: 'Invitation for viewing the document',
    PDF_SHARE: 'PDF Shared With You'
  },
  REGEX: {
    PAN: /^[a-zA-Z]{3}[PCHFATBLJGpchfatbjlg]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/,
    AADHAAR: /^\d{4}\d{4}\d{4}$/,
    VOTER_ID: /^(([a-zA-Z]{3}\/?\d{7})|([a-zA-Z]{2}\/\d{1,3}\/\d{2,3}\/\d{6,7})|([a-zA-Z]{2}\d{10,12}))$/,
    DRIVING_LICENSE: /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
    DOB: /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]([1-9]\d{3})$/
  }
};
