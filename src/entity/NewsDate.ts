import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class NewsDate extends BaseEntity {
    @PrimaryColumn()
    id!: number;
    @Column({ type: 'timestamp' })
    notic!: Date;
    @Column({ type: 'timestamp' })
    update!: Date;
    @Column({ type: 'timestamp' })
    magazine!: Date;
    @Column({ type: 'timestamp' })
    event!: Date;
}
