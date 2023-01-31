export const CONFIG = {
  GLOBAL_PREFIX: process.env.GLOBAL_PREFIX || 'api',
  SWAGGER_PREFIX: process.env.SWAGGER_PREFIX || 'documentation',
  PORT: process.env.PORT || 3333,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_TOKEN_EXP: process.env.JWT_TOKEN_EXP,
};
