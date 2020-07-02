import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Server {
    @PrimaryColumn()
    serverId!: string;

    @Column({ default: null, nullable: true, type: String })
    channel?: string | null;

    @Column({ default: null, nullable: true, type: String })
    role?: string | null;
    @Column({ default: null, nullable: true, type: String })
    clan?: string | null;
    @Column({ default: '!!', type: String })
    prefix!: string;
}
