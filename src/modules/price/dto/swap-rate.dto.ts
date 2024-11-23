import { IsNumber } from 'class-validator';

export class SwapRateDto {
    @IsNumber()
    ethAmount: number;
}
