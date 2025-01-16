import { Controller, Get, Post, Query, Body } from '@nestjs/common';
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
    console.log('==== PENDING PAYMENT ====');
    console.log('Query params:', query);
    // Aquí puedes manejar el estado pendiente
    return {
      status: 'pending',
      data: query,
    };
  }

  @Get('success')
  getSuccess(@Query() query: any) {
    console.log('==== SUCCESS PAYMENT ====');
    console.log('Query params:', query);
    // Aquí puedes manejar el pago exitoso
    return {
      status: 'success',
      data: query,
    };
  }

  @Get('failure')
  getFailure(@Query() query: any) {
    console.log('==== FAILURE PAYMENT ====');
    console.log('Query params:', query);
    // Aquí puedes manejar el pago fallido
    return {
      status: 'failure',
      data: query,
    };
  }

  @Post('webhook')
  async getWebhook(@Body() body: any, @Query() query: any) {
    console.log('==== WEBHOOK NOTIFICATION ====');
    console.log('Query params:', query);
    console.log('Body:', body);

    try {
      // Extraer información relevante
      // const paymentData = {
      //   id: body.data.id,
      //   type: query.type || body.type,
      //   // Metadata y additional_info estarán disponibles en body
      //   metadata: body.metadata,
      //   additional_info: body.additional_info,
      //   external_reference: body.external_reference,
      //   status: body.status,
      //   status_detail: body.status_detail,
      //   payment_method: body.payment_method,
      //   payment_type: body.payment_type_id,
      //   transaction_amount: body.transaction_amount,
      //   // Información del pagador
      //   payer: {
      //     email: body.payer?.email,
      //     identification: body.payer?.identification,
      //     first_name: body.payer?.first_name,
      //     last_name: body.payer?.last_name,
      //   },
      //   // Timestamp del pago
      //   date_created: body.date_created,
      //   date_approved: body.date_approved,
      //   date_last_updated: body.last_modified,
      // };

      // console.log('Processed Payment Data:', paymentData);

      // Aquí puedes implementar tu lógica de negocio
      // Por ejemplo, actualizar el estado de la suscripción en tu base de datos

      return {
        status: 'webhook received',
        data: query,
      };
    } catch (error) {
      console.error('Error processing webhook:', error);
      return {
        status: 'error',
        message: 'Error processing webhook',
        error: error.message,
      };
    }
  }

  @Post()
  createMercadoPagoPayment() {
    return this.mercadopagoService.createMercadoPagoPayment();
  }
}
