import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPofileImageAndDescriptionColumnsMigration1631990878358
  implements MigrationInterface
{
  name = 'AddPofileImageAndDescriptionColumnsMigration1631990878358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`profileImage\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`user\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`user\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`profileImage\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`description\``,
    );
  }
}
