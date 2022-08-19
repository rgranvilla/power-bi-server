import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterEmployeesAddAvatar1660864722874
  // eslint-disable-next-line prettier/prettier
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "employees",
      new TableColumn({
        name: "avatar",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("employees", "avatar");
  }
}
