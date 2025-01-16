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
          title: 'Suscripción 1 mes - menú digital',
          description: 'Acceso a menú digital durante el periodo de 30 días',
          quantity: 1,
          unit_price: 15000,
          currency_id: 'COP',
        },
      ],
      payer: {
        email: 'yecksin2@gmail.com',
        name: 'Yecksin',
        surname: 'Maurucio',
        identification: {
          type: 'CC',
          number: '12345678',
        },
      },
      back_urls: {
        success:
          'https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/success',
        failure:
          'https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/failure',
        pending:
          'https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/pending',
      },
      // auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
      },
      statement_descriptor: 'MENUDIGITAL',
      notification_url:
        'https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/webhook',
      external_reference: 'userid-3',
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
      publicKey: this.configService.get('ACCESS_TOKEN'),
    };
  }
}
