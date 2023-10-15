import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoomAvailabilityTable1697387499928
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'room_availability',
        columns: [
          { name: 'id', type: 'int', isPrimary: true },
          {
            name: 'room_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'availability',
            type: 'jsonb',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('room_availability');
  }
}
