using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class EnderecoMap : IEntityTypeConfiguration<EnderecoModel>
    {
        public void Configure(EntityTypeBuilder<EnderecoModel> builder){
            builder.HasKey(x => x.Id);

            //?Strings
            builder.Property(x => x.Rua).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Numero).IsRequired().HasMaxLength(10);
            builder.Property(x => x.Bairro).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Cidade).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Estado).IsRequired().HasMaxLength(2);
            builder.Property(x => x.Cep).IsRequired().HasMaxLength(10);
            builder.Property(x => x.Complemento).HasMaxLength(100);

            //?Enums
            builder.Property(x => x.TipoImovel).IsRequired();
            
            // builder.ToTable("vistoria");
        }
    }
}