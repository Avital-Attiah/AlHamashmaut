
import express from 'express'
import {episode} from '../controller/episodes.js';
import {authenticateToken} from '../service/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js'; 
const episodesRout=express.Router();
const episodeController=new episode();
episodesRout.get('/',episodeController.getAll);
episodesRout.put('/:id',authenticateToken, upload.single('picture'),episodeController.updateEpisode);
episodesRout.delete('/:id',authenticateToken,episodeController.deleteEpisode);
episodesRout.post('/',authenticateToken, upload.single('picture'),episodeController.addEpisode);
export default episodesRout;

