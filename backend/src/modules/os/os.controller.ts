import { Request, Response } from 'express';
import { OsService } from './os.service';
import * as os from 'os';

export class OsController {
    constructor(private readonly osService: OsService) { }

    getCpuUsage = async (_req: Request, res: Response): Promise<void> => {
        try {
            const cpuUsage = await this.osService.getCpuUsage();
            res.json(cpuUsage);
        } catch (error) {
            res.status(500).json({ error: 'CPU info not found' });
        }
    };

    getMemoryInfo = async (_req: Request, res: Response): Promise<void> => {
        try {
            const memoryInfo = await this.osService.getMemoryInfo();
            res.json(memoryInfo);
        } catch (error) {
            res.status(500).json({ error: 'Memory info not found' });
        }
    };

    getDiskInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const isWindows = os.platform() === 'win32';
            const drive = req.query.drive as string;

            if (isWindows && drive && !drive.endsWith(':')) {
                res.status(400).json({ error: 'Enter a valid drive letter for Windows (e.g: C:)' });
                return;
            }

            const diskInfo = await this.osService.getDiskInfo(drive);
            res.json(diskInfo);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Disk info not found' });
        }
    };

    getSystemInfo = async (_req: Request, res: Response): Promise<void> => {
        try {
            const systemInfo = this.osService.getSystemInfo();
            res.json(systemInfo);
        } catch (error) {
            res.status(500).json({ error: 'System info not found' });
        }
    };

    getMetrics = async (req: Request, res: Response): Promise<void> => {
        try {
            const query = req.query.q as string;

            if (!query || query === 'all') {
                const allMetrics = await this.osService.getAllMetrics();
                res.json(allMetrics);
                return;
            }

            const metrics = query.split(',');
            const result: any = {};

            await Promise.all(
                metrics.map(async (metric) => {
                    switch (metric.trim().toLowerCase()) {
                        case 'cpu':
                            result.cpu = await this.osService.getCpuUsage();
                            break;
                        case 'ram':
                            result.memory = await this.osService.getMemoryInfo();
                            break;
                        case 'disk':
                            result.disk = await this.osService.getDiskInfo();
                            break;
                        case 'system':
                            result.system = this.osService.getSystemInfo();
                            break;
                    }
                })
            );

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Metrics not found' });
        }
    };
}
