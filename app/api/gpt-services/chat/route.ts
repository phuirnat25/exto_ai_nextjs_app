import { createThread } from '../../../services/gpt-services';
import { uploadFile } from '../../../services/gpt-services';
import { createMessage } from '../../../services/gpt-services';
import { createRun } from '../../../services/gpt-services';
import { retrieveRun } from '../../../services/gpt-services';
import { listRunSteps } from '../../../services/gpt-services';
import { retrieveMessage } from '../../../services/gpt-services';

export async function POST(request: Request) {
    const formData = await request.formData()
    const content = formData.get('content') as string
    const file = formData.get('file');
    const assistantId = formData.get('assistantId') as string
    const thread = await createThread()
    if (file) {
        const formDataFile = new FormData();
        formDataFile.append('file', file);
        formDataFile.append('purpose', 'assistants');
        const uploadFiles = await uploadFile(formDataFile)
        const userMessage = await createMessage(thread.id, content, [uploadFiles.id])
    } else {
        const userMessage = await createMessage(thread.id, content, [])
        console.log("userMessage:",userMessage)
    }
    const run = await createRun(thread.id, assistantId)
    //const retrieveRuns = await retrieveRun(thread.id, run.id)
    let retrieveRuns
    do {
        retrieveRuns = await retrieveRun(thread.id, run.id)
        if (retrieveRuns.status !== "completed") {
            // Wait for 2 seconds before checking the status again
            console.log("Run not compeleted: ", retrieveRuns.status)
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    } while (retrieveRuns.status !== "completed");
    const listRunStep = await listRunSteps(thread.id, run.id)
    const retrieveMessages = await retrieveMessage(thread.id, listRunStep.data[0].step_details.message_creation.message_id)
    const threadId = thread.id
    const botMessage = retrieveMessages.content[0].text.value
    return Response.json({ threadId, assistantId, botMessage })
}