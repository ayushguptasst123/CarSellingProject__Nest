import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserTableName1776082406529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Renaming 'user' to 'users'
    await queryRunner.renameTable('user', 'users');

    // Renaming 'report' to 'reports'
    await queryRunner.renameTable('report', 'reports');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverting 'reports' back to 'report'
    await queryRunner.renameTable('reports', 'report');

    // Reverting 'users' back to 'user'
    await queryRunner.renameTable('users', 'user');
  }
}
