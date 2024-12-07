using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class LoteMap : IEntityTypeConfiguration<LoteModel>
    {
        public void Configure(EntityTypeBuilder<LoteModel> builder){
            //? Chave Primária
            builder.HasKey(x => x.Id);

            //? Foreign Key
            builder.Property(x => x.SolucoesId);
            builder.HasOne(x => x.Solucoes).WithMany().HasForeignKey(x => x.SolucoesId);

            //? Enums
            builder.Property(x => x.Tipo).IsRequired();
            builder.Property(x => x.Formato).IsRequired();
            builder.Property(x => x.Situacao).IsRequired();
            builder.Property(x => x.Topografia).IsRequired();
            builder.Property(x => x.UsoPredio).IsRequired();
            builder.Property(x => x.Acabamento).IsRequired();
            
            //?strings
            builder.Property(x => x.Densidade).HasMaxLength(50).IsRequired();
            
            //? bool
            builder.Property(x => x.TransportePublico).IsRequired();
            // builder.ToTable("vistoria");
        }
    }
}