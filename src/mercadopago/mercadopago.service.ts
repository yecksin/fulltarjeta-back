import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  constructor(private configService: ConfigService) {}

  createMercadoPagoPayment() {
    // Step 2: Initialize the client object
    const client = new MercadoPagoConfig({
      accessToken: this.configService.get<string>('ACCESS_TOKEN'),
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });

    // Step 3: Initialize the API object
    const payment = new Payment(client);

    // Step 4: Create the request object
    const body = {
      transaction_amount: 10000,
      description: 'Memoria RAM 16GB',
      payment_method_id: 'pix',
      payer: {
        email: 'test@test.com',
      },
    };

    // Step 5: Create request options object - Optional
    const requestOptions = {
      idempotencyKey: 'abc',
    };

    // Step 6: Make the request
    payment
      .create({ body, requestOptions })
      .then(console.log)
      .catch(console.log);
    return 'This action adds a new mercadopago';
  }

  getMercadoPago() {
    return 'This action adds a new mercadopago';
  }
}
