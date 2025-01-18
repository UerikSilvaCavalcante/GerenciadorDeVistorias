using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Models;

namespace TeiaAPI.Repositorios.Interfaces
{
    public interface IUserRepositorio
    {
        Task<List<UserModel>> GetAllUser();
        Task<UserModel> GetUserById(int id);
        Task<UserModel> PostUser(UserModel user);
        Task<UserModel> PutUser(UserModel user,  int id);
        Task<List<UserModel>> GetAllVistoriadores();

        Task<bool> DeleteUser(int id);

        Task<UserModel> GetLogin(string userName);
    }
}