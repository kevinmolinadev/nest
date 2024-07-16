import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    private readonly saltRounds = 10;

    generateHash(data: string | Buffer): Promise<string> {
        return bcrypt.genSalt(this.saltRounds).then(salt => bcrypt.hash(data, salt));
    }

    compareHash(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }
}
