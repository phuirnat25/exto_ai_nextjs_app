import type { NextApiRequest, NextApiResponse } from 'next';
import { createMessageToThread } from '../../../services/gpt-services';

/* export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await createMessageToThread(req, res);
} */

export async function POST(req: Request) {
    const { threadId, content, fileIds } = await req.json()
    return createMessageToThread(threadId, content, fileIds)
}