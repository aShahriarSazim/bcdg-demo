import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards} from '@nestjs/common';
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
    @Get('/categories')
    async getAllCategories(){
        return this.ProductService.getAllCategories();
    }
    @Get('/:id')
    async getProductById(@Param('id', new ParseIntPipe()) id){
        return this.ProductService.getProductById(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId')
    async getAllProductsByUserId( @Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getAllProductsByUserId( req.user.userId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/sold')
    async getSoldProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getSoldProductsByUserId(req.user.userId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/bought')
    async getBoughtProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getBoughtProductsByUserId(req.user.userId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/rented')
    async getRentedProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getRentedProductsByUserId(req.user.userId, userId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/lent')
    async getLentProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getLentProductsByUserId(req.user.userId, userId);
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


    @Post('/increment/views/:id')
    async incrementProductViews(@Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.incrementProductViews(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/buy/:id')
    async buyProduct(@Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.buyProduct(req.user.userId, id);
    }

    @Get('/rent-histories/:id')
    async getRentHistories(@Param('id', new ParseIntPipe()) id){
        return this.ProductService.getRentHistories(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/rent/:id')
    async rentProduct(@Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: {from: Date;to: Date}){
        return this.ProductService.rentProduct(req.user.userId, id, dto.from, dto.to);
    }
}
