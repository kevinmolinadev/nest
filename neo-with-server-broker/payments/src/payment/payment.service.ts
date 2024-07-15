import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';
import { Envs } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { PaidValidationDto } from './dto/paid-validation.dto';

const STRIPE_SECRET = Envs.STRIPE_SECRET;
const STRIPE_SUCCESS_URL = Envs.STRIPE_SUCCESS_URL;
const STRIPE_CANCEL_URL = Envs.STRIPE_CANCEL_URL;
const STRIPE_WEBHOOK_SECRET = Envs.STRIPE_WEBHOOK_SECRET;
@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(STRIPE_SECRET);

  async createSessionPayment(createPaymentDto: CreatePaymentDto) {
    const { idOrder, current, items } = createPaymentDto;
    const lineItems = items.map(item => ({
      price_data: {
        currency: current,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    const sessionPayment = await this.stripe.checkout.sessions.create({
      mode: "payment",
      payment_intent_data: {
        metadata: {
          orderId: idOrder
        }
      },
      line_items: lineItems,
      success_url: STRIPE_SUCCESS_URL,
      cancel_url: STRIPE_CANCEL_URL
    })

    return {
      cancelUrl: sessionPayment.cancel_url,
      returnUrl: sessionPayment.return_url,
      successUrl: sessionPayment.success_url,
      url: sessionPayment.url,
    }
  }

  webhook(paidValidationDto: PaidValidationDto) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(Buffer.from(paidValidationDto.rawBody), paidValidationDto.signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(err)
      throw new RpcException(new UnauthorizedException("You can't process this action"))
    }

    switch (event.type) {
      case "charge.succeeded":
        const chargeSucceeded = event.data.object;
        return chargeSucceeded
      default:
        throw new RpcException(new BadRequestException(`Unhandled event type ${event.type}`));
    }
  }

  paymentSuccess() {
    return { message: "Success" };
  }

  paymentCancel() {
    return { message: "Cancelled" };
  }
}
