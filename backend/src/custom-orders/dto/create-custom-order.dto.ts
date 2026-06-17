import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCustomOrderDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  budgetCents?: number;

  @IsOptional()
  @IsString()
  fileNote?: string;
}
