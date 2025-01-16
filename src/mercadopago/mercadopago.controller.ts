import { Controller, Get, Post, Query } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @Get()
  getMercadoPago() {
    return this.mercadopagoService.getMercadoPago();
  }

  @Get('pending')
  getPending(@Query() query: any) {
    console.log('pending');
    console.log(query);
    return 'pending';
  }

  @Get('success')
  getSuccess(@Query() query: any) {
    console.log('success');
    console.log(query);
    return 'success';
  }

  @Get('failure')
  getFailure(@Query() query: any) {
    console.log('failure');
    console.log(query);
    return 'failure';
  }

  @Get('webhook')
  getWebhook(@Query() query: any) {
    console.log('webhook');
    console.log(query);
    return 'webhook';
  }

  @Post()
  createMercadoPagoPayment() {
    return this.mercadopagoService.createMercadoPagoPayment();
  }
}
