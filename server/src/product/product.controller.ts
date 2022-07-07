import {Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {productDto} from "./dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('products')
export class ProductController {

    constructor(private ProductService: ProductService) {}

    @Get('/')
    async getAllProducts(){
        return this.ProductService.getAllProducts();
    }
    @Get('/:id')
    async getProductById(@Param('id', new ParseIntPipe()) id){
        return this.ProductService.getProductById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createProduct(@Req() req, @Body() dto: productDto){
        return this.ProductService.createProduct(req.user.userId, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/update/:id')
    async updateProduct(@Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: productDto){
        return this.ProductService.updateProduct(req.user.userId, id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/delete/:id')
    async deleteProduct(@Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.deleteProduct(req.user.userId, id);
    }
}
