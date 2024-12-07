using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models.Props;

namespace TeiaAPI.Models
{
    [Table("acabamento")]
    public class AcabamentoModel
    {
        [Column("id")]
        [Key]
        [Display(Name="Id")]
        public int Id { get; set; }

        public enum MuroEnum{
            Alvenaria = 1,
            Cerca = 2,
            Grade = 3,
            Muro = 4,
            Sem = 5
        }

        [Column("muro")]
        [Display(Name="Muro")]
        public MuroEnum Muro { get; set; }
        
        //*Relacao many to many
        public ICollection<PinturaProps>? Pinturas { get; set; }

        //*Relacao many to many
        public ICollection<PortasProps>? Portas { get; set; }
        public enum PisoEnum{
            Ceramica = 1,
            Porcelanato = 2,
            Laminado = 3,
            Madeira = 4,
            Cimento = 5,
            Sem = 6
        }

        [Column("piso")]
        [Display(Name="Piso")]
        public PisoEnum Piso { get; set; }

        public enum JanelasEnum {
            Madeira = 1,
            Aluminio = 2,
            Ferro = 3,
            Vidro = 4,
            Sem = 5
        }

        [Column("janelas")]
        [Display(Name="Janelas")]
        public JanelasEnum Janelas { get; set; }
        public enum BancadaEnum{
            Grafiato = 1,
            Textura = 2,
            Pintura = 3,
            Sem = 4
        } 

        [Column("bancada")]
        [Display(Name="Bancada")]
        public BancadaEnum Bancada { get; set; }

        [Column("quadro_eletrico")]
        [Display(Name="QuadroEletrico")]
        public int QuadroEletrico { get; set; }

        // *: Relacao many to many
        public ICollection<RevestimentoProps>? Revestimentos { get; set; }
        
        public enum PadraoEnum{
            Alto = 1,
            NormalAlto = 2,
            Normal = 3,
            NormalBaixo = 4,
            Baixo = 5,
            Mininimo = 6
        }
        [Column("padrao")]
        [Display(Name="Padrao")]
        public PadraoEnum Padrao { get; set; }

        public enum EstadoConservacaoEnum{
            Construcao = 1,
            Novo = 2,
            Bom = 3,
            Regular = 4,
            Ruim = 5
        }
        [Column("estado_conservacao")]
        [Display(Name="EstadoConservacao")]
        public EstadoConservacaoEnum EstadoConservacao { get; set; }

        public enum TetoEnum{
            Laje = 1,
            Gesso = 2,
            Madeira = 3,
            Metalico = 4,
            PVC = 5,
            Aglomerado = 6,
            Outros = 7,
            TelhadoAperecendo = 8
        }

        [Column("teto")]
        [Display(Name="Teto")]
        public TetoEnum Teto { get; set; }

        public struct AcabamentoManyToManyProps {
            public List<PinturaProps> pintura {get;set;} 
            public List<RevestimentoProps> revestimento {get;set;} 
            public List<PortasProps> portas {get;set;}
        }

    }
}