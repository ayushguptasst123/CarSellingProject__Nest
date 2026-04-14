import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveIsSoldAddIsAvailableInVehicle1776071656293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ⚠️ SQLite fix
    await queryRunner.query('PRAGMA foreign_keys=OFF');

    // Remove old column
    await queryRunner.dropColumn('vehicles', 'isSold');

    // Add new column
    await queryRunner.addColumn(
      'vehicles',
      new TableColumn({
        name: 'isAvailable',
        type: 'boolean',
        default: true,
      }),
    );

    await queryRunner.query('PRAGMA foreign_keys=ON');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ⚠️ SQLite fix
    await queryRunner.query('PRAGMA foreign_keys=OFF');

    // Remove new column
    await queryRunner.dropColumn('vehicles', 'isAvailable');

    // Add old column back
    await queryRunner.addColumn(
      'vehicles',
      new TableColumn({
        name: 'isSold',
        type: 'boolean',
        default: false,
      }),
    );

    await queryRunner.query('PRAGMA foreign_keys=ON');
  }
}
