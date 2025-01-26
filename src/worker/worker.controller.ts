import { Controller, Post, Body, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('update-kv')
  @HttpCode(200)
  async updateKv(
    @Body('domain') domain: string,
    @Body('menu') menu: Record<string, any>,
    @Req() request: Request,
  ) {
    console.log('Request from domain:', request.headers.host);
    return await this.workerService.updateKv(domain, menu);
  }
}
