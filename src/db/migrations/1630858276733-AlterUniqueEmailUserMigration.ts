import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUniqueEmailUserMigration1630858276733 implements MigrationInterface {
    name = 'AlterUniqueEmailUserMigration1630858276733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b0d30285f6775593196167e201\` ON \`help_db\`.\`organization\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`user\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`user\` CHANGE \`emailVerifiedAt\` \`emailVerifiedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b0d30285f6775593196167e201\` ON \`help_db\`.\`organization\` (\`userId\`)`);
    }

}
