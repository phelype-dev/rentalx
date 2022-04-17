import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1649250606268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'start_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'end_date',
            type: 'timestamp',
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
          },
          {
            name: 'total',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            //Nome da FK//
            name: 'FKCarRental',
            //Tabela referenciada//
            referencedTableName: 'cars',
            //referencia da coluna id da table referenciada//
            referencedColumnNames: ['id'],
            //Coluna da table que recebera o id da table referenciada//
            columnNames: ['car_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            //Nome da FK//
            name: 'FKUserRental',
            //Tabela referenciada//
            referencedTableName: 'users',
            //referencia da coluna id da table referenciada//
            referencedColumnNames: ['id'],
            //Coluna da table que recebera o id da table referenciada//
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}
