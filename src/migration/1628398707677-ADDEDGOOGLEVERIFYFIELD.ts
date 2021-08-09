import { MigrationInterface, QueryRunner } from 'typeorm';

export class ADDEDGOOGLEVERIFYFIELD1628398707677 implements MigrationInterface {
  name = 'ADDEDGOOGLEVERIFYFIELD1628398707677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "isConnected" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "isConnected"`);
  }
}
