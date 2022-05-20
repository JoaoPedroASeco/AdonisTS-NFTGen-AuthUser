import Database from '@ioc:Adonis/Lucid/Database'
import Address from 'App/Models/Address'
import User from 'App/Models/User'
import UserLevel from 'App/Models/UserLevel'
import moment from 'moment'

export const CreateUserTransaction = async ({
  user_type,
  telephone,
  username,
  password,
  wallet,
  email,
  country_code,
  reference,
  street,
  number,
}) => {
  await Database.transaction(async (trx) => {
    const user = new User()

    user.username = username
    user.email = email
    user.password = password
    user.telephone = telephone
    user.wallet = wallet
    user.user_type = user_type

    user.useTransaction(trx)
    await user.save()

    // Insert Address
    await user.related('address').create({
      country_code,
      reference,
      street,
      number,
    })

    // Insert User Level
    await user.related('user_level').create({})
  })
}

export const UpdateUserTransaction = async ({
  user_type,
  telephone,
  username,
  password,
  wallet,
  email,
  country_code,
  reference,
  street,
  number,
  points,
  id,
}) => {
  await Database.transaction(async (trx) => {
    // User update
    await User
      .query({ client: trx })
      .update({
        user_type,
        telephone,
        username,
        password,
        wallet,
        email,
      })
      .where('id', id)

      // Address update
      await Address
      .query({ client: trx })
      .update({
        country_code,
        reference,
        street,
        number,
      })
      .where('user_id', id)

      // Address update
      await UserLevel
      .query({ client: trx })
      .update({
        points,
        updated_at: moment().format()
      })
      .where('user_id', id)
  })
}

export const DeleteUserTransaction = async ({ id }) => {
  await Database.transaction(async (trx) => {
    // User update
    await User
      .query({ client: trx })
      .update({deleted_at: moment().format()})
      .where('id', id)
  })
}

