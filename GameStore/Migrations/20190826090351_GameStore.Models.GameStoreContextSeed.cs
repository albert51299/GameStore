using Microsoft.EntityFrameworkCore.Migrations;

namespace GameStore.Migrations
{
    public partial class GameStoreModelsGameStoreContextSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Cost",
                table: "Games",
                newName: "Price");

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Name", "Price" },
                values: new object[] { 1, "Call of Duty 4", 400 });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Name", "Price" },
                values: new object[] { 2, "Battlefield 3", 500 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Games",
                newName: "Cost");
        }
    }
}
