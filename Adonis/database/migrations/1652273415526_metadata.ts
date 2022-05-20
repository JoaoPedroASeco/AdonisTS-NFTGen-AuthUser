import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Metadata extends BaseSchema {
  protected tableName = 'metadata'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.integer('galleries_id').unsigned().references('galleries.id').onDelete('CASCADE')
      table.string('background', 255).notNullable()
      table.string('eyeball', 255).notNullable()
      table.string('eye_color', 255).notNullable()
      table.string('iris', 255).notNullable()
      table.string('shine', 255).notNullable()
      table.string('bottom_lid', 255).notNullable()
      table.string('top_lid', 255).notNullable()

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
