import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateImages1603056909120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'restaurants',
      new TableColumn({ name: 'image', type: 'varchar' }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({ name: 'image', type: 'varchar' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('restaurants', 'image');
    await queryRunner.dropColumn('products', 'image');
  }
}
