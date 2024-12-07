using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class ApartamentoMap : IEntityTypeConfiguration<ApartamentoModel>
    {
        public void Configure(EntityTypeBuilder<ApartamentoModel> builder){
            //? Chave Primária
            builder.HasKey(x => x.Id);

            //?Foreign Key
            builder.Property(x => x.BlocoPredioId).IsRequired();
            builder.HasOne(x => x.BlocoPredio).WithOne().HasForeignKey<ApartamentoModel>(x => x.BlocoPredioId);

            //?Enums
            builder.Property(x => x.Vista).IsRequired();
            builder.Property(x => x.Posicao_).IsRequired();

            //? ints
            builder.Property(x => x.Andar).IsRequired();
            builder.Property(x => x.CondominioVal).IsRequired();

            //? strings
            builder.Property(x => x.Adminstradora).HasMaxLength(80);
            builder.Property(x => x.Tel_Administradora).HasMaxLength(20);
            // builder.ToTable("vistoria");
        }
    }
}