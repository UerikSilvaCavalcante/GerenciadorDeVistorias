using Microsoft.EntityFrameworkCore;
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
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

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

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
