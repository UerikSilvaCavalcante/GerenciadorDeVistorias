using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeiaAPI.Repositorios.Interfaces;
using TeiaAPI.Models;
using TeiaAPI.Data;
using Microsoft.EntityFrameworkCore;
using TeiaAPI.enums.User;

namespace TeiaAPI.Repositorios
{
    public class UserRepositorio : IUserRepositorio
    {
        private readonly TeiaApiDBContext _context;

        public UserRepositorio(TeiaApiDBContext context)
        {
            _context = context;
        }

        public async Task<List<UserModel>> GetAllUser()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<UserModel> GetUserById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<UserModel> PostUser(UserModel user)
        {
            UserModel newUser = user;
            newUser.SetCreated();
            newUser.SetPassword();
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        public async Task<UserModel> PutUser(UserModel user, int id)
        {
            UserModel existingUser = await GetUserById(id);
            if (existingUser == null)
            {
                throw new Exception($"O Usuario em questão não foi encontrado no banco de dados");
            }
            existingUser.Name = user.Name;
            existingUser.UserName = user.UserName;
            existingUser.SetNewPassword(user.Password);
            existingUser.Type = user.Type;
            existingUser.Status = user.Status;
            existingUser.Email = user.Email;
            existingUser.Phone = user.Phone;
            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();
            return existingUser;
        }

        public async Task<UserModel> GetLogin(string userName)
        {
            try{
                UserModel user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
                if (user == null)
                {
                    throw new Exception("Usuario não encontrado");
                }
                return user;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            
        }

        public async Task<bool> DeleteUser(int id)
        {
            UserModel usuarioPorId = await GetUserById(id);
            if (usuarioPorId == null)
            {
                throw new Exception($"Usuario para o ID: {id} não foi encontrado no banco de dados");
            }
            _context.Users.Remove(usuarioPorId);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<UserModel>> GetAllVistoriadores()
        {
            return await _context.Users.Where(u => u.Type == TypeUserEnum.Vistoriador).ToListAsync();
        }
    }
}