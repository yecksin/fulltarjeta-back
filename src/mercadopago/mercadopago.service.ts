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

    const userData = {
      userId: 'user_123',
      subdomain: 'restaurant-name',
      planType: 'premium',
      businessName: 'Mi Restaurante',
      customData: {
        planId: 'premium_123',
        startDate: new Date().toISOString(),
        duration: '30 days',
      },
    };

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
        success: `https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/success?userId=${userData.userId}&plan=${userData.planType}&business=${userData.businessName}`,
        failure:
          'https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/failure',
        pending: `https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/pending?userId=${userData.userId}&plan=${userData.planType}&business=${userData.businessName}`,
      },
      auto_return: 'all',
      binary_mode: false,
      expires: true,
      expiration_date_to: new Date(
        Date.now() + 24 * 60 * 60 * 1000,
      ).toISOString(),
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
        default_payment_method_id: null,
        default_installments: null,
      },
      notification_url:
        'https://068b-186-27-244-118.ngrok-free.app/api/mercadopago/webhook',
      statement_descriptor: 'MENUDIGITAL',
      external_reference: `userid-3_${userData.subdomain}`,
      metadata: {
        user_id: userData.userId,
        subdomain: userData.subdomain,
        plan_type: userData.planType,
        business_name: userData.businessName,
        custom_data: userData.customData,
      },
    };

    try {
      const result = await preference.create({ body });
      return {
        ...result,
        client_id: this.configService.get('PUBLIC_KEY'),
      };
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
