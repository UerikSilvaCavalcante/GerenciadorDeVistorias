using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class InfraestruturaMap : IEntityTypeConfiguration<InfraestruturaModel>
    {
        public void Configure(EntityTypeBuilder<InfraestruturaModel> builder){
            //? Chave Primária
            builder.HasKey(x => x.Id);

            //?Bools
            //!Talves usar um many tomany
            builder.Property(x => x.RedeAguaP).IsRequired();
            builder.Property(x => x.RedeEsgoto).IsRequired();
            builder.Property(x => x.Iluminacao).IsRequired();
            builder.Property(x => x.Pavimentacao).IsRequired();
            builder.Property(x => x.Fossa).IsRequired();
            builder.Property(x => x.Sumidouro).IsRequired();
            // builder.Property(x => x
           
            // builder.ToTable("vistoria");
        }
    }
}