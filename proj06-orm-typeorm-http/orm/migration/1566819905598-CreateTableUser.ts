import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableUser1566819905598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
          name: "users",
          columns: [
              {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
              },
              {
                  name: "nickname",
                  type: "varchar",
                  length: "45",
                  isUnique: true,
                  isNullable: false
              },
              {
                  name: "isActive",
                  type: "boolean",
              },
          ]
      }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable("users");
    }

}
