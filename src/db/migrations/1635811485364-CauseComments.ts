import {MigrationInterface, QueryRunner} from "typeorm";

export class CauseComments1635811485364 implements MigrationInterface {
    name = 'CauseComments1635811485364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`cause_comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(250) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`causeId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause_comment\` ADD CONSTRAINT \`FK_03fa7df12cd268af2d86752c0f1\` FOREIGN KEY (\`causeId\`) REFERENCES \`help_db\`.\`cause\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause_comment\` ADD CONSTRAINT \`FK_7105adad6e27549b62eebf65d16\` FOREIGN KEY (\`userId\`) REFERENCES \`help_db\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause_comment\` DROP FOREIGN KEY \`FK_7105adad6e27549b62eebf65d16\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause_comment\` DROP FOREIGN KEY \`FK_03fa7df12cd268af2d86752c0f1\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`cause_comment\``);
    }

}
