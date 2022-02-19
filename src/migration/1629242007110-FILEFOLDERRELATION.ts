import { MigrationInterface, QueryRunner } from 'typeorm';

export class FILEFOLDERRELATION1629242007110 implements MigrationInterface {
  name = 'FILEFOLDERRELATION1629242007110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file_folder_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fileId" integer, "folderId" integer, CONSTRAINT "PK_e08b6ba7a88f2750cf36ac8beff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_folder_entity" ADD CONSTRAINT "FK_79f0195905a1b4fa469f872e8b7" FOREIGN KEY ("fileId") REFERENCES "file_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_folder_entity" ADD CONSTRAINT "FK_95803d7f4db75604b6f4daeaceb" FOREIGN KEY ("folderId") REFERENCES "folder_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file_folder_entity" DROP CONSTRAINT "FK_95803d7f4db75604b6f4daeaceb"`);
    await queryRunner.query(`ALTER TABLE "file_folder_entity" DROP CONSTRAINT "FK_79f0195905a1b4fa469f872e8b7"`);
    await queryRunner.query(`DROP TABLE "file_folder_entity"`);
  }
}
