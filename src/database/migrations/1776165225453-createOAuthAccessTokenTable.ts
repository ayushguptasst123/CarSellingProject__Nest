import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOAuthAccessTokens1713023045000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'oauth_access_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'tokenId',
            type: 'varchar',
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
          },
          {
            name: 'revokedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'revoked',
            type: 'boolean',
            default: false,
          },
          {
            name: 'deviceType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'userId', // Foreign Key Column
            type: 'uuid',
            isNullable: true, // Set to false if a token MUST have a user
          },
        ],
      }),
      true,
    );

    // Add Foreign Key Constraint
    await queryRunner.createForeignKey(
      'oauth_access_tokens',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users', // Points to your newly renamed table
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('oauth_access_tokens');

    // 1. Check if the table exists
    if (table) {
      // 2. Find the specific foreign key
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('userId') !== -1,
      );

      // 3. Only drop if the foreign key was actually found
      if (foreignKey) {
        await queryRunner.dropForeignKey('oauth_access_tokens', foreignKey);
      }
    }

    // 4. Finally drop the table
    await queryRunner.dropTable('oauth_access_tokens');
  }
}
