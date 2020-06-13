import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Server {
    @PrimaryColumn()
    serverId!: string;

    @Column()
    channel!: string;

    @Column()
    role!: string;
}
