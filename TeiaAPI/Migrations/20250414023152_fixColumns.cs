using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeiaAPI.Migrations
{
    /// <inheritdoc />
    public partial class fixColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "aguas_pluviais",
                table: "solucoes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "guias_sarjetas",
                table: "solucoes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "seguranca",
                table: "solucoes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "fechamento_terreno",
                table: "lote",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "localizacao_unidade",
                table: "lote",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "idade_imovel",
                table: "imovel",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "patologia",
                table: "imovel",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "tipo_do_imovel",
                table: "imovel",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "valor_imovel",
                table: "imovel",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "identificacao_pav",
                table: "apartamento",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "aguas_pluviais",
                table: "solucoes");

            migrationBuilder.DropColumn(
                name: "guias_sarjetas",
                table: "solucoes");

            migrationBuilder.DropColumn(
                name: "seguranca",
                table: "solucoes");

            migrationBuilder.DropColumn(
                name: "fechamento_terreno",
                table: "lote");

            migrationBuilder.DropColumn(
                name: "localizacao_unidade",
                table: "lote");

            migrationBuilder.DropColumn(
                name: "idade_imovel",
                table: "imovel");

            migrationBuilder.DropColumn(
                name: "patologia",
                table: "imovel");

            migrationBuilder.DropColumn(
                name: "tipo_do_imovel",
                table: "imovel");

            migrationBuilder.DropColumn(
                name: "valor_imovel",
                table: "imovel");

            migrationBuilder.DropColumn(
                name: "identificacao_pav",
                table: "apartamento");
        }
    }
}
