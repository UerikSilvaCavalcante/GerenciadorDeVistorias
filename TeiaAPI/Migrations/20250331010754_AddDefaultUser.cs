using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TeiaAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "created_at", "email", "name", "password", "phone", "status", "type", "username" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 3, 31, 1, 7, 51, 96, DateTimeKind.Utc).AddTicks(1181), "turistajose1@gmail.com", "Engenheiro", "40BD001563085FC35165329EA1FF5C5ECBDBBEEF", "(62) 9 9999-9999", 1, 2, "Engenheiro" },
                    { 2, new DateTime(2025, 3, 31, 1, 7, 51, 101, DateTimeKind.Utc).AddTicks(2743), "turistajose1@gmail.com", "Vistoriador", "5F6955D227A320C7F1F6C7DA2A6D96A851A8118F", "(62) 9 9999-9999", 1, 3, "Vistoriador" },
                    { 3, new DateTime(2025, 3, 31, 1, 7, 51, 101, DateTimeKind.Utc).AddTicks(3706), "uerisalcaval003@gmail.com", "Admin", "F865B53623B121FD34EE5426C792E5C33AF8C227", "(62) 9 9999-9999", 1, 1, "Admin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "users",
                keyColumn: "id",
                keyValue: 3);
        }
    }
}
