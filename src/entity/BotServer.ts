import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';
import { prefix } from '../config';
@Entity()
export class BotServer extends BaseEntity {
    @PrimaryColumn()
    serverId!: string;

    @Column({ default: null, nullable: true, type: String })
    channel?: string | null;

    @Column({ default: null, nullable: true, type: String })
    role?: string | null;
    @Column({ default: null, nullable: true, type: String })
    clan?: string | null;
    @Column({ default: prefix, type: String })
    prefix!: string;
}
