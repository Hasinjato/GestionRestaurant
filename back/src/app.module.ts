import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { MenusModule } from './menus/menus.module';
import { Menu } from './menus/entities/menu.entity';
import { MenuProduct } from './menu-products/entities/menu-product.entity';

@Module({
  imports: [
    ProductsModule,
    MenusModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Product,
          Menu,
          MenuProduct
        ],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
