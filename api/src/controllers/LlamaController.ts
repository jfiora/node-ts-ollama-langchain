import { Request, Response } from 'express';
import { LlamaService } from '../services/LlamaService';

export class LlamaController {
    private llamaService: LlamaService;

    constructor() {
        this.llamaService = new LlamaService();
    }

    async generateResponse(req: Request, res: Response) {
        try {
            const { prompt } = req.body;
            console.log(req.body);
            if (!prompt) {
                return res.status(400).json({ error: 'Prompt is required' });
            }

            const response = await this.llamaService.generateResponse(prompt);
            res.json({ response });
        } catch (error) {
            console.error('Error in generateResponse:', error);
            res.status(500).json({ error: 'Failed to generate response' });
        }
    }
}
