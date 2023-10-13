import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookingDateFields1697217417579 implements MigrationInterface {
  name = 'BookingDateFields1697217417579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "arrivalDate"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "arrivalDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP COLUMN "departureDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "departureDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP COLUMN "departureDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "departureDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "arrivalDate"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "arrivalDate" TIMESTAMP NOT NULL`,
    );
  }
}
