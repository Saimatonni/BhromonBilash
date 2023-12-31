export enum EMAIL_DATA_BIND_KEYS {
  USER_NAME = "userName",
  OTP = "otp",
  SUBJECT = "subject",
  URL = "url",
  SIGNER_NAME = "signerName",
  OWNER_NAME = "ownerName",
}

export enum NODE_ENV_ENUM {
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
}

export enum COURSE_DIFFICULTY{
  BEGINNER = "BEGINNER",
  INTERMIDIATE = "INTERMIDIATE",
  ADVANCED = "ADVANCED"
}

export enum AUTH_TYPE {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
}

export enum USER_ROLE {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

export enum USER_STATUS {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DISABLED = "DISABLED",
}

export enum VISIBILITY_STATUS {
  COMING_SOON = "COMING_SOON",
  PUBLIC = "PUBLIC",
  DISABLED = "DISABLED",
  SUBSCRIPTION_REQUIRED = "SUBSCRIPTION_REQUIRED",
}

export enum ENROLLMENT_STATUS {
  STARTED = "STARTED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

export enum OPTIONS_TYPE {
  MULTIPLE_CHOICE_TEXT_SINGLE = "MULTIPLE_CHOICE_TEXT_SINGLE",
  MULTIPLE_CHOICE_TEXT_MULTIPLE = "MULTIPLE_CHOICE_TEXT_MULTIPLE",
  MULTIPLE_CHOICE_CODE_SINGLE = "MULTIPLE_CHOICE_CODE_SINGLE",
  MULTIPLE_CHOICE_CODE_MULTIPLE = "MULTIPLE_CHOICE_CODE_MULTIPLE",
  TRUE_FALSE = "TRUE_FALSE",
}

export enum SocketEvents {
  CONNECT = "connection",
  DISCONNECT = "disconnect",
}
