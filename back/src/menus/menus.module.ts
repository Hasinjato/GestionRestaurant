import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { MenuProduct } from 'src/menu-products/entities/menu-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Product, MenuProduct])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule { }
