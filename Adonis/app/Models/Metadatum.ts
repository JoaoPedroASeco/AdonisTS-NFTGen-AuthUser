import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Metadatum extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nft_id: number

  @column()
  public background: string

  @column()
  public eyeball: string

  @column()
  public iris: string

  @column()
  public shine: string

  @column()
  public bottom_lid: string

  @column()
  public top_lid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
