using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class ImovelMap : IEntityTypeConfiguration<ImovelModel>
    {
        public void Configure(EntityTypeBuilder<ImovelModel> builder){
            //? Chave Primária
            builder.HasKey(x => x.Id);

            //?Forgein Keys
            builder.Property(x => x.IdAcabamento);
            builder.HasOne(x => x.Acabamento).WithOne().HasForeignKey<ImovelModel>(x => x.IdAcabamento);
            builder.Property(x => x.IdDivisao);
            builder.HasOne(x => x.Divisao).WithOne().HasForeignKey<ImovelModel>(x => x.IdDivisao);
            builder.Property(x => x.IdInfraestrura);
            builder.HasOne(x => x.Infraestrutura).WithOne().HasForeignKey<ImovelModel>(x => x.IdInfraestrura);


            //?Props
            builder.HasMany(x => x.AreaImovel).WithMany(x => x.Imoveis).UsingEntity(x => x.ToTable("area_imovel"));

            //?Others
            builder.Property(x => x.Frente).IsRequired();

            //?Enums

            // builder.ToTable("vistoria");
        }
    }
}