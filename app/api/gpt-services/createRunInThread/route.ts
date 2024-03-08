import type { NextApiRequest, NextApiResponse } from 'next';
import { createRunInThread } from '../../../services/gpt-services';

/* export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await createRunInThread(req, res);
} */


/* import { createRunInThread } from '../../../services/gpt-services'

export async function POST() {
    return createRunInThread()
} */

export async function POST(req: Request) {
    const { threadId, assistantId = "asst_2Te8tbdYTkRGX3nNyy5z9l5x" } = await req.json()
    return createRunInThread(threadId, assistantId)
}