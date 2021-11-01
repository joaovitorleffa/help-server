import {MigrationInterface, QueryRunner} from "typeorm";

export class OrganizationPhoneNumber1635623008393 implements MigrationInterface {
    name = 'OrganizationPhoneNumber1635623008393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD \`phoneNumber\` varchar(13) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`organization\` ADD \`phoneNumber\` varchar(11) NOT NULL`);
    }

}
