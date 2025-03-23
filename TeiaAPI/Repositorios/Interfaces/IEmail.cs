
namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IEmail
    {
        public Task<bool> Enviar(string email, string assunto);
        public Task<bool> ValidCode(string email,string code);
    }
}