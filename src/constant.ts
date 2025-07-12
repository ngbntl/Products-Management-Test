export const enum ROUTERS {
  DEFAULT = "/",
  HOME = "/",
  PRODUCTS = "/products",
}

export const enum STORAGE_VAR {
  User = "goline-ams-user",
  AccessToken = "goline-ams-access-token",
  RefreshToken = "goline-ams-refresh-token",
}

export const enum ROLE {
  ADMIN = "admin",
}

export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
export const ALLOWED_TYPES = ["text/csv"];

export const MAX_LENGTH_INPUT = 255;

export const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const regexUsername = /^[a-zA-Z0-9_]+$/;
export const regexPhone = /^\d{10}$/;
export const regexPassword =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
