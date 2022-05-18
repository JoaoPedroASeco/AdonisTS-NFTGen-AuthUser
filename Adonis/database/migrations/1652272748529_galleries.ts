import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Galleries extends BaseSchema {
  protected tableName = 'galleries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.string('name', 255).notNullable()
      table.string('ipfs', 255).notNullable()

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
