import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('update-kv')
  @HttpCode(200)
  async updateKv(
    @Body('domain') domain: string,
    @Body('menu') menu: Record<string, any>,
  ) {
    return await this.workerService.updateKv(domain, menu);
  }
}
