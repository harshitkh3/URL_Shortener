import express from 'express';
import { handleGenerateNewShortURL,handleAnalytics,handlegetalldata } from '../controllers/url.js';
const router = express.Router();

router.post('/',handleGenerateNewShortURL)
router.get('/analytics/:shortID', handleAnalytics )
router.get('/data',handlegetalldata)
export default router