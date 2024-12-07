using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class AcabamentoMap : IEntityTypeConfiguration<AcabamentoModel>
    {
        public void Configure(EntityTypeBuilder<AcabamentoModel> builder){
            //? Chave Primária
            builder.HasKey(x => x.Id);

            //?Props
            builder.HasMany(x => x.Pinturas).WithMany(x => x.Acabamentos).UsingEntity(x => x.ToTable("pintura_acabamento"));
            builder.HasMany(x => x.Portas).WithMany(x => x.Acabamentos).UsingEntity(x => x.ToTable("portas_acabamento"));
           
            //? Enums da Tabela Acabamento
            builder.Property(x => x.Muro).IsRequired();
            builder.Property(x => x.Piso).IsRequired();
            builder.Property(x => x.Janelas).IsRequired();
            builder.Property(x => x.Bancada).IsRequired();
            builder.Property(x => x.Padrao).IsRequired();
            builder.Property(x => x.EstadoConservacao).IsRequired();
            builder.Property(x => x.Teto).IsRequired();
            // builder.ToTable("vistoria");
        }
    }
}