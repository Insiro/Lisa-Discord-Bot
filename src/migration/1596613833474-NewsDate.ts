import {MigrationInterface, QueryRunner} from "typeorm";

export class NewsDate1596613833474 implements MigrationInterface {
    name = 'NewsDate1596613833474'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "news_date" ("id" integer NOT NULL, "notic" TIMESTAMP NOT NULL, "update" TIMESTAMP NOT NULL, "magazine" TIMESTAMP NOT NULL, "event" TIMESTAMP NOT NULL, CONSTRAINT "PK_532a6eb40f57cd8ba36c7b55e30" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "channel" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "role" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "clan" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "newsChannel" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "newsChannel" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "clan" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "role" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "bot_server" ALTER COLUMN "channel" DROP DEFAULT`, undefined);
        await queryRunner.query(`DROP TABLE "news_date"`, undefined);
    }

}
