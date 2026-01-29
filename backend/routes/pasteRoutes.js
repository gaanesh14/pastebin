import express from 'express';
import { createPaste, getPaste } from '../controllers/pasteControllers.js';

const router = express.Router();

// Route to create a new paste
router.post('/paste', createPaste);

// Route to get a paste by its shortId
router.get('/paste/:id', getPaste);

export default router;