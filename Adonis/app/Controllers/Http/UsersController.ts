import Database from '@ioc:Adonis/Lucid/Database'
import Address from 'App/Models/Address'
import User from 'App/Models/User'
import UserLevel from 'App/Models/UserLevel'
import { userSchema } from 'App/services/userValidator'

export default class UsersController {

  public async create ({request, response, auth }) {
    try {
      const {
        username,
        email,
        password,
        telephone,
        wallet,
        user_type,
        country_code,
        street,
        number,
        reference
      } = await request.validate({schema: userSchema})

      const user = await User.create({
        username,
        email,
        password,
        telephone,
        wallet,
        user_type,
      })

      const userId = await user['$attributes'].id

      await Address.create({
        user_id: userId,
        country_code,
        street,
        number,
        reference
      })

      await UserLevel.create({
        user_id: userId,
      })

      await auth.login(user)

      return response.status(200).send({message: 'User Successfully Created!'})
    } catch (error) {
      return response.status(501).send(error)
    }
  }

  public async update ({ request }) {
    const {
      id,
      username,
      email,
      password,
      telephone,
      wallet,
      user_type,
      country_code,
      street,
      number,
      reference
    } = await request.body()

    await User
      .query()
      .where('id', id)
      .update({
        id,
        username,
        email,
        password,
        telephone,
        wallet,
        user_type,
      })

    await Address
      .query()
      .where('id', id)
      .update({
        user_id: id,
        country_code,
        street,
        number,
        reference
      })

    const updatedUser = await Database
    .rawQuery(
      `
        SELECT *
        FROM users
        INNER JOIN addresses
        ON users.id = addresses.user_id
        WHERE users.id = ${id}
        ORDER BY users.id
      `
      )

    return updatedUser.rows
  }

  public async delete ({ request, response }) {
    const { id } = request.body()

    if(!id) return 'Id is required'

    try {
      await User
        .query()
        .delete()
        .where('id', id)

      return response.send('User deleted!')
    } catch (error) {
      return error
    }
  }

  public async list ({ request }) {
    const { filter, q } =  request.body()

    const userList = await Database
      .rawQuery(
        `
          SELECT *
          FROM users
          INNER JOIN addresses
          ON users.id = addresses.user_id
          ${ q?
            `
              WHERE users.${filter? filter : 'username'}
              LIKE '%${q}%'
            `
          : null }
          ORDER BY ${filter? filter : 'users.id'}
        `
        )

    return userList.rows
  }
}
