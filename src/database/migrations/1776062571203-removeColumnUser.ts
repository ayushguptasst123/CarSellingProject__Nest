import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveColumnUser1776062571203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'address2',
        type: 'string',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('PRAGMA foreign_keys=OFF');

    await queryRunner.dropColumn('user', 'isVerified');
    await queryRunner.dropColumn('user', 'address2');

    await queryRunner.query('PRAGMA foreign_keys=ON');
  }
}
