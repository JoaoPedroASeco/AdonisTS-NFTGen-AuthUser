import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Nfts extends BaseSchema {
  protected tableName = 'nfts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.integer('token_id').notNullable().unique()
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('owned_at', { useTz: true }).notNullable()
      table.integer('collection_id').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
