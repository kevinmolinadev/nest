import { Body, Controller, Get, Inject, Post, RawBodyRequest, Req, Res, UnauthorizedException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payments.dto';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { Services } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPattern } from 'src/orders/pattern';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(Services.Nats) private readonly client: ClientProxy,
    private readonly paymentsService: PaymentsService,
  ) { }

  @Post()
  createPaymentSession(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPaymentSession(createPaymentDto);
  }

  @Get("success")
  paymentSuccess() {
    return { message: "Payment Success" };
  }

  @Get("cancel")
  paymentCancelled() {
    return { message: "Payment cancelled" };
  }

  @Post("order-payment")
  async orderPayment(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    const signature = req.headers['stripe-signature'];
    if (!signature) throw new UnauthorizedException("You can't process this action")
    try {
      const { metadata: { orderId }, receipt_url } = await firstValueFrom(this.paymentsService.orderPayment(req.rawBody!, signature));
      this.client.emit(OrderPattern.paidSuccess, { id: orderId, receipt: receipt_url });
      res.status(200).json({ statusCode: 200, message: `Order #${orderId} paid successfully` })
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
