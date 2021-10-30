import {MigrationInterface, QueryRunner} from "typeorm";

export class FavoriteCauses1635559984438 implements MigrationInterface {
    name = 'FavoriteCauses1635559984438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`help_db\`.\`person_favorites_cause\` (\`personId\` int NOT NULL, \`causeId\` int NOT NULL, INDEX \`IDX_ada8aed3a25e44f2961e6748ae\` (\`personId\`), INDEX \`IDX_ddc5578c2c9779e6cfcd13b8ec\` (\`causeId\`), PRIMARY KEY (\`personId\`, \`causeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`person_favorites_cause\` ADD CONSTRAINT \`FK_ada8aed3a25e44f2961e6748aef\` FOREIGN KEY (\`personId\`) REFERENCES \`help_db\`.\`person\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`person_favorites_cause\` ADD CONSTRAINT \`FK_ddc5578c2c9779e6cfcd13b8ec6\` FOREIGN KEY (\`causeId\`) REFERENCES \`help_db\`.\`cause\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`person_favorites_cause\` DROP FOREIGN KEY \`FK_ddc5578c2c9779e6cfcd13b8ec6\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`person_favorites_cause\` DROP FOREIGN KEY \`FK_ada8aed3a25e44f2961e6748aef\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP INDEX \`IDX_ddc5578c2c9779e6cfcd13b8ec\` ON \`help_db\`.\`person_favorites_cause\``);
        await queryRunner.query(`DROP INDEX \`IDX_ada8aed3a25e44f2961e6748ae\` ON \`help_db\`.\`person_favorites_cause\``);
        await queryRunner.query(`DROP TABLE \`help_db\`.\`person_favorites_cause\``);
    }

}
