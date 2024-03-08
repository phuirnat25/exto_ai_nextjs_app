import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadFile } from '../../../services/gpt-services';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await uploadFile(req, res);
}


/* 
export async function POST(req: Request) {
    const formData = await request.formData()

    return uploadFile(threadId, assistantId)
} */

/* import { uploadFile } from '../../../services/gpt-services'

export async function POST() {
    return uploadFile()
} */