import * as os from 'os';
import * as osu from 'node-os-utils';
import * as child_process from 'child_process';
import { promisify } from 'util';

export class OsService {
    async getCpuUsage(): Promise<{
        averageUsage: number;
        cpus: Array<{
            model: string;
            speed: number;
            times: {
                user: number;
                nice: number;
                sys: number;
                idle: number;
                irq: number;
            }
        }>
    }> {
        const usage = await osu.cpu.usage();
        const cpuInfo = os.cpus().map(cpu => ({
            model: cpu.model,
            speed: cpu.speed,
            times: cpu.times
        }));

        return {
            averageUsage: usage,
            cpus: cpuInfo
        };
    }

    async getMemoryInfo(): Promise<{
        totalMemory: number;
        freeMemory: number;
        usedMemory: number;
        memoryUsage: number;
    }> {
        const totalMemory = os.totalmem() / (1024 * 1024);
        const freeMemory = os.freemem() / (1024 * 1024);
        const usedMemory = totalMemory - freeMemory;
        const memoryUsage = (usedMemory / totalMemory) * 100;

        return {
            totalMemory: Number(totalMemory.toFixed(2)),
            freeMemory: Number(freeMemory.toFixed(2)),
            usedMemory: Number(usedMemory.toFixed(2)),
            memoryUsage: Number(memoryUsage.toFixed(2))
        };
    }

    async getDiskInfo(drivePath?: string): Promise<{
        totalDiskSpace: number;
        freeDiskSpace: number;
        usedDiskSpace: number;
        diskUsage: number;
        drive: string;
    }> {
        try {
            const isWindows = os.platform() === 'win32';
            const defaultDrive = isWindows ? 'C:' : '/';
            const drive = drivePath || defaultDrive;

            if (isWindows) {
                const exec = promisify(child_process.exec);
                const { stdout } = await exec(`wmic logicaldisk where "DeviceID='${drive}'" get size,freespace /format:value`);

                const lines = stdout.trim().split('\n');
                const values: { [key: string]: string } = {};

                lines.forEach(line => {
                    const [key, value] = line.trim().split('=');
                    if (key && value) {
                        values[key.trim()] = value.trim();
                    }
                });

                const totalBytes = Number(values['Size']) || 0;
                const freeBytes = Number(values['FreeSpace']) || 0;
                const usedBytes = totalBytes - freeBytes;

                const totalGb = totalBytes / (1024 * 1024 * 1024);
                const freeGb = freeBytes / (1024 * 1024 * 1024);
                const usedGb = usedBytes / (1024 * 1024 * 1024);
                const usedPercentage = totalBytes ? (usedBytes / totalBytes) * 100 : 0;

                return {
                    totalDiskSpace: Number(totalGb.toFixed(2)),
                    freeDiskSpace: Number(freeGb.toFixed(2)),
                    usedDiskSpace: Number(usedGb.toFixed(2)),
                    diskUsage: Number(usedPercentage.toFixed(2)),
                    drive
                };
            } else {
                const { stdout } = await promisify(child_process.exec)(`df -B1 ${drive}`);
                const lines = stdout.trim().split('\n');
                const [, stats] = lines;
                const [, total, , free, usage] = stats.trim().split(/\s+/);

                const totalGb = parseInt(total) / (1024 * 1024 * 1024);
                const freeGb = parseInt(free) / (1024 * 1024 * 1024);
                const usedGb = totalGb - freeGb;
                const usagePercentage = parseFloat(usage.replace('%', ''));

                return {
                    totalDiskSpace: Number(totalGb.toFixed(2)),
                    freeDiskSpace: Number(freeGb.toFixed(2)),
                    usedDiskSpace: Number(usedGb.toFixed(2)),
                    diskUsage: Number(usagePercentage.toFixed(2)),
                    drive
                };
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Disk info not found: ${error.message}`);
            }
            throw new Error('Disk info not found: Unknown error');
        }
    }

    getSystemInfo(): {
        platform: string;
        hostname: string;
        uptime: number;
        cpuCount: number;
        cpuModel: string;
        osType: string;
        osRelease: string;
    } {
        return {
            platform: os.platform(),
            hostname: os.hostname(),
            uptime: os.uptime(),
            cpuCount: os.cpus().length,
            cpuModel: os.cpus()[0].model,
            osType: os.type(),
            osRelease: os.release()
        };
    }

    async getAllMetrics(): Promise<{
        cpu: any;
        memory: any;
        disk: any;
        system: any;
    }> {
        const [cpu, memory, disk] = await Promise.all([
            this.getCpuUsage(),
            this.getMemoryInfo(),
            this.getDiskInfo()
        ]);
        const system = this.getSystemInfo();

        return {
            cpu,
            memory,
            disk,
            system
        };
    }
}
