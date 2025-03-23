using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TeiaAPI.Data;
using TeiaAPI.Repositorios;
using TeiaAPI.Repositorios.Interfaces;
namespace TeiaAPI
{
    public class Program
    {

        public static void Main(string[] args)
        {
            string secreteKey = "f3b0678a-7869-4b58-822b-a06a7c39c4d6";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.


            builder.Services.AddMemoryCache();
            builder.Services.AddControllers();
            builder.Services.AddEntityFrameworkNpgsql().AddDbContext<TeiaApiDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DataBase")));
            builder.Services.AddScoped<IUserRepositorio, UserRepositorio>();
            builder.Services.AddScoped<IVistoriaRepositorio, VistoriaRepositorio>();
            builder.Services.AddScoped<IEngenheiroRepositorio, EngenheiroRepositorio>();
            builder.Services.AddScoped<IVistoriadorRepositorio, VistoriadorRepositorio>();
            builder.Services.AddScoped<IEnderecoRepositorio, EnderecoRepositorio>();
            builder.Services.AddScoped<IimovelRepositorio, ImovelRepositorio>();
            builder.Services.AddScoped<IDivisaoRepositorio, DivisaoRepositorio>();
            builder.Services.AddScoped<IInfraestruturaRepositorio, InfraestruturaRepositorio>();
            builder.Services.AddScoped<IAcabamentoRepositorio, AcabamentoRepositorio>();
            builder.Services.AddScoped<IApartamentoRepositorio, ApartamentoRepositorio>();
            builder.Services.AddScoped<IBlocoRepositorio, BlocoRepositorio>();
            builder.Services.AddScoped<ILoteRepositorio, LoteRepositorio>();
            builder.Services.AddScoped<ISolucoesRepositorio, SolucoesRepositorio>();
            builder.Services.AddScoped<IObraRepositorio, ObraRepositorio>();
            builder.Services.AddScoped<IEmail, Email>();


            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "APIPolicy", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();

                });
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "uerikToken",
                    ValidAudience = "TEIA",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secreteKey))
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("APIPolicy");
            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
