import { Controller, Get, Post } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @Get()
  getMercadoPago() {
    return this.mercadopagoService.getMercadoPago();
  }

  @Post()
  createMercadoPagoPayment() {
    return this.mercadopagoService.createMercadoPagoPayment();
  }
}
