import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";


export class categoryDto{
    @IsNumber()
    id: number;
}

export class productDto {
    @IsNumber()
    id?: number;

    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsNumber()
    price?: number;

    @IsNumber()
    rent?: number;

    @IsString()
    rentPaymentPeriod?: string;

    @IsNumber()
    views?: number;

    @IsBoolean()
    status?: boolean;

    categories: number[];
}
