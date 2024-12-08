using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TeiaAPI.enums.Vistoria;
using TeiaAPI.Models;

namespace TeiaAPI.Data.Map
{
    public class VistoriaMap : IEntityTypeConfiguration<VistoriaModel>
    {
        public void Configure(EntityTypeBuilder<VistoriaModel> builder){
            builder.HasKey(x => x.Id);

            //?Foreign Keys
            builder.Property(x => x.IdEngenheiro).IsRequired();
            builder.HasOne(x => x.Engenheiro).WithMany().HasForeignKey(x => x.IdEngenheiro);
            builder.Property(x => x.IdVistoriador).IsRequired();    
            builder.HasOne(x => x.Vistoriador).WithMany().HasForeignKey(x => x.IdVistoriador);
            builder.Property(x => x.IdImovel).IsRequired(false);
            builder.HasOne(x => x.Imovel).WithMany().HasForeignKey(x => x.IdImovel).IsRequired(false);
            builder.Property(x => x.IdEndereco);
            builder.HasOne(x => x.Endereco).WithOne().HasForeignKey<VistoriaModel>(x => x.IdEndereco).IsRequired();

            //?int
            builder.Property(x => x.IdTipoImovel).IsRequired(false);

            //?Strings
            builder.Property(x => x.NumOs).IsRequired();
            builder.Property(x => x.URLImagens).IsRequired().HasMaxLength(500);
            builder.Property(x => x.URLMatricula).IsRequired().HasMaxLength(500);
            builder.Property(x => x.Contratante).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Tel_Contratante).IsRequired().HasMaxLength(20);
            builder.Property(x => x.Cliente).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Latitude).HasMaxLength(20);
            builder.Property(x => x.Longitude).HasMaxLength(20);
            builder.Property(x => x.Obs).HasMaxLength(1000);


            //?DateTime
            builder.Property(x => x.DataAbertura).IsRequired();
            builder.Property(x => x.DataLancamento);
            builder.Property(x => x.DataConclusao);


            //?Enums
            builder.Property(x => x.Type).IsRequired();
            builder.Property(x => x.Status).HasDefaultValue(StatusVistoriaEnum.Pendente);
            // builder.ToTable("vistoria");
        }
    }
}