import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterOrganizationMigration1630628209561 implements MigrationInterface {
    name = 'AlterOrganizationMigration1630628209561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`city\``);
    }

}
