import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest } from 'next/server'
import { retrieveMessage } from '../../../services/gpt-services';

/* export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await retrieveMessage(req, res);
} */

/* import { retrieveMessage } from '../../../services/gpt-services'

export async function GET() {
    return retrieveMessage()
} */

/* export async function GET(req: Request) {
    const { threadId, messageId } = await req.json()
    return retrieveMessage(threadId, messageId)
} */

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const threadId = searchParams.get('threadId');
    const messageId = searchParams.get('messageId');

    if (threadId === null || messageId === null) {
        return { error: 'threadId and runId must be provided and must be strings.' };
    }

    return retrieveMessage(threadId, messageId)
}