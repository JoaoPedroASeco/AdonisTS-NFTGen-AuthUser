import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NftOrders extends BaseSchema {
  protected tableName = 'nft_orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.integer('user_id').notNullable()
      table.boolean('accepted_terms').notNullable()
      table.timestamp('accepted_terms_at', { useTz: true }).notNullable()
      table.integer('value')
      table.integer('min_value')
      table.integer('quantity').notNullable()
      table.integer('order_status_id').notNullable()

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
