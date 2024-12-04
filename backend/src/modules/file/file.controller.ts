import { Request, Response } from 'express';
import { FileService } from './file.service';

export class FileController {
    constructor(private readonly fileService: FileService) { }

    upload = async (req: Request, res: Response) => {
        try {
            if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
                res.status(400).json({ message: 'File not uploaded' });
                return;
            }

            const options = {
                compressImage: req.body.compressImage === 'true',
                quality: parseInt(req.body.quality) || 80
            };

            const result = await this.fileService.uploadFiles(req.files, options);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    deleteFiles = async (req: Request, res: Response) => {
        try {
            const { urls } = req.body;

            if (!urls || !Array.isArray(urls) || urls.length === 0) {
                res.status(400).json({ message: 'Valid file URLs not provided' });
                return;
            }

            const result = await this.fileService.deleteFilesByUrls(urls);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getFile = async (req: Request, res: Response) => {
        try {
            const { category, fileName } = req.params;
            const file = await this.fileService.getFile(category, fileName);

            res.setHeader('Content-Type', file.mimeType);
            res.setHeader('Content-Length', file.stat.size);
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            res.setHeader('Last-Modified', file.stat.mtime.toUTCString());

            file.stream.pipe(res);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    getAllFiles = async (req: Request, res: Response) => {
        try {
            const files = await this.fileService.getAllFiles();
            const response = Object.entries(files).map(([type, urls]) => ({
                type,
                data: urls
            }));
            res.json(response);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}
