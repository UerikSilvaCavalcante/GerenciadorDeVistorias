using System.Security.Cryptography;
using System.Text;


namespace TeiaAPI.Helper
{
    public class Erros{
        public static Dictionary<int, string> ErroAoBuscarVistorias(){
            Dictionary<int, string> erro = new()
            {
                { 101, "Erro ao buscar Vistorias" }
            };
            return erro;
        }

        public static Dictionary<int, string> ErroDeTipoImovel(){
            Dictionary<int, string> erro = new()
            {
                { 102, "Tipo de serviço não compativel com o tipo de imovel" }
            };
            return erro;
        }
    }
}