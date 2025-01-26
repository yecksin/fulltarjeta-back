import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  WorkerKvPayload,
  WorkerKvResponse,
} from './interfaces/worker-kv.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WorkerService {
  private readonly workerUrl: string;
  private readonly workerSecretKey: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.workerUrl = this.configService.get<string>('WORKER_URL');
    this.workerSecretKey = this.configService.get<string>('WORKER_SECRET_KEY');
  }

  async updateKv(
    domain: string,
    menu: Record<string, any>,
  ): Promise<WorkerKvResponse> {
    try {
      const payload: WorkerKvPayload = {
        domain,
        key: this.workerSecretKey,
        menu,
      };

      const { data } = await firstValueFrom(
        this.httpService.post<WorkerKvResponse>(
          `${this.workerUrl}update-kv`,
          payload,
          {
            headers: {
              Origin: this.configService.get<string>('ORIGIN_URL'),
            },
          },
        ),
      );

      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error updating KV store',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
