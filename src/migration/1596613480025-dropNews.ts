import { MigrationInterface, QueryRunner } from 'typeorm';

export class date2timestamp1596613480025 implements MigrationInterface {
    name = 'date2timestamp1596613480025';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE news');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE news');
    }
}
