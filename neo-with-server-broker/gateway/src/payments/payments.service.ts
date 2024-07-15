import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Services } from 'src/config';
import { CreatePaymentDto } from './dto/create-payments.dto';
import { PaymentPattern } from './pattern';

@Injectable()
export class PaymentsService {
    constructor(@Inject(Services.Nats) private readonly client: ClientProxy) { }

    createPaymentSession(createPaymentDto: CreatePaymentDto) {
        return this.client.send(PaymentPattern.create, createPaymentDto)
    }

    orderPayment(rawBody: Buffer, signature: string | string[]) {
        return this.client.send(PaymentPattern.update, { signature, rawBody });
    }

}
