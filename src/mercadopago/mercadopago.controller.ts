import { Controller, Post, Query, Body } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @Post()
  createMercadoPagoPayment() {
    return this.mercadopagoService.createMercadoPagoPayment();
  }
  @Post('webhook')
  async getWebhook(@Body() body: any, @Query() query: any) {
    return this.mercadopagoService.paymentStatusByDataId(body?.data?.id);
  }
}
