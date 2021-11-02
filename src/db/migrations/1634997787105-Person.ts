import {MigrationInterface, QueryRunner} from "typeorm";

export class Person1634997787105 implements MigrationInterface {
    name = 'Person1634997787105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`profileImage\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_83b775da14886d352de2a4cac0\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`person\` ADD CONSTRAINT \`FK_83b775da14886d352de2a4cac01\` FOREIGN KEY (\`userId\`) REFERENCES \`help_db\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`person\` DROP FOREIGN KEY \`FK_83b775da14886d352de2a4cac01\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP INDEX \`REL_83b775da14886d352de2a4cac0\` ON \`help_db\`.\`person\``);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`person\``);
    }

}
