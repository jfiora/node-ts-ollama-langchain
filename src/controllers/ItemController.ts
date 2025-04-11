import { Request, Response } from 'express';
import { ItemService } from '../services/ItemService';

export class ItemController {
    private itemService: ItemService;

    constructor() {
        this.itemService = new ItemService();
    }

    // Create
    async createItem(req: Request, res: Response) {
        try {
            const { name, description } = req.body;
            const newItem = await this.itemService.createItem({
                name,
                description,
            });
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create item' });
        }
    }

    // Read
    async getItems(req: Request, res: Response) {
        try {
            const items = await this.itemService.getItems();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch items' });
        }
    }

    async getItemById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = await this.itemService.getItemById(id);

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.json(item);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch item' });
        }
    }

    // Update
    async updateItem(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const updatedItem = await this.itemService.updateItem(id, {
                name,
                description,
            });

            if (!updatedItem) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update item' });
        }
    }

    // Delete
    async deleteItem(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const success = await this.itemService.deleteItem(id);

            if (!success) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete item' });
        }
    }
}
