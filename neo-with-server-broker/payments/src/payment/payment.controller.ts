import { Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentPattern } from 'src/config';
import { PaidValidationDto } from './dto/paid-validation.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern(PaymentPattern.create)
  createPaymentSession(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createSessionPayment(createPaymentDto);
  }

  @Get("success")
  paymentSuccess() {
    return this.paymentService.paymentSuccess();
  }

  @Get("cancel")
  paymentCancelled() {
    return this.paymentService.paymentCancel();
  }

  @MessagePattern(PaymentPattern.update)
  webhook(@Payload() paidValidationDto: PaidValidationDto) {
    return this.paymentService.webhook(paidValidationDto);
  }
}
