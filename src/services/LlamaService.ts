import { Ollama } from 'ollama';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HumanMessage } from '@langchain/core/messages';

export class LlamaService {
    private model: ChatOllama;

    constructor() {
        this.model = new ChatOllama({
            baseUrl: 'http://localhost:11434',
            model: 'llama3.2',
        });
    }

    async generateResponse(prompt: string): Promise<string> {
        try {
            const response = await this.model.invoke([
                new HumanMessage(prompt),
            ]);
            return response.content as string;
        } catch (error) {
            console.error('Error generating response:', error);
            throw new Error('Failed to generate response from Llama model');
        }
    }
}
