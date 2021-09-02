import { MigrationInterface, QueryRunner } from 'typeorm';

export class CausesMigration1630546477087 implements MigrationInterface {
  name = 'CausesMigration1630546477087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`help_db\`.\`cause\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('donation', 'voluntary_work') NOT NULL DEFAULT 'donation', \`expired_at\` timestamp NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`help_db\`.\`cause\``);
  }
}
