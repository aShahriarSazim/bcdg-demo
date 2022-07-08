import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res, UseGuards} from '@nestjs/common';
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
    @Delete('/delete/:id')
    async deleteProduct(@Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.deleteProduct(req.user.userId, id);
    }

    // additional functionalities
    @Get('/categories')
    async getAllCategories(){
        return this.ProductService.getAllCategories();
    }

    @Post('/increment/views/:id')
    async incrementProductViews(@Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.incrementProductViews(req.user.userId, id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/buy/:id')
    async buyProduct(@Res() res, @Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.buyProduct(res, req.user.userId, id);
    }

    @Get('/rent-histories/:id')
    async getRentHistories(@Res() res, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.getRentHistories(res, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/rent/:id')
    async rentProduct(@Res() res, @Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: {from: string;to: string}){
        return this.ProductService.rentProduct(res, req.user.userId, id, dto.from, dto.to);
    }
}
