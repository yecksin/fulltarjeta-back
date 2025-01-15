import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class MercadopagoService {
  constructor(private configService: ConfigService) {}

  async createMercadoPagoPayment() {
    const accessToken = this.configService.get<string>('ACCESS_TOKEN');
    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 5000 },
    });

    const preference = new Preference(client);

    const body = {
      items: [
        {
          id: '1234',
          title: 'Memoria RAM 16GB',
          description: 'Memoria RAM 16GB DDR4',
          quantity: 1,
          unit_price: 100000,
          currency_id: 'COP',
        },
      ],
      payer: {
        email: 'test@test.com',
        name: 'Test',
        surname: 'User',
        identification: {
          type: 'CC',
          number: '12345678',
        },
      },
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'http://localhost:3000/failure',
        pending: 'http://localhost:3000/pending',
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
      },
    };

    try {
      const result = await preference.create({ body });
      return result;
    } catch (error) {
      console.error('Error creating preference:', error);
      throw error;
    }
  }

  getMercadoPago() {
    return {
      message: 'MercadoPago route works!',
      publicKey: this.configService.get('PUBLIC_KEY'),
    };
  }
}
