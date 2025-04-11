import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ItemController } from './controllers/ItemController';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize controller
const itemController = new ItemController();

// Routes
app.post('/items', (req, res) => itemController.createItem(req, res));
app.get('/items', (req, res) => itemController.getItems(req, res));
app.get('/items/:id', (req, res) => itemController.getItemById(req, res));
app.put('/items/:id', (req, res) => itemController.updateItem(req, res));
app.delete('/items/:id', (req, res) => itemController.deleteItem(req, res));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
