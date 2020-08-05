import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class News extends BaseEntity {
    @PrimaryColumn()
    id!: number;
    @Column({ type: 'date' })
    notic!: Date;
    @Column({ type: 'date' })
    update!: Date;
    @Column({ type: 'date' })
    magazine!: Date;
    @Column({ type: 'date' })
    event!: Date;
}
