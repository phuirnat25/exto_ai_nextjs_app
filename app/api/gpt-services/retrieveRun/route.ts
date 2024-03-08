import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest } from 'next/server'
import { retrieveRun } from '../../../services/gpt-services';
//import { Request } from 'express';

/* export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await retrieveRun(req, res);
}
 */
/* export async function GET(req: Request) {
    const { threadId, runId } = req.query
    return retrieveRun(threadId, runId)
} */

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const threadId = searchParams.get('threadId');
    const runId = searchParams.get('runId');

    if (threadId === null || runId === null) {
        return { error: 'threadId and runId must be provided and must be strings.' };
    }

    return retrieveRun(threadId, runId)
}

/* import { retrieveRun } from '../../../services/gpt-services'

export async function GET() {
    return retrieveRun()
} */