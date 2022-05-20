import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import UserLevel from './UserLevel'
import { DateTime } from 'luxon'
import Address from './Address'

export default class User extends BaseModel {
  @hasOne(() => Address)
  public address: HasOne<typeof Address>

  @hasOne(() => UserLevel)
  public user_level: HasOne<typeof UserLevel>

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public telephone: string

  @column()
  public wallet: string

  @column()
  public user_type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
