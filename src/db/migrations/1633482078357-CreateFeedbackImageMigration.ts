import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeedbackImageMigration1633482078357
  implements MigrationInterface
{
  name = 'CreateFeedbackImageMigration1633482078357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`feedback\` varchar(450) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`user\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`description\` varchar(450) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`feedback_image\` ADD CONSTRAINT \`FK_62607411fa5262e99878a638ebf\` FOREIGN KEY (\`causeId\`) REFERENCES \`help_db\`.\`cause\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`feedback_image\` DROP FOREIGN KEY \`FK_62607411fa5262e99878a638ebf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`user\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`feedback\``,
    );
  }
}
