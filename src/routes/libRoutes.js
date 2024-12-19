import express from 'express';
import { getAllBooks, createBook, updateBook, deleteBook, filterBooksByParam, getStats, scrapSite } from '../controllers/libController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/get/by/:param/:value', filterBooksByParam);
router.get('/stats', getStats);
router.get('/scraping', scrapSite);

router.post('/', createBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;
