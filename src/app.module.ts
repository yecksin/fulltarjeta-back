import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadopagoModule } from './mercadopago/mercadopago.module';

@Module({
  imports: [MercadopagoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
