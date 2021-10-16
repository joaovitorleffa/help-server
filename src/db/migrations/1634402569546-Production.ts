import {MigrationInterface, QueryRunner} from "typeorm";

export class Production1634402569546 implements MigrationInterface {
    name = 'Production1634402569546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`feedback_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`causeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`userType\` enum ('organization', 'person') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`emailVerifiedAt\` timestamp NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`profileImage\` varchar(255) NULL, \`phoneNumber\` varchar(11) NOT NULL, \`cep\` varchar(8) NOT NULL, \`city\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`number\` varchar(14) NOT NULL, \`isApproved\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_b0d30285f6775593196167e201\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`cause\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(450) NOT NULL, \`type\` enum ('donation', 'voluntary_work') NOT NULL DEFAULT 'donation', \`feedback\` varchar(450) NOT NULL, \`endAt\` timestamp NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`organizationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`feedback_image\` ADD CONSTRAINT \`FK_62607411fa5262e99878a638ebf\` FOREIGN KEY (\`causeId\`) REFERENCES \`help_db\`.\`cause\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD CONSTRAINT \`FK_b0d30285f6775593196167e2016\` FOREIGN KEY (\`userId\`) REFERENCES \`help_db\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` ADD CONSTRAINT \`FK_17301c1efde24ef92ce240d79eb\` FOREIGN KEY (\`organizationId\`) REFERENCES \`help_db\`.\`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` DROP FOREIGN KEY \`FK_17301c1efde24ef92ce240d79eb\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP FOREIGN KEY \`FK_b0d30285f6775593196167e2016\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`feedback_image\` DROP FOREIGN KEY \`FK_62607411fa5262e99878a638ebf\``);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`cause\``);
        await queryRunner.query(`DROP INDEX \`REL_b0d30285f6775593196167e201\` ON \`help_db\`.\`organization\``);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`organization\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`help_db\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`feedback_image\``);
    }

}
