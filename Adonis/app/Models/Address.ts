import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public country_code: number

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public reference: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
