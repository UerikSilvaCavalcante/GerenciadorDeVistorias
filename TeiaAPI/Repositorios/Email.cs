using System.Net.Mail;
using Microsoft.Extensions.Caching.Memory;
using TeiaAPI.Repositorios.Interfaces;

namespace TeiaAPI.Repositorios
{
    public class Email : IEmail
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _expirationTime = TimeSpan.FromMinutes(5);
        public Email(IConfiguration configuration, IMemoryCache cache)
        {
            _configuration = configuration;
            _cache = cache;
        }
        public async Task<bool> Enviar(string email, string assunto)
        {
            try
            {
                string? host = _configuration.GetValue<string>("SMTP:Host");
                string? name = _configuration.GetValue<string>("SMTP:Nome");
                string? UserName = _configuration.GetValue<string>("SMTP:UserName");
                string? senha = _configuration.GetValue<string>("SMTP:Password");
                int porta = _configuration.GetValue<int>("SMTP:Port");
                MailMessage mail = new MailMessage()
                {
                    From = new MailAddress(UserName, name)
                };

                string code = Guid.NewGuid().ToString().Substring(0, 6);
                string mensagem = $"Olá, <br> Seu código de recuperação de senha é: {code}";

                mail.To.Add(email);
                mail.Subject = assunto;
                mail.Body = mensagem;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                using SmtpClient smtp = new SmtpClient(host, porta);
                smtp.Credentials = new System.Net.NetworkCredential(UserName, senha);
                smtp.EnableSsl = true;
                smtp.Send(mail);

                _cache.Set(email, code, _expirationTime);

                return true;
            }
            catch (System.Exception ex)
            {

                return false;
            }
        }

        public Task<bool> ValidCode(string email, string sendCode)
        {
            
            if(_cache.TryGetValue(email, out string? code) == true)
            {
                if(sendCode == code)
                {
                    _cache.Remove(email);
                    return Task.FromResult(true);
                }
            }
            return Task.FromResult(false);
        }

        // public Task<string> GetCodeForPassword()
        // {

        //     return Task.FromResult(code);
        // }


    }
}