import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Envs, Services } from 'src/config';

const REGISTER = ClientsModule.register([
    {
        name: Services.Nats,
        transport: Transport.NATS,
        options: {
            servers: Envs.NATS_SERVERS,
        },
    },
])

@Module({
    imports: [REGISTER],
    exports: [REGISTER]
})
export class NatsModule { }
