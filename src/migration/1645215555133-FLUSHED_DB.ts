import {MigrationInterface, QueryRunner} from "typeorm";

export class FLUSHEDDB1645215555133 implements MigrationInterface {
    name = 'FLUSHEDDB1645215555133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_e4fabedda7aedcd08517f758736"`);
        await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_b4ac990a56e9153c713aac2ef35"`);
        await queryRunner.query(`ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_e4fabedda7aedcd08517f758736" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_entity" ADD CONSTRAINT "FK_b4ac990a56e9153c713aac2ef35" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_b4ac990a56e9153c713aac2ef35"`);
        await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_e4fabedda7aedcd08517f758736"`);
        await queryRunner.query(`ALTER TABLE "file_entity" ADD CONSTRAINT "FK_b4ac990a56e9153c713aac2ef35" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_e4fabedda7aedcd08517f758736" FOREIGN KEY ("createdById") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
