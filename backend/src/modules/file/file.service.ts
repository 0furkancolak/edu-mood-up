import * as fs from 'fs';
import * as path from 'path';
import { config } from '../../config/app.config';
import sharp from 'sharp';

const BASE_PATH = config.BASE_PATH;
const APP_ORIGIN = config.APP_ORIGIN;

interface UploadOptions {
    compressImage: boolean;
    quality?: number;
}

export class FileService {
    private baseUploadDir = 'uploads';
    private baseUrl = APP_ORIGIN + BASE_PATH;
    private defaultOptions: UploadOptions = {
        compressImage: false,
        quality: 80
    };
    private fileCategories: { [key: string]: string[] } = {
        image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.heic', '.heif'],
        document: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.csv'],
        video: ['.mp4', '.webm', '.avi', '.mov', '.wmv'],
        audio: ['.mp3', '.wav', '.flac', '.ogg', '.m4a'],
        archive: ['.zip', '.rar', '.tar', '.gz', '.7z'],
        other: []
    };

    constructor() {
        this.createUploadDirectories();
    }

    private createUploadDirectories() {
        if (!fs.existsSync(this.baseUploadDir)) {
            fs.mkdirSync(this.baseUploadDir);
        }

        Object.keys(this.fileCategories).forEach(category => {
            const categoryPath = path.join(this.baseUploadDir, category);
            if (!fs.existsSync(categoryPath)) {
                fs.mkdirSync(categoryPath, { recursive: true });
            }
        });
    }

    private sanitizeFileName(fileName: string): string {
        const decodedName = decodeURIComponent(fileName);

        return decodedName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9.-]/g, '-')
            .toLowerCase();
    }

    async getAllFiles() {
        try {
            const result: { [key: string]: string[] } = {};

            for (const category of Object.keys(this.fileCategories)) {
                const categoryPath = path.join(this.baseUploadDir, category);
                if (fs.existsSync(categoryPath)) {
                    const files = fs.readdirSync(categoryPath);
                    result[category] = files.map(fileName =>
                        this.getFileUrl(category, fileName)
                    );
                } else {
                    result[category] = [];
                }
            }

            return result;
        } catch (error: any) {
            throw new Error('File list error: ' + error.message);
        }
    }

    private getFileCategory(extension: string): string {
        for (const [category, extensions] of Object.entries(this.fileCategories)) {
            if (extensions.includes(extension.toLowerCase())) {
                return category;
            }
        }
        return 'other';
    }

    async uploadFiles(files: Express.Multer.File[], options: Partial<UploadOptions> = {}) {
        const mergedOptions = { ...this.defaultOptions, ...options };
        try {
            const uploadedFiles = await Promise.all(
                files.map(file => this.processFile(file, mergedOptions))
            );

            return {
                message: 'Files uploaded successfully',
                files: uploadedFiles
            };
        } catch (error: any) {
            throw new Error('File upload error: ' + error.message);
        }
    }

    private async processFile(file: Express.Multer.File, options: UploadOptions) {
        const originalName = decodeURIComponent(file.originalname);
        const extension = path.extname(originalName);
        const category = this.getFileCategory(extension);
        const sanitizedName = this.sanitizeFileName(originalName);
        const fileName = `${Date.now()}-${sanitizedName}`;
        const categoryPath = path.join(this.baseUploadDir, category);
        const filePath = path.join(categoryPath, fileName);

        try {
            if (options.compressImage && category === 'image' &&
                ['.jpg', '.jpeg', '.png', '.webp'].includes(extension.toLowerCase())) {

                await this.compressAndSaveImage(file.buffer, filePath, options.quality || 80);

            } else {
                fs.writeFileSync(filePath, file.buffer);
            }

            return {
                fileName,
                originalName,
                category,
                size: file.size,
                mimeType: file.mimetype,
                url: this.getFileUrl(category, fileName)
            };
        } catch (error: any) {
            throw new Error(`${originalName} file upload error: ${error.message}`);
        }
    }

    private async compressAndSaveImage(buffer: Buffer, outputPath: string, quality: number) {
        try {
            const extension = path.extname(outputPath).toLowerCase();
            let sharpInstance = sharp(buffer);

            switch (extension) {
                case '.jpg':
                case '.jpeg':
                    await sharpInstance
                        .jpeg({ quality })
                        .toFile(outputPath);
                    break;
                case '.png':
                    await sharpInstance
                        .png({ quality: Math.floor(quality * 0.8) })
                        .toFile(outputPath);
                    break;
                case '.webp':
                    await sharpInstance
                        .webp({ quality })
                        .toFile(outputPath);
                    break;
                default:
                    fs.writeFileSync(outputPath, buffer);
            }
        } catch (error: any) {
            throw new Error(`Image compression error: ${error.message}`);
        }
    }

    async getFile(category: string, fileName: string) {
        try {
            const filePath = path.join(this.baseUploadDir, category, fileName);
            if (!fs.existsSync(filePath)) {
                throw new Error('File not found');
            }

            const stat = fs.statSync(filePath);
            const mimeType = this.getMimeType(fileName);

            return {
                filePath,
                stream: fs.createReadStream(filePath),
                stat,
                mimeType
            };
        } catch (error: any) {
            throw new Error('File not found: ' + error.message);
        }
    }

    private getFileUrl(category: string, fileName: string): string {
        return `${this.baseUrl}/file/${category}/${fileName}`;
    }

    private getMimeType(fileName: string): string {
        const ext = path.extname(fileName).toLowerCase();
        const mimeTypes: { [key: string]: string } = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.xls': 'application/vnd.ms-excel',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.ppt': 'application/vnd.ms-powerpoint',
            '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            '.txt': 'text/plain',
            '.csv': 'text/csv',
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.avi': 'video/x-msvideo',
            '.mov': 'video/quicktime',
            '.wmv': 'video/x-ms-wmv',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/wav',
            '.flac': 'audio/flac',
            '.ogg': 'audio/ogg',
            '.m4a': 'audio/mp4',
            '.zip': 'application/zip',
            '.rar': 'application/x-rar-compressed',
            '.tar': 'application/x-tar',
            '.gz': 'application/gzip',
            '.7z': 'application/x-7z-compressed',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.bmp': 'image/bmp',
            '.tiff': 'image/tiff',
            '.heic': 'image/heic',
            '.heif': 'image/heif'
        };
        return mimeTypes[ext] || 'application/octet-stream';
    }

    async deleteFilesByUrls(urls: string[]) {
        const results = await Promise.all(
            urls.map(async (url) => {
                try {
                    const { category, fileName } = this.parseFileUrl(url);
                    const filePath = path.join(this.baseUploadDir, category, fileName);

                    if (!fs.existsSync(filePath)) {
                        return {
                            url,
                            success: false,
                            message: 'File not found'
                        };
                    }

                    fs.unlinkSync(filePath);
                    return {
                        url,
                        success: true,
                        message: 'File deleted successfully'
                    };
                } catch (error: any) {
                    return {
                        url,
                        success: false,
                        message: error.message
                    };
                }
            })
        );

        return {
            message: 'File deletion process completed',
            results
        };
    }

    private parseFileUrl(url: string): { category: string; fileName: string } {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            const category = pathParts[pathParts.length - 2];
            const fileName = pathParts[pathParts.length - 1];

            if (!category || !fileName) {
                throw new Error('Invalid file URL');
            }

            return { category, fileName };
        } catch (error) {
            throw new Error('Invalid file URL');
        }
    }
}
