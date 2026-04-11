import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1775908873409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `Alter table 'user' rename column 'admin' to 'isAdmin'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `Alter table 'user' rename column 'isAdmin' to 'admin'`,
    );
  }
}
