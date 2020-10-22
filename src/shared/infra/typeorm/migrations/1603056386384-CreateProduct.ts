import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateProduct1603056386384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'real',
          },
          {
            name: 'category_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'sale',
            type: 'boolean',
          },
          {
            name: 'sale_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sale_price',
            type: 'real',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'ProductCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'operations',
      new TableColumn({
        name: 'product_id',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'operations',
      new TableForeignKey({
        name: 'ProductOperation',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('operations', 'ProductOperation');

    await queryRunner.dropColumn('operations', 'product_id');

    await queryRunner.dropTable('products');
  }
}
