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
    @Get('/categories')
    async getAllCategories(){
        return this.ProductService.getAllCategories();
    }
    @Get('/:id')
    async getProductById(@Res() res, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.getProductById(res, id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId')
    async getAllProductsByUserId(@Res() res, @Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getAllProductsByUserId(res, req.user.userId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/sold')
    async getSoldProductsByUserId(@Res() res, @Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getSoldProductsByUserId(res, req.user.userId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/bought')
    async getBoughtProductsByUserId(@Res() res, @Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getBoughtProductsByUserId(res, req.user.userId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/rented')
    async getRentedProductsByUserId(@Res() res, @Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getRentedProductsByUserId(res, req.user.userId, userId);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/lent')
    async getLentProductsByUserId(@Res() res, @Req() req, @Param('userId', new ParseIntPipe()) userId){
        return this.ProductService.getLentProductsByUserId(res, req.user.userId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createProduct(@Res() res, @Req() req, @Body() dto: productDto){
        return this.ProductService.createProduct(res, req.user.userId, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/update/:id')
    async updateProduct(@Res() res, @Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: productDto){
        return this.ProductService.updateProduct(res, req.user.userId, id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    async deleteProduct(@Res() res, @Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.deleteProduct(res, req.user.userId, id);
    }

    // additional functionalities


    @Post('/increment/views/:id')
    async incrementProductViews(@Res() res, @Req() req, @Param('id', new ParseIntPipe()) id){
        return this.ProductService.incrementProductViews(res, id);
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
    async rentProduct(@Res() res, @Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: {from: Date;to: Date}){
        return this.ProductService.rentProduct(res, req.user.userId, id, dto.from, dto.to);
    }
}
