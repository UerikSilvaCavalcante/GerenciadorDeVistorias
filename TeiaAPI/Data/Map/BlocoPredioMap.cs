using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class BlocoPredioMap : IEntityTypeConfiguration<BlocoPredioModel>
    {
        public void Configure(EntityTypeBuilder<BlocoPredioModel> builder){
            //? Chave Primária
            builder.HasKey(x => x.Id);


            //? ints
            builder.Property(x => x.Pavimentos).IsRequired();
            builder.Property(x => x.Elevadores).IsRequired();
            builder.Property(x => x.Idade).IsRequired();
            builder.Property(x => x.AptosPorAndar).IsRequired();
            builder.Property(x => x.UnidadesPredio).IsRequired();
            builder.Property(x => x.Subsolos).IsRequired();
            builder.Property(x => x.Blocos).IsRequired();

            //? strings
            builder.Property(x => x.Outros).HasMaxLength(1000);
            // builder.ToTable("vistoria");
        }
    }
}