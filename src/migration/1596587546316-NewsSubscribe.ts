import {MigrationInterface, QueryRunner} from "typeorm";

export class NewsSubscribe1596587546316 implements MigrationInterface {
    name = 'NewsSubscribe1596587546316'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "news" ("id" integer NOT NULL, "notic" date NOT NULL, "update" date NOT NULL, "magazine" date NOT NULL, "event" date NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ADD "newsChannel" character varying DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "channel" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "role" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "clan" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "clan" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "role" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "channel" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" DROP COLUMN "newsChannel"`, undefined);
        await queryRunner.query(`DROP TABLE "news"`, undefined);
    }

}
