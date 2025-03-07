import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Options } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';

@Controller('menus')
export class MenusController {
  constructor(
    private readonly menusService: MenusService
  ) { }

  @Post()
  create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menusService.create(createMenuDto);
  }

  @Post('/acheter/:id')
  acheter(@Param('id') id: string): Promise<any> {
    return this.menusService.acheter(parseInt(id, 10));
  }
  
  @Options('/acheter/:id')
  optionsHandler() {
    return {}
  }

  @Get()
  findAll(): Promise<Menu[]> {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Menu> {
    return this.menusService.findOne(id);
  }

  @Get('count/:a')
  countMenu(): Promise<number> {
    return this.menusService.countMenus();
  }



  // @Get(':id')
  // findProductMenuByMenu(@Param('id') id: number): Promise<Menu> {
  //   return this.menusService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto): Promise<Menu> {
  //   return this.menusService.update(id, updateMenuDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.menusService.remove(id);
  }
}
