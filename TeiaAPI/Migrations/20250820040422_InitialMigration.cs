using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TeiaAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "acabamento",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    muro = table.Column<int>(type: "integer", nullable: false),
                    piso = table.Column<int>(type: "integer", nullable: false),
                    janelas = table.Column<int>(type: "integer", nullable: false),
                    bancada = table.Column<int>(type: "integer", nullable: false),
                    quadro_eletrico = table.Column<int>(type: "integer", nullable: false),
                    padrao = table.Column<int>(type: "integer", nullable: false),
                    estado_conservacao = table.Column<int>(type: "integer", nullable: false),
                    teto = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_acabamento", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "area",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    valor = table.Column<float>(type: "real", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_area", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "area_servico",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    qtde = table.Column<int>(type: "integer", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_area_servico", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "banheiros",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    qtde = table.Column<int>(type: "integer", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_banheiros", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "bloco_predio",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    pavimentos = table.Column<int>(type: "integer", nullable: false),
                    elevadores = table.Column<int>(type: "integer", nullable: false),
                    idade = table.Column<int>(type: "integer", nullable: false),
                    aptos_por_andar = table.Column<int>(type: "integer", nullable: false),
                    unidades_predio = table.Column<int>(type: "integer", nullable: false),
                    subsolos = table.Column<int>(type: "integer", nullable: false),
                    blocos = table.Column<int>(type: "integer", nullable: false),
                    outros = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bloco_predio", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "divisao",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    quartos = table.Column<int>(type: "integer", nullable: false),
                    salas = table.Column<int>(type: "integer", nullable: false),
                    cozinhas = table.Column<int>(type: "integer", nullable: false),
                    sacada_varanda = table.Column<int>(type: "integer", nullable: false),
                    lavabos = table.Column<int>(type: "integer", nullable: false),
                    ar_condicionado = table.Column<int>(type: "integer", nullable: false),
                    piscina = table.Column<int>(type: "integer", nullable: false),
                    Outros = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_divisao", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "endereco",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rua = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    numero = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    bairro = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    cidade = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    estado = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false),
                    cep = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    complemento = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    tipoImovel = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_endereco", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "garagem",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    qtde = table.Column<int>(type: "integer", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_garagem", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "infraestrutura",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rede_agua = table.Column<bool>(type: "boolean", nullable: false),
                    rede_esgoto = table.Column<bool>(type: "boolean", nullable: false),
                    iluminacao = table.Column<bool>(type: "boolean", nullable: false),
                    pavimentacao = table.Column<bool>(type: "boolean", nullable: false),
                    fossa = table.Column<bool>(type: "boolean", nullable: false),
                    sumidouro = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_infraestrutura", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "obra",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    servico = table.Column<float>(type: "real", nullable: false),
                    infraestrutura = table.Column<float>(type: "real", nullable: false),
                    supra_estrutura = table.Column<float>(type: "real", nullable: false),
                    paredes = table.Column<float>(type: "real", nullable: false),
                    esquadrias = table.Column<float>(type: "real", nullable: false),
                    vidros_plasticos = table.Column<float>(type: "real", nullable: false),
                    cobertura = table.Column<float>(type: "real", nullable: false),
                    impermeabilizacao = table.Column<float>(type: "real", nullable: false),
                    revestimentos_internos = table.Column<float>(type: "real", nullable: false),
                    revestimentos_externos = table.Column<float>(type: "real", nullable: false),
                    forros = table.Column<float>(type: "real", nullable: false),
                    pisos = table.Column<float>(type: "real", nullable: false),
                    pintura = table.Column<float>(type: "real", nullable: false),
                    acabamentos = table.Column<float>(type: "real", nullable: false),
                    instalacoes_eletricas = table.Column<float>(type: "real", nullable: false),
                    instalacoes_hidraulicas = table.Column<float>(type: "real", nullable: false),
                    instalacoes_esgoto = table.Column<float>(type: "real", nullable: false),
                    locas_metais = table.Column<float>(type: "real", nullable: false),
                    complementos = table.Column<float>(type: "real", nullable: false),
                    outros = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_obra", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "pintura",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    qtde = table.Column<int>(type: "integer", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false),
                    estilo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pintura", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "portas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    loc = table.Column<int>(type: "integer", nullable: false),
                    material = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_portas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "revestimento",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tipo = table.Column<int>(type: "integer", nullable: false),
                    local = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_revestimento", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "solucoes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    agua = table.Column<int>(type: "integer", nullable: false),
                    esgoto = table.Column<int>(type: "integer", nullable: false),
                    energia = table.Column<int>(type: "integer", nullable: false),
                    pavimentacao = table.Column<int>(type: "integer", nullable: false),
                    aguas_pluviais = table.Column<int>(type: "integer", nullable: false),
                    guias_sarjetas = table.Column<int>(type: "integer", nullable: false),
                    iluminacao = table.Column<int>(type: "integer", nullable: false),
                    coleta_lixo = table.Column<int>(type: "integer", nullable: false),
                    creche = table.Column<int>(type: "integer", nullable: false),
                    escola = table.Column<int>(type: "integer", nullable: false),
                    saude = table.Column<int>(type: "integer", nullable: false),
                    seguranca = table.Column<int>(type: "integer", nullable: false),
                    lazer = table.Column<int>(type: "integer", nullable: false),
                    comercio = table.Column<int>(type: "integer", nullable: false),
                    abs_gas = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_solucoes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    username = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    type = table.Column<int>(type: "integer", nullable: true),
                    email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    status = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "apartamento",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    andar = table.Column<int>(type: "integer", nullable: false),
                    condominio_val = table.Column<float>(type: "real", nullable: false),
                    administradora = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: true),
                    tel_administradora = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    vista = table.Column<int>(type: "integer", nullable: false),
                    posicao = table.Column<int>(type: "integer", nullable: false),
                    identificacao_pav = table.Column<string>(type: "text", nullable: true),
                    bloco_predio_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_apartamento", x => x.id);
                    table.ForeignKey(
                        name: "FK_apartamento_bloco_predio_bloco_predio_id",
                        column: x => x.bloco_predio_id,
                        principalTable: "bloco_predio",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "area_servico_divisao",
                columns: table => new
                {
                    AreaServicoId = table.Column<int>(type: "integer", nullable: false),
                    DivisoesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_area_servico_divisao", x => new { x.AreaServicoId, x.DivisoesId });
                    table.ForeignKey(
                        name: "FK_area_servico_divisao_area_servico_AreaServicoId",
                        column: x => x.AreaServicoId,
                        principalTable: "area_servico",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_area_servico_divisao_divisao_DivisoesId",
                        column: x => x.DivisoesId,
                        principalTable: "divisao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "banheiros_divisao",
                columns: table => new
                {
                    BanheirosId = table.Column<int>(type: "integer", nullable: false),
                    DivisoesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_banheiros_divisao", x => new { x.BanheirosId, x.DivisoesId });
                    table.ForeignKey(
                        name: "FK_banheiros_divisao_banheiros_BanheirosId",
                        column: x => x.BanheirosId,
                        principalTable: "banheiros",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_banheiros_divisao_divisao_DivisoesId",
                        column: x => x.DivisoesId,
                        principalTable: "divisao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "garagem_divisao",
                columns: table => new
                {
                    DivisoesId = table.Column<int>(type: "integer", nullable: false),
                    GaragemsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_garagem_divisao", x => new { x.DivisoesId, x.GaragemsId });
                    table.ForeignKey(
                        name: "FK_garagem_divisao_divisao_DivisoesId",
                        column: x => x.DivisoesId,
                        principalTable: "divisao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_garagem_divisao_garagem_GaragemsId",
                        column: x => x.GaragemsId,
                        principalTable: "garagem",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "imovel",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Frente = table.Column<float>(type: "real", nullable: false),
                    id_acabamento = table.Column<int>(type: "integer", nullable: true),
                    valor_imovel = table.Column<float>(type: "real", nullable: false),
                    patologia = table.Column<string>(type: "text", nullable: true),
                    idade_imovel = table.Column<int>(type: "integer", nullable: false),
                    id_divisao = table.Column<int>(type: "integer", nullable: true),
                    id_infraestrutura = table.Column<int>(type: "integer", nullable: true),
                    Telhado = table.Column<int>(type: "integer", nullable: true),
                    situacao = table.Column<int>(type: "integer", nullable: false),
                    tipo_do_imovel = table.Column<int>(type: "integer", nullable: false),
                    cota_greide = table.Column<int>(type: "integer", nullable: false),
                    posicao_unidade = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_imovel", x => x.id);
                    table.ForeignKey(
                        name: "FK_imovel_acabamento_id_acabamento",
                        column: x => x.id_acabamento,
                        principalTable: "acabamento",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_imovel_divisao_id_divisao",
                        column: x => x.id_divisao,
                        principalTable: "divisao",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_imovel_infraestrutura_id_infraestrutura",
                        column: x => x.id_infraestrutura,
                        principalTable: "infraestrutura",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "pintura_acabamento",
                columns: table => new
                {
                    AcabamentosId = table.Column<int>(type: "integer", nullable: false),
                    PinturasId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pintura_acabamento", x => new { x.AcabamentosId, x.PinturasId });
                    table.ForeignKey(
                        name: "FK_pintura_acabamento_acabamento_AcabamentosId",
                        column: x => x.AcabamentosId,
                        principalTable: "acabamento",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pintura_acabamento_pintura_PinturasId",
                        column: x => x.PinturasId,
                        principalTable: "pintura",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "portas_acabamento",
                columns: table => new
                {
                    AcabamentosId = table.Column<int>(type: "integer", nullable: false),
                    PortasId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_portas_acabamento", x => new { x.AcabamentosId, x.PortasId });
                    table.ForeignKey(
                        name: "FK_portas_acabamento_acabamento_AcabamentosId",
                        column: x => x.AcabamentosId,
                        principalTable: "acabamento",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_portas_acabamento_portas_PortasId",
                        column: x => x.PortasId,
                        principalTable: "portas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AcabamentoModelRevestimentoProps",
                columns: table => new
                {
                    AcabamentosId = table.Column<int>(type: "integer", nullable: false),
                    RevestimentosId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcabamentoModelRevestimentoProps", x => new { x.AcabamentosId, x.RevestimentosId });
                    table.ForeignKey(
                        name: "FK_AcabamentoModelRevestimentoProps_acabamento_AcabamentosId",
                        column: x => x.AcabamentosId,
                        principalTable: "acabamento",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AcabamentoModelRevestimentoProps_revestimento_Revestimentos~",
                        column: x => x.RevestimentosId,
                        principalTable: "revestimento",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "lote",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    solucoes_id = table.Column<int>(type: "integer", nullable: false),
                    area_terreno = table.Column<double>(type: "double precision", nullable: false),
                    frente = table.Column<double>(type: "double precision", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false),
                    formato = table.Column<int>(type: "integer", nullable: false),
                    situacao = table.Column<int>(type: "integer", nullable: false),
                    topografia = table.Column<int>(type: "integer", nullable: false),
                    fechamento_terreno = table.Column<string>(type: "text", nullable: true),
                    localizacao_unidade = table.Column<string>(type: "text", nullable: true),
                    uso_predio = table.Column<int>(type: "integer", nullable: false),
                    acabamento = table.Column<int>(type: "integer", nullable: false),
                    densidade = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    transporte_publico = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lote", x => x.id);
                    table.ForeignKey(
                        name: "FK_lote_solucoes_solucoes_id",
                        column: x => x.solucoes_id,
                        principalTable: "solucoes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "area_imovel",
                columns: table => new
                {
                    AreaImovelId = table.Column<int>(type: "integer", nullable: false),
                    ImoveisId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_area_imovel", x => new { x.AreaImovelId, x.ImoveisId });
                    table.ForeignKey(
                        name: "FK_area_imovel_area_AreaImovelId",
                        column: x => x.AreaImovelId,
                        principalTable: "area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_area_imovel_imovel_ImoveisId",
                        column: x => x.ImoveisId,
                        principalTable: "imovel",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vistoria",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_engenheiro = table.Column<int>(type: "integer", nullable: false),
                    id_vistoriador = table.Column<int>(type: "integer", nullable: false),
                    id_imovel = table.Column<int>(type: "integer", nullable: true),
                    id_tipo_imover = table.Column<int>(type: "integer", nullable: true),
                    id_endereco = table.Column<int>(type: "integer", nullable: false),
                    num_os = table.Column<long>(type: "bigint", nullable: false),
                    url_imagens = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    url_matricula = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    data_lancamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Data_abertura = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    data_conclusao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    tipo = table.Column<int>(type: "integer", nullable: false),
                    contratante = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    tel_contratante = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    cliente = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    latitude = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    longitude = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    obs = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    status = table.Column<int>(type: "integer", nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vistoria", x => x.id);
                    table.ForeignKey(
                        name: "FK_vistoria_endereco_id_endereco",
                        column: x => x.id_endereco,
                        principalTable: "endereco",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vistoria_imovel_id_imovel",
                        column: x => x.id_imovel,
                        principalTable: "imovel",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_vistoria_users_id_engenheiro",
                        column: x => x.id_engenheiro,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vistoria_users_id_vistoriador",
                        column: x => x.id_vistoriador,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcabamentoModelRevestimentoProps_RevestimentosId",
                table: "AcabamentoModelRevestimentoProps",
                column: "RevestimentosId");

            migrationBuilder.CreateIndex(
                name: "IX_apartamento_bloco_predio_id",
                table: "apartamento",
                column: "bloco_predio_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_area_imovel_ImoveisId",
                table: "area_imovel",
                column: "ImoveisId");

            migrationBuilder.CreateIndex(
                name: "IX_area_servico_divisao_DivisoesId",
                table: "area_servico_divisao",
                column: "DivisoesId");

            migrationBuilder.CreateIndex(
                name: "IX_banheiros_divisao_DivisoesId",
                table: "banheiros_divisao",
                column: "DivisoesId");

            migrationBuilder.CreateIndex(
                name: "IX_garagem_divisao_GaragemsId",
                table: "garagem_divisao",
                column: "GaragemsId");

            migrationBuilder.CreateIndex(
                name: "IX_imovel_id_acabamento",
                table: "imovel",
                column: "id_acabamento",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_imovel_id_divisao",
                table: "imovel",
                column: "id_divisao",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_imovel_id_infraestrutura",
                table: "imovel",
                column: "id_infraestrutura",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_lote_solucoes_id",
                table: "lote",
                column: "solucoes_id");

            migrationBuilder.CreateIndex(
                name: "IX_pintura_acabamento_PinturasId",
                table: "pintura_acabamento",
                column: "PinturasId");

            migrationBuilder.CreateIndex(
                name: "IX_portas_acabamento_PortasId",
                table: "portas_acabamento",
                column: "PortasId");

            migrationBuilder.CreateIndex(
                name: "IX_vistoria_id_endereco",
                table: "vistoria",
                column: "id_endereco",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_vistoria_id_engenheiro",
                table: "vistoria",
                column: "id_engenheiro");

            migrationBuilder.CreateIndex(
                name: "IX_vistoria_id_imovel",
                table: "vistoria",
                column: "id_imovel");

            migrationBuilder.CreateIndex(
                name: "IX_vistoria_id_vistoriador",
                table: "vistoria",
                column: "id_vistoriador");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcabamentoModelRevestimentoProps");

            migrationBuilder.DropTable(
                name: "apartamento");

            migrationBuilder.DropTable(
                name: "area_imovel");

            migrationBuilder.DropTable(
                name: "area_servico_divisao");

            migrationBuilder.DropTable(
                name: "banheiros_divisao");

            migrationBuilder.DropTable(
                name: "garagem_divisao");

            migrationBuilder.DropTable(
                name: "lote");

            migrationBuilder.DropTable(
                name: "obra");

            migrationBuilder.DropTable(
                name: "pintura_acabamento");

            migrationBuilder.DropTable(
                name: "portas_acabamento");

            migrationBuilder.DropTable(
                name: "vistoria");

            migrationBuilder.DropTable(
                name: "revestimento");

            migrationBuilder.DropTable(
                name: "bloco_predio");

            migrationBuilder.DropTable(
                name: "area");

            migrationBuilder.DropTable(
                name: "area_servico");

            migrationBuilder.DropTable(
                name: "banheiros");

            migrationBuilder.DropTable(
                name: "garagem");

            migrationBuilder.DropTable(
                name: "solucoes");

            migrationBuilder.DropTable(
                name: "pintura");

            migrationBuilder.DropTable(
                name: "portas");

            migrationBuilder.DropTable(
                name: "endereco");

            migrationBuilder.DropTable(
                name: "imovel");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "acabamento");

            migrationBuilder.DropTable(
                name: "divisao");

            migrationBuilder.DropTable(
                name: "infraestrutura");
        }
    }
}
