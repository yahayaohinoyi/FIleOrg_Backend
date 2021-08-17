import { MigrationInterface, QueryRunner } from 'typeorm';

export class FILEENTITYMIGRATION1629129066378 implements MigrationInterface {
  name = 'FILEENTITYMIGRATION1629129066378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reminder_entity" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "description" character varying NOT NULL, "reminderDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "priorityId" integer, "folderId" integer, CONSTRAINT "REL_ea2de857370bbc5a19fb4776e1" UNIQUE ("priorityId"), CONSTRAINT "REL_2f617d6d3fe7533ba52030fae7" UNIQUE ("folderId"), CONSTRAINT "PK_1b09a69ba1d35c67f008ff69ca0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "priority_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_01cc39f4cdb4dd6e26455c179b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "folder_entity" ("id" SERIAL NOT NULL, "folderScore" integer NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "folderId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "reminderId" integer, "priorityId" integer, CONSTRAINT "REL_4dff66a2190b6cf927f8a3157e" UNIQUE ("reminderId"), CONSTRAINT "REL_d25e0f61adef7757968ca0b417" UNIQUE ("priorityId"), CONSTRAINT "PK_c1c9eba84f5c7029ad887020551" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_entity" ("id" SERIAL NOT NULL, "downloadCount" integer NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "document_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "reminderId" integer, "priorityId" integer, CONSTRAINT "REL_e323c76169a69d162f9c7a4bba" UNIQUE ("reminderId"), CONSTRAINT "REL_a3005e4e16eb723165fab3fc4d" UNIQUE ("priorityId"), CONSTRAINT "PK_d8375e0b2592310864d2b4974b2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reminder_entity" ADD CONSTRAINT "FK_ea2de857370bbc5a19fb4776e11" FOREIGN KEY ("priorityId") REFERENCES "priority_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reminder_entity" ADD CONSTRAINT "FK_2f617d6d3fe7533ba52030fae78" FOREIGN KEY ("folderId") REFERENCES "folder_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_e4fabedda7aedcd08517f758736" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_4dff66a2190b6cf927f8a3157ef" FOREIGN KEY ("reminderId") REFERENCES "reminder_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_d25e0f61adef7757968ca0b4177" FOREIGN KEY ("priorityId") REFERENCES "priority_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_entity" ADD CONSTRAINT "FK_b4ac990a56e9153c713aac2ef35" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_entity" ADD CONSTRAINT "FK_e323c76169a69d162f9c7a4bba4" FOREIGN KEY ("reminderId") REFERENCES "reminder_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_entity" ADD CONSTRAINT "FK_a3005e4e16eb723165fab3fc4dc" FOREIGN KEY ("priorityId") REFERENCES "priority_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_a3005e4e16eb723165fab3fc4dc"`);
    await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_e323c76169a69d162f9c7a4bba4"`);
    await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_b4ac990a56e9153c713aac2ef35"`);
    await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_d25e0f61adef7757968ca0b4177"`);
    await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_4dff66a2190b6cf927f8a3157ef"`);
    await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_e4fabedda7aedcd08517f758736"`);
    await queryRunner.query(`ALTER TABLE "reminder_entity" DROP CONSTRAINT "FK_2f617d6d3fe7533ba52030fae78"`);
    await queryRunner.query(`ALTER TABLE "reminder_entity" DROP CONSTRAINT "FK_ea2de857370bbc5a19fb4776e11"`);
    await queryRunner.query(`DROP TABLE "file_entity"`);
    await queryRunner.query(`DROP TABLE "folder_entity"`);
    await queryRunner.query(`DROP TABLE "priority_entity"`);
    await queryRunner.query(`DROP TABLE "reminder_entity"`);
  }
}
