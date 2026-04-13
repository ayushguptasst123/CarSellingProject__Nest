import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateVehicleEntity1776061244280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'isVerified',
        type: 'Boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'isVerified');
  }
}
