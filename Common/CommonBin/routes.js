import express from 'express';

var router = express.Router();

import { router as routerFromFilesWithData } from './FilesWithData/routes.js';
import { router as routerFromFileNames } from './FileNames/routes.js';

router.use('/FilesWithData', routerFromFilesWithData);
router.use('/FileNames', routerFromFileNames);

export { router };