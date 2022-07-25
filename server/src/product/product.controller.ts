import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import {ProductService} from "./product.service";
import {productDto} from "./dto";
import {AuthGuard} from "@nestjs/passport";
import {ServiceReturnInterface} from "./Interfaces/ServiceReturnInterface";

@Controller('products')
export class ProductController {

    constructor(private ProductService: ProductService) {}

    @Get('/')
    async getAllProducts(){
        const resp: ServiceReturnInterface =  await this.ProductService.getAllProducts();
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }
    @Get('/categories')
    async getAllCategories(){
        const resp: ServiceReturnInterface =  await this.ProductService.getAllCategories();
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }
    @Get('/:id')
    async getProductById(@Param('id', new ParseIntPipe()) id){
        const resp: ServiceReturnInterface = await this.ProductService.getProductById(id);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId')
    async getAllProductsByUserId( @Req() req, @Param('userId', new ParseIntPipe()) userId){
        const resp: ServiceReturnInterface = await this.ProductService.getAllProductsByUserId( req.user.userId, userId);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/sold')
    async getSoldProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        const resp: ServiceReturnInterface = await this.ProductService.getSoldProductsByUserId(req.user.userId, userId);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/bought')
    async getBoughtProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        const resp: ServiceReturnInterface = await this.ProductService.getBoughtProductsByUserId(req.user.userId, userId);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/rented')
    async getRentedProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        const resp: ServiceReturnInterface = await this.ProductService.getRentedProductsByUserId(req.user.userId, userId);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId/lent')
    async getLentProductsByUserId(@Req() req, @Param('userId', new ParseIntPipe()) userId){
        const resp: ServiceReturnInterface = await this.ProductService.getLentProductsByUserId(req.user.userId, userId);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createProduct(@Req() req, @Body() dto: productDto){
        const resp: ServiceReturnInterface = await this.ProductService.createProduct(req.user.userId, dto);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/update/:id')
    async updateProduct(@Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: productDto){
        const resp: ServiceReturnInterface = await this.ProductService.updateProduct(req.user.userId, id, dto);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    async deleteProduct(@Req() req, @Param('id', new ParseIntPipe()) id){
        const resp: ServiceReturnInterface = await this.ProductService.deleteProduct(req.user.userId, id);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @Post('/increment/views/:id')
    async incrementProductViews(@Req() req, @Param('id', new ParseIntPipe()) id){
        const resp: ServiceReturnInterface = await this.ProductService.incrementProductViews(id);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/buy/:id')
    async buyProduct(@Req() req, @Param('id', new ParseIntPipe()) id){
        const resp: ServiceReturnInterface = await this.ProductService.buyProduct(req.user.userId, id);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @Get('/rent-histories/:id')
    async getRentHistories(@Param('id', new ParseIntPipe()) id){
        const resp: ServiceReturnInterface = await this.ProductService.getRentHistories(id);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/rent/:id')
    async rentProduct(@Req() req, @Param('id', new ParseIntPipe()) id, @Body() dto: {from: Date;to: Date}){
        const resp: ServiceReturnInterface = await this.ProductService.rentProduct(req.user.userId, id, dto.from, dto.to);
        if(resp.error && resp.error.type==="BadRequest"){
            throw new BadRequestException(resp.error.message);
        }
        else if(resp.error && resp.error.type === "NotFound"){
            throw new NotFoundException(resp.error.message);
        }
        return resp.data;
    }
}
