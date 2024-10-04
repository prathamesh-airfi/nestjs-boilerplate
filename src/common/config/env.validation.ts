import * as Joi from 'joi';

export const envSchema = Joi.object({
  MONGODB_URI: Joi.string().uri().required(),
  REDIS_URI: Joi.string().uri().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .required(),
});
