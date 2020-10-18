import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateRestaurants1603055535941
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restaurants',
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
            name: 'address',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'operations',
      new TableColumn({
        name: 'restaurant_id',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'operations',
      new TableForeignKey({
        name: 'RestaurantsOperations',
        columnNames: ['restaurant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurants',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('restaurants');

    await queryRunner.dropColumn('operations', 'restaurant_id');
  }
}
