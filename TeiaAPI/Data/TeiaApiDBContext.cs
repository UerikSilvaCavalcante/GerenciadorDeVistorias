using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TeiaAPI.Data.Map;
using TeiaAPI.enums.User;
using TeiaAPI.Models;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Data
{
    public class TeiaApiDBContext : DbContext
    {

        public TeiaApiDBContext(DbContextOptions<TeiaApiDBContext> options) : base(options)
        {

        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<VistoriaModel> Vistorias { get; set; }
        public DbSet<EnderecoModel> Enderecos { get; set; }
        public DbSet<ImovelModel> Imoveis { get; set; }
        public DbSet<InfraestruturaModel> Infraestruturas { get; set; }
        public DbSet<AcabamentoModel> Acabamentos { get; set; }
        public DbSet<DivisaoModel> Divisoes { get; set; }
        public DbSet<ApartamentoModel> Apartamentos { get; set; }
        public DbSet<BlocoPredioModel> BlocoPredio { get; set; }
        public DbSet<LoteModel> Lotes { get; set; }
        public DbSet<SolucoesModel> Solucoes { get; set; }
        public DbSet<ObraModel> Obras { get; set; }

        //?Props
        public DbSet<PortasProps> Portas { get; set; }
        public DbSet<PinturaProps> Pinturas { get; set; }
        public DbSet<RevestimentoProps> Revestimentos { get; set; }
        // public DbSet<PisoModel> Pisos {get; set;}
        public DbSet<BanheirosProps> Banheiros { get; set; }
        public DbSet<GaragemProps> Garagens { get; set; }
        public DbSet<AreaProps> Areas { get; set; }
        public DbSet<AreaServicoProps> AreaServicos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //!Mapeamento
            //?User
            // UserModel defaultEngenheiro = new UserModel();
            // defaultEngenheiro.Id = 1;
            // defaultEngenheiro.Name  = "Engenheiro";
            // defaultEngenheiro.UserName = "Engenheiro";
            // defaultEngenheiro.Email = "turistajose1@gmail.com";
            // defaultEngenheiro.Password = "123";
            // defaultEngenheiro.SetPassword();
            // defaultEngenheiro.Phone = "(62) 9 9999-9999";
            // defaultEngenheiro.Type = TypeUserEnum.Engenheiro;
            // defaultEngenheiro.Status = StatusEnum.Ativado;
            // defaultEngenheiro.SetCreated();
            // modelBuilder.Entity<UserModel>().HasData(defaultEngenheiro);

            // UserModel defaultVistoriador = new UserModel();
            // defaultVistoriador.Id = 2;
            // defaultVistoriador.Name  = "Vistoriador";
            // defaultVistoriador.UserName = "Vistoriador";
            // defaultVistoriador.Email = "turistajose1@gmail.com";
            // defaultVistoriador.Password = "321";
            // defaultVistoriador.SetPassword();
            // defaultVistoriador.Phone = "(62) 9 9999-9999";
            // defaultVistoriador.Type = TypeUserEnum.Vistoriador;
            // defaultVistoriador.Status = StatusEnum.Ativado;
            // defaultVistoriador.SetCreated();
            // modelBuilder.Entity<UserModel>().HasData(defaultVistoriador);

            // UserModel defaultAdmin = new UserModel();
            // defaultAdmin.Id = 3;
            // defaultAdmin.Name  = "Admin";
            // defaultAdmin.UserName = "Admin";
            // defaultAdmin.Email = "uerisalcaval003@gmail.com";
            // defaultAdmin.Password = "admin123";
            // defaultAdmin.SetPassword();
            // defaultAdmin.Phone = "(62) 9 9999-9999";
            // defaultAdmin.Type = TypeUserEnum.Admin;
            // defaultAdmin.Status = StatusEnum.Ativado;
            // defaultAdmin.SetCreated();
            // modelBuilder.Entity<UserModel>().HasData(defaultAdmin);

            modelBuilder.ApplyConfiguration(new UserMap());

            //?Vistoria
            modelBuilder.ApplyConfiguration(new VistoriaMap());
            modelBuilder.ApplyConfiguration(new ImovelMap());
            modelBuilder.ApplyConfiguration(new InfraestruturaMap());
            modelBuilder.ApplyConfiguration(new AcabamentoMap());
            modelBuilder.ApplyConfiguration(new DivisaoMap());
            modelBuilder.ApplyConfiguration(new ApartamentoMap());
            modelBuilder.ApplyConfiguration(new BlocoPredioMap());
            modelBuilder.ApplyConfiguration(new LoteMap());
            modelBuilder.ApplyConfiguration(new EnderecoMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}