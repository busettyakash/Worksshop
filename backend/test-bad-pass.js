import 'dotenv/config';
import { createClient } from '@insforge/sdk';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const client = createClient({ baseUrl: process.env.INSFORGE_API_BASE_URL, anonKey: process.env.INSFORGE_API_KEY });
async function test() {
  const loginRes = await client.auth.signInWithPassword({email: 'busettyakash@gmail.com', password: 'wrongpassword'});
  console.log('Login Response:', JSON.stringify(loginRes, null, 2));
}
test();
