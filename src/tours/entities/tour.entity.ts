import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  destino: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'decimal' })
  precio: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;
}
