import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest } from 'next/server'
import { listRunSteps } from '../../../services/gpt-services';

/* export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await listRunSteps(req, res);
} */

/* import { listRunSteps } from '../../../services/gpt-services'

export async function GET() {
    return listRunSteps()
} */

/* export async function GET(req: Request) {
    const { threadId, runId } = await req.json()
    return listRunSteps(threadId, runId)
} */

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const threadId = searchParams.get('threadId');
    const runId = searchParams.get('runId');

    if (threadId === null || runId === null) {
        return { error: 'threadId and runId must be provided and must be strings.' };
    }

    return listRunSteps(threadId, runId)
}