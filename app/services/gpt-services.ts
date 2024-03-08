import FormData from 'form-data';
import fs from 'fs';
import fetch from 'node-fetch';
import { Stream } from 'stream';
import { IncomingForm } from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

const fetchHeaders = {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
    'OpenAI-Beta': 'assistants=v1'
};

export async function createThread() {
    const response = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: fetchHeaders,
    })
    const data = await response.json()
    return data
}

export async function uploadFile(formData: FormData) {
    //const formData = new FormData();
    //formData.append('file', file);
    //formData.append('purpose', 'assistants');

    const response = await fetch('https://api.openai.com/v1/files', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,},
        body: formData,
    });

    const data = await response.json();
    return data;
}

export async function createMessage(threadId: string, content: string, fileIds: string) {
    if (!threadId || !content) {
        return ({ error: 'Missing threadId or content' });
    }
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify({
            role: "user",
            content,
            file_ids: fileIds || [],
        }),
    })
    const data = await response.json()
    return data
}

export async function createRun(threadId: string, assistantId: string) {
    if (!threadId) {
        return ({ error: 'threadId is required' });
    }
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify({
            assistant_id: assistantId,
        }),
    })
    const data = await response.json()
    return data
}

export async function retrieveRun(threadId: string, runId: string) {
    if (!threadId || !runId) {
        return ({ error: 'threadId and runId are required' });
    }

    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers: fetchHeaders,
    })
    const data = await response.json()
    return data
}

export async function listRunSteps(threadId: string, runId: string) {
    if (!threadId || !runId) {
        return ({ error: 'threadId and runId are required' });
    }
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}/steps`, {

        method: 'GET',
        headers: fetchHeaders,
    })
    const data = await response.json()
    return data
}

export async function retrieveMessage(threadId: string, messageId: string) {
    if (!threadId || !messageId) {
        return ({ error: 'threadId and messageId are required' });
    }
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages/${messageId}`, {
        method: 'GET',
        headers: fetchHeaders,
    })
    const data = await response.json()
    return data
}