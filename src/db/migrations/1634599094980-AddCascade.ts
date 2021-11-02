import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascade1634599094980 implements MigrationInterface {
    name = 'AddCascade1634599094980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`feedback_image\` DROP FOREIGN KEY \`FK_62607411fa5262e99878a638ebf\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP FOREIGN KEY \`FK_b0d30285f6775593196167e2016\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` DROP FOREIGN KEY \`FK_17301c1efde24ef92ce240d79eb\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`feedback_image\` ADD CONSTRAINT \`FK_62607411fa5262e99878a638ebf\` FOREIGN KEY (\`causeId\`) REFERENCES \`help_db\`.\`cause\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD CONSTRAINT \`FK_b0d30285f6775593196167e2016\` FOREIGN KEY (\`userId\`) REFERENCES \`help_db\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` ADD CONSTRAINT \`FK_17301c1efde24ef92ce240d79eb\` FOREIGN KEY (\`organizationId\`) REFERENCES \`help_db\`.\`organization\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` DROP FOREIGN KEY \`FK_17301c1efde24ef92ce240d79eb\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP FOREIGN KEY \`FK_b0d30285f6775593196167e2016\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`feedback_image\` DROP FOREIGN KEY \`FK_62607411fa5262e99878a638ebf\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` ADD CONSTRAINT \`FK_17301c1efde24ef92ce240d79eb\` FOREIGN KEY (\`organizationId\`) REFERENCES \`help_db\`.\`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD CONSTRAINT \`FK_b0d30285f6775593196167e2016\` FOREIGN KEY (\`userId\`) REFERENCES \`help_db\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`feedback_image\` ADD CONSTRAINT \`FK_62607411fa5262e99878a638ebf\` FOREIGN KEY (\`causeId\`) REFERENCES \`help_db\`.\`cause\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
