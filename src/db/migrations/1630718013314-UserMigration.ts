import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1630718013314 implements MigrationInterface {
    name = 'UserMigration1630718013314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`userType\` enum ('organization', 'person') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`emailVerifiedAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`emailVerifiedAt\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD UNIQUE INDEX \`IDX_b0d30285f6775593196167e201\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` CHANGE \`isApproved\` \`isApproved\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b0d30285f6775593196167e201\` ON \`help_db\`.\`organization\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD CONSTRAINT \`FK_b0d30285f6775593196167e2016\` FOREIGN KEY (\`userId\`) REFERENCES \`help_db\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP FOREIGN KEY \`FK_b0d30285f6775593196167e2016\``);
        await queryRunner.query(`DROP INDEX \`REL_b0d30285f6775593196167e201\` ON \`help_db\`.\`organization\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` CHANGE \`isApproved\` \`isApproved\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP INDEX \`IDX_b0d30285f6775593196167e201\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD \`emailVerifiedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`user\``);
    }

}
