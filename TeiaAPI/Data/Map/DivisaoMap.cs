using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class DivisaoMap : IEntityTypeConfiguration<DivisaoModel>
    {
        public void Configure(EntityTypeBuilder<DivisaoModel> builder){
            //? Chave Primária
            builder.HasKey(x => x.Id);

            //?Props
            builder.HasMany(x => x.Banheiros).WithMany(x => x.Divisoes).UsingEntity(x => x.ToTable("banheiros_divisao"));
            builder.HasMany(x => x.Garagems).WithMany(x => x.Divisoes).UsingEntity(x => x.ToTable("garagem_divisao"));
            builder.HasMany(x => x.AreaServico).WithMany(x => x.Divisoes).UsingEntity(x => x.ToTable("area_servico_divisao"));

            //? int
            builder.Property(x => x.Quartos).IsRequired();
            builder.Property(x => x.Salas).IsRequired();
            builder.Property(x => x.Cozinhas).IsRequired();
            builder.Property(x => x.SacadaVaranda).IsRequired();
            builder.Property(x => x.Lavabos).IsRequired();
            builder.Property(x => x.ArCondicionado).IsRequired();
            builder.Property(x => x.Piscina).IsRequired();

            //? strings
            builder.Property(x => x.Outros).HasMaxLength(1000);

            // builder.ToTable("vistoria");
        }
    }
}