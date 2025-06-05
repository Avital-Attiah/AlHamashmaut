
import express from 'express'
import {episode} from '../controller/episodes.js';
import authenticateToken from '../service/authMiddleware.js';
const episodesRout=express.Router();
const episodeController=new episode();
episodesRout.get('/',authenticateToken,episodeController.getAll);
episodesRout.put('/:id',authenticateToken,episodeController.updateEpisode);
episodesRout.delete('/:id',authenticateToken,episodeController.deleteEpisode);
episodesRout.post('/',authenticateToken,episodeController.addEpisode);
export default episodesRout;

