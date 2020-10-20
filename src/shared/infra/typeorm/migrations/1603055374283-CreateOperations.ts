import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOperations1603055374283
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operations',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'opening_hour',
            type: 'varchar',
          },
          {
            name: 'closing_hour',
            type: 'varchar',
          },
          {
            name: 'days',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('operations');
  }
}
