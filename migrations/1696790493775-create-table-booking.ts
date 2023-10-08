import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBooking1696790493775 implements MigrationInterface {
  name = 'CreateTableBooking1696790493775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "booking" (
                "bookingId" character varying NOT NULL,
                "clientId" character varying NOT NULL,
                "roomName" character varying NOT NULL,
                "arrivalDate" TIMESTAMP NOT NULL,
                "departureDate" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_2aa4ef0259b62eadae336c6df1d" PRIMARY KEY ("bookingId")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "booking"
        `);
  }
}
