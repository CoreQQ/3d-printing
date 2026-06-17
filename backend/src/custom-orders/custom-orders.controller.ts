import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CustomOrdersService } from './custom-orders.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('custom-orders')
export class CustomOrdersController {
  constructor(private customOrdersService: CustomOrdersService) {}

  @Post()
  create(@Body() dto: CreateCustomOrderDto) {
    return this.customOrdersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.customOrdersService.findAll();
  }
}
