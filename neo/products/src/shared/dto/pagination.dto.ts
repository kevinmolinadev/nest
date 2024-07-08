import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";
import { Pagination } from "src/domain/shared/pagination";

export class PaginationDto implements Pagination {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit: number = 10;
}
