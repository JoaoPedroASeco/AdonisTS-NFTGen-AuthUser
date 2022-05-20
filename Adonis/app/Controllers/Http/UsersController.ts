import { CreateUserTransaction, DeleteUserTransaction, UpdateUserTransaction } from 'App/services/UserServices/UserTransactions'
import { userSchema } from 'App/services/UserServices/userValidator'
import Database from '@ioc:Adonis/Lucid/Database'
export default class UsersController {
  public async create ({request, response }) {
    const data = await request.validate({schema: userSchema})

    try {
      await CreateUserTransaction(data)

      return response.status(200).send({message: 'User Successfully Created!'})
    } catch(error) {
      return response.status(501).send(error)
    }
  }

  public async update ({ request, response }) {
    const data = await request.body()

    try {
      await UpdateUserTransaction(data)

      return response.status(200).send({message: 'User Successfully Updated!'})
    }catch (error) {
      return response.status(501).send(error)
    }
  }

  public async list ({ request }) {
    const { filter, q, id } =  request.body()

    const users = await Database
    .from('users')
    .join('addresses', 'users.id', '=', 'addresses.user_id')
    .join('user_levels', 'users.id', '=', 'user_levels.user_id')
    .whereRaw(`${id ? `users.id = ${id}` : ''}`)
    .whereRaw(`${filter ? `${q ? `users.${filter} LIKE '%${q}%'` : '' }` : `${q ? `users.username LIKE '%${q}%'` : '' }` }`)
    .where('deleted_at', null)

    return users
  }

  public async delete ({ request, response }) {
    const data = request.body()

    try {
      await DeleteUserTransaction(data)

      return response.send('User deleted!')
    } catch (error) {
      return error
    }
  }
}
