import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const userSchema = schema.create({
  username: schema.string({trim: true}, [ rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
  email: schema.string({trim: true}, [ rules.email(), rules.unique({ table: 'users', column: 'email', caseInsensitive: true })]),
  password: schema.string({}, [ rules.minLength(8)]),
  telephone: schema.string({}, [ rules.minLength(8)]),
  wallet: schema.string({}, [ rules.minLength(40)]),
  user_type: schema.string({}),
  country_code: schema.string({}, [ rules.minLength(4)]),
  street: schema.string({}, [ rules.minLength(6)]),
  number: schema.string({}),
  reference: schema.string(),
})
