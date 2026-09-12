import { release } from '../lib/release';
export const GET = () => new Response(JSON.stringify(release), { headers: { 'Content-Type': 'application/json' } });
