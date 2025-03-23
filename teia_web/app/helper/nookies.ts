
import nookies from 'nookies';

export async function getCookies() {
  const cookies =  nookies.get(null);
  const token = cookies.token
  return token;
}