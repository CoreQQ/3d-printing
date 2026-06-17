import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';

@Injectable()
export class CustomOrdersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCustomOrderDto) {
    return this.prisma.customOrderRequest.create({ data: dto });
  }

  findAll() {
    return this.prisma.customOrderRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
