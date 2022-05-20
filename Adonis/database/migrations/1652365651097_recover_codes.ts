import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RecoverCodes extends BaseSchema {
  protected tableName = 'recover_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE')
      table.string('code').notNullable()
      table.timestamp('expiration', { useTz: true }).notNullable()
      table.integer('recover_status_type_id').notNullable()

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
