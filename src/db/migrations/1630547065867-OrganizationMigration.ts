import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganizationMigration1630547065867 implements MigrationInterface {
  name = 'OrganizationMigration1630547065867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`help_db\`.\`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone_number\` varchar(11) NOT NULL, \`password\` varchar(255) NOT NULL, \`cep\` varchar(8) NOT NULL, \`district\` varchar(255) NOT NULL, \`number\` varchar(14) NOT NULL, \`is_approved\` tinyint NOT NULL DEFAULT 0, \`email_verified_at\` timestamp NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD \`organizationId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expired_at\` \`expired_at\` timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` ADD CONSTRAINT \`FK_17301c1efde24ef92ce240d79eb\` FOREIGN KEY (\`organizationId\`) REFERENCES \`help_db\`.\`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP FOREIGN KEY \`FK_17301c1efde24ef92ce240d79eb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expired_at\` \`expired_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`help_db\`.\`cause\` DROP COLUMN \`organizationId\``,
    );
    await queryRunner.query(`DROP TABLE \`help_db\`.\`organization\``);
  }
}
