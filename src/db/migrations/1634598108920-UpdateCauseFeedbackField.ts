import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCauseFeedbackField1634598108920 implements MigrationInterface {
    name = 'UpdateCauseFeedbackField1634598108920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`feedback\` \`feedback\` varchar(450) NULL`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`endAt\` \`endAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`help_db\`.\`cause\` CHANGE \`feedback\` \`feedback\` varchar(450) NOT NULL`);
    }

}
