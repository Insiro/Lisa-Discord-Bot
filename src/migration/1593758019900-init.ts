import {MigrationInterface, QueryRunner} from "typeorm";

export class init1593758019900 implements MigrationInterface {
    name = 'init1593758019900'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "server" ("serverId" character varying NOT NULL, "channel" character varying DEFAULT null, "role" character varying DEFAULT null, "clan" character varying DEFAULT null, "prefix" character varying NOT NULL DEFAULT '!!', CONSTRAINT "PK_791c2755f251cf228b6cc9577b0" PRIMARY KEY ("serverId"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "server"`, undefined);
    }

}
