import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

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
        success: `https://fulltarjeta.com`,
        failure: `https://fulltarjeta.com`,
        pending: `https://fulltarjeta.com`,
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
      notification_url: `${this.configService.get('BACK_URL')}mercadopago/webhook`,
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

  async paymentStatusByDataId(paymentId: string) {
    console.log(paymentId);
    try {
      if (!paymentId) {
        return {
          message: 'Payment ID is required',
        };
      }
      const accessToken = this.configService.get<string>('ACCESS_TOKEN');
      const client = new MercadoPagoConfig({
        accessToken,
        options: { timeout: 5000 },
      });
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: paymentId });
      console.log('Payment Info:', paymentInfo);
      return paymentInfo;
    } catch (error) {
      console.error('Error fetching payment status:', error);
      throw error;
    }
  }
}
