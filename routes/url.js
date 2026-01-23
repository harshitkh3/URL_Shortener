import express from 'express';
import { handleGenerateNewShortURL,handleAnalytics,handlegetalldata } from '../controllers/url.js';
import { restrictToLoggedInUserOnly } from '../middlewares/auth.js';
const router = express.Router();

router.post('/', restrictToLoggedInUserOnly, handleGenerateNewShortURL)

router.get('/analytics/:shortID', restrictToLoggedInUserOnly, handleAnalytics )
router.get('/data', restrictToLoggedInUserOnly, handlegetalldata)
export default router