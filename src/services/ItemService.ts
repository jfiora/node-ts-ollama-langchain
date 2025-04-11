import { Item } from '../models/Item';

export class ItemService {
    private items: Item[] = [];

    // Create
    async createItem(
        item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Item> {
        const newItem: Item = {
            id: Math.random().toString(36).substr(2, 9),
            ...item,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.items.push(newItem);
        return newItem;
    }

    // Read
    async getItems(): Promise<Item[]> {
        return this.items;
    }

    async getItemById(id: string): Promise<Item | undefined> {
        return this.items.find((item) => item.id === id);
    }

    // Update
    async updateItem(
        id: string,
        updatedItem: Partial<Item>
    ): Promise<Item | undefined> {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) return undefined;

        this.items[index] = {
            ...this.items[index],
            ...updatedItem,
            updatedAt: new Date(),
        };

        return this.items[index];
    }

    // Delete
    async deleteItem(id: string): Promise<boolean> {
        const initialLength = this.items.length;
        this.items = this.items.filter((item) => item.id !== id);
        return this.items.length !== initialLength;
    }
}
