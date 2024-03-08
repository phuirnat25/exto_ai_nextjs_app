/* import type { NextApiRequest, NextApiResponse } from 'next'; */
import { createThread } from '../../../services/gpt-services';

/* export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await createThread(req, res);
} */

export async function POST(req: Request) {
    const { message } = await req.json()
    return createThread(message)
}