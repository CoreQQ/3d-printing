import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ProductCategory } from '../../../generated/prisma/client';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsInt()
  @IsPositive()
  priceCents: number;

  @IsString()
  material: string;

  @Min(0.1)
  printTimeHours: number;

  @IsOptional()
  @IsString()
  imageEmoji?: string;

  @IsOptional()
  @IsString()
  accentColor?: string;

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
