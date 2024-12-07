using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.enums.Vistoria;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TeiaAPI.Models.Props;
using System.ComponentModel;


namespace TeiaAPI.Models
{
    [Table("vistoria")]
    public class VistoriaModel
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        [Column("id_engenheiro")]
        [Display(Name="IdEngenheiro")]
        public int IdEngenheiro { get; set; }
        public virtual UserModel? Engenheiro { get; set; }
        [Column("id_vistoriador")]
        [Display(Name="IdVistoriador")]
        public int IdVistoriador {get; set; }
        public virtual UserModel? Vistoriador { get; set; }

        [Column("id_imovel")]
        [Display(Name="IdImovel")]
        public int? IdImovel { get; set; }
        public virtual ImovelModel? Imovel { get; set; }

        [Column("id_tipo_imover")]
        [Display(Name="IdTipoImovel")]
        public int? IdTipoImovel { get; set; }

        [Column("id_endereco")]
        [Display(Name="IdEndereco")]
        public int IdEndereco { get; set; }
        public virtual EnderecoModel? Endereco { get; set; }


        [Column("num_os")]
        [Display(Name="NumOs")]
        public long NumOs { get; set; }
        [Column("url_imagens")]
        [Display(Name="URLImagens")]
        public string? URLImagens { get; set; }
        [Column("url_matricula")]
        [Display(Name="URLMatricula")]
        public string? URLMatricula { get; set; }

        [Column("data_vistoria")]
        [Display(Name="DataVistoria")]
        public DateTime DataVistoria { get; set; }

        [Column("tipo")]
        [Display(Name="Tipo")]
        public TypeEnum Type { get; set; }

        [Column("contratante")]
        [Display(Name="Contratante")]
        public string? Contratante { get; set; }
        [Column("tel_contratante")]
        [Display(Name="TelContratante")]
        public string? Tel_Contratante {get; set;}
        [Column("cliente")]
        [Display(Name="Cliente")]
        public string? Cliente {get; set;}

        [Column("latitude")]
        [Display(Name="Latitude")]
        public string? Latitude { get; set; }    
        [Column("longitude")]
        [Display(Name="Longitude")]
        public string? Longitude { get; set; }    

        [Column("obs")]
        [Display(Name="Obs")]
        public string? Obs { get; set; }

        [Column("status")]
        [Display(Name="Status")]
        [DefaultValue(StatusVistoriaEnum.Pendente)]
        public StatusVistoriaEnum Status { get; set; }
        
    }
}