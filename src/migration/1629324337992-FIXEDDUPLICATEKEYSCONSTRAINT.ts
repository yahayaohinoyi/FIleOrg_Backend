import { MigrationInterface, QueryRunner } from 'typeorm';

export class FIXEDDUPLICATEKEYSCONSTRAINT1629324337992 implements MigrationInterface {
  name = 'FIXEDDUPLICATEKEYSCONSTRAINT1629324337992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_d25e0f61adef7757968ca0b4177"`);
    await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "REL_d25e0f61adef7757968ca0b417"`);
    await queryRunner.query(
      `ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_d25e0f61adef7757968ca0b4177" FOREIGN KEY ("priorityId") REFERENCES "priority_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_d25e0f61adef7757968ca0b4177"`);
    await queryRunner.query(`ALTER TABLE "folder_entity" ADD CONSTRAINT "REL_d25e0f61adef7757968ca0b417" UNIQUE ("priorityId")`);
    await queryRunner.query(
      `ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_d25e0f61adef7757968ca0b4177" FOREIGN KEY ("priorityId") REFERENCES "priority_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
