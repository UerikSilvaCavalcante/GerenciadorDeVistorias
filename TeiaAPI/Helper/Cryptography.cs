using System.Security.Cryptography;
using System.Text;


namespace TeiaAPI.Helper
{
    public static class Cryptography
    {
        public static string Encrypt(this string value){

            var hash = SHA1.Create();
            var encoder = new ASCIIEncoding();
            var array = encoder.GetBytes(value);

            array = hash.ComputeHash(array);

            var strHexa = new StringBuilder();

            foreach (var item in array)
            {   
                strHexa.Append(item.ToString("X2"));
            }

            return strHexa.ToString();
        }
    }
}