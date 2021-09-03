import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganizationCauseMigration1630628016118
  implements MigrationInterface
{
  name = 'OrganizationCauseMigration1630628016118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`phone_number\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`is_approved\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`email_verified_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`expired_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`phoneNumber\` varchar(11) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`isApproved\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`emailVerifiedAt\` timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`expiredAt\` timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`expiredAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`emailVerifiedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`isApproved\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`phoneNumber\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`expired_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`email_verified_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`is_approved\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`organization\` ADD \`phone_number\` varchar(11) NOT NULL`,
    );
  }
}
