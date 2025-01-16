import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  supabase = createClient(
    this.configService.get('SUPABASE_URL'),
    this.configService.get('SUPABASE_KEY'),
  );
  async getHello(): Promise<string> {
    const res = await this.supabase.from('subdomains').select('*');
    console.log(res);
    return 'Hello World! from railway';
  }
}
