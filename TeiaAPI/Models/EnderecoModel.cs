using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.enums.Vistoria;

namespace TeiaAPI.Models
{
    [Table("endereco")]
    public class EnderecoModel
    {
        [Column("id")]
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("rua")]
        [Display(Name = "Rua")]
        public string? Rua { get; set; }

        [Column("numero")]
        [Display(Name = "Numero")]
        public string? Numero { get; set; }
        [Column("bairro")]
        [Display(Name = "Bairro")]
        public string? Bairro { get; set; }

        [Column("cidade")]
        [Display(Name = "Cidade")]
        public string? Cidade { get; set; }

        [Column("estado")]
        [Display(Name = "Estado")]
        public string? Estado { get; set; }

        [Column("cep")]
        [Display(Name = "Cep")]
        public string? Cep { get; set; }

        [Column("complemento")]
        [Display(Name = "Complemento")]
        public string? Complemento { get; set; }

        [Column("tipoImovel")]
        [Display(Name = "TipoImovel")]
        public tipoImovelEnum TipoImovel { get; set; }
        
    }
}