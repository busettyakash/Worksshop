import 'dotenv/config';
import { createClient } from '@insforge/sdk';

const client = createClient({
  baseUrl: process.env.INSFORGE_API_BASE_URL,
  anonKey: process.env.INSFORGE_API_KEY
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function test() {
  const loginRes = await client.auth.signInWithPassword({email: 'test000@example.com', password: 'password123'});
  console.log('Login Response:', JSON.stringify(loginRes, null, 2));

  if (loginRes.data?.session?.access_token) {
     const userRes = await client.auth.getUser(loginRes.data.session.access_token);
     console.log('User Response:', JSON.stringify(userRes, null, 2));
  } else if (loginRes.data?.accessToken) {
     const userRes = await client.auth.getUser(loginRes.data.accessToken);
     console.log('User Response:', JSON.stringify(userRes, null, 2));
  }
}
test();
