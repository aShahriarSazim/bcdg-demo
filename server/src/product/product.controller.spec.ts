import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PrismaService } from "../prisma/prisma.service";
import {ConfigService} from "@nestjs/config";
import {ServiceReturnInterface} from "./Interfaces/ServiceReturnInterface";
import {productDto} from "./dto";

describe('ProductController', () => {
    let productController: ProductController;
    let productService: ProductService;
    const mockProduct = {
        id: 1,
        title: "Mock Product",
        description: "Mock Product Description",
        price: 100,
        rent: 10
    };
    const mockCategory = {
        id: 1, name: "Mock Category"
    };
    const mockProductDto: productDto = {
        title: "Mock dto title",
        description: "Mock dto description",
        price: 120,
        rent: 20,
        categories: [1, 2, 3]
    };
    const mockRentHistories = [
        {from: "2020-01-01", to: "2020-01-02"},
        {from: "2020-01-01", to: "2020-01-02"},
        {from: "2020-01-01", to: "2020-01-02"},
    ];
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService, PrismaService, ConfigService],
        }).compile();

        productController = module.get<ProductController>(ProductController);
        productService = module.get<ProductService>(ProductService);
    });
    it('ProductController should be defined', ()=>{
        expect(productController).toBeDefined();
    });
    it('ProductService should be defined', ()=> {
        expect(productService).toBeDefined();
    });
    it('ProductController.getAllProducts should be defined', ()=>{
        expect(productController.getAllProducts).toBeDefined();
    });
    it('ProductController.getAllCategories should be defined', ()=>{
        expect(productController.getAllCategories).toBeDefined();
    });
    it('ProductController.getProductById should be defined', ()=>{
        expect(productController.getProductById).toBeDefined();
    });
    it('ProductController.getAllProductsByUserId should be defined', ()=>{
        expect(productController.getAllProductsByUserId).toBeDefined();
    });
    it('ProductController.getSoldProductsByUserId should be defined', ()=>{
        expect(productController.getSoldProductsByUserId).toBeDefined();
    });
    it('ProductController.getBoughtProductsByUserId should be defined', ()=>{
        expect(productController.getBoughtProductsByUserId).toBeDefined();
    });
    it('ProductController.getRentedProductsByUserId should be defined', ()=>{
        expect(productController.getRentedProductsByUserId).toBeDefined();
    });
    it('ProductController.getLentProductsByUserId should be defined', ()=>{
        expect(productController.getLentProductsByUserId).toBeDefined();
    });
    it('ProductController.createProduct should be defined', ()=>{
        expect(productController.createProduct).toBeDefined();
    });
    it('ProductController.updateProduct should be defined', ()=>{
        expect(productController.updateProduct).toBeDefined();
    });
    it('ProductController.deleteProduct should be defined', ()=>{
        expect(productController.deleteProduct).toBeDefined();
    });
    it('ProductController.incrementProductViews should be defined', ()=>{
        expect(productController.incrementProductViews).toBeDefined();
    });
    it('ProductController.buyProduct should be defined', ()=>{
        expect(productController.buyProduct).toBeDefined();
    });
    it('ProductController.getRentHistories should be defined', ()=>{
        expect(productController.getRentHistories).toBeDefined();
    });
    it('ProductController.rentProduct should be defined', ()=>{
        expect(productController.rentProduct).toBeDefined();
    });

    it('getAllProducts (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "bad request message"
            }
        };
        jest.spyOn(productService, 'getAllProducts').mockImplementation(async ()=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getAllProducts();
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getAllProducts (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Products not found"
            }
        };
        jest.spyOn(productService, 'getAllProducts').mockImplementation(async ()=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getAllProducts();
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getAllProducts (should return an array of products)', async ()=>{
        const products: ServiceReturnInterface = {
            data: [
                mockProduct, mockProduct, mockProduct
            ]
        };
        jest.spyOn(productService, 'getAllProducts').mockImplementation(async ()=>{
            return products;
        });
        try{
            const resp = await productController.getAllProducts();
            expect(resp).toBe(products.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('getAllCategories (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "bad request message"
            }
        };
        jest.spyOn(productService, 'getAllCategories').mockImplementation(async ()=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getAllCategories();
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getAllCategories (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Categories not found"
            }
        };
        jest.spyOn(productService, 'getAllCategories').mockImplementation(async ()=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getAllCategories();
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getAllCategories (should return an array of categories)', async ()=>{
        const categories: ServiceReturnInterface = {
            data: [
                mockCategory, mockCategory, mockCategory
            ]
        };
        jest.spyOn(productService, 'getAllCategories').mockImplementation(async ()=>{
            return categories;
        });
        try{
            const resp = await productController.getAllCategories();
            expect(resp).toBe(categories.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('getProductById (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "bad request message"
            }
        };
        jest.spyOn(productService, 'getProductById').mockImplementation(async (id: number)=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getProductById(1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getProductById (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Product not found"
            }
        };
        jest.spyOn(productService, 'getProductById').mockImplementation(async (id: number)=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getProductById(1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getProductById (should return an individual product)', async ()=>{
        const product: ServiceReturnInterface = {
            data: mockProduct
        };
        jest.spyOn(productService, 'getProductById').mockImplementation(async (id: number)=>{
            return product;
        });
        try{
            const resp = await productController.getProductById(1);
            expect(resp).toBe(product.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('getAllProductsByUserId (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "You can't get product list of another user"
            }
        };
        jest.spyOn(productService, 'getAllProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getAllProductsByUserId({user: {userId: 1}}, 2);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getAllProductsByUserId (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: 'NotFound',
                message: 'Products not found'
            }
        };
        jest.spyOn(productService, 'getAllProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getAllProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getAllProductsByUserId (should return an array of products)', async ()=>{
        const allProductsByUserId: ServiceReturnInterface = {
            data: [mockProduct, mockProduct, mockProduct]
        };
        jest.spyOn(productService, 'getAllProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return allProductsByUserId;
        });
        try{
            const resp = await productController.getAllProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(allProductsByUserId.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });


    it('getSoldProductsByUserId (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "You can't get the sold product list of another user"
            }
        };
        jest.spyOn(productService, 'getSoldProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getSoldProductsByUserId({user: {userId: 1}}, 2);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getSoldProductsByUserId (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: 'NotFound',
                message: 'Products not found'
            }
        };
        jest.spyOn(productService, 'getSoldProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getSoldProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getSoldProductsByUserId (should return an array of products)', async ()=>{
        const allProductsByUserId: ServiceReturnInterface = {
            data: [mockProduct, mockProduct, mockProduct]
        };
        jest.spyOn(productService, 'getSoldProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return allProductsByUserId;
        });
        try{
            const resp = await productController.getSoldProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(allProductsByUserId.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });


    it('getBoughtProductsByUserId (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "You can't get the bought product list of another user"
            }
        };
        jest.spyOn(productService, 'getBoughtProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getBoughtProductsByUserId({user: {userId: 1}}, 2);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getBoughtProductsByUserId (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: 'NotFound',
                message: 'Products not found'
            }
        };
        jest.spyOn(productService, 'getBoughtProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getBoughtProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getBoughtProductsByUserId (should return an array of products)', async ()=>{
        const allProductsByUserId: ServiceReturnInterface = {
            data: [mockProduct, mockProduct, mockProduct]
        };
        jest.spyOn(productService, 'getBoughtProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return allProductsByUserId;
        });
        try{
            const resp = await productController.getBoughtProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(allProductsByUserId.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });


    it('getRentedProductsByUserId (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "You can't get the rented product list of another user"
            }
        };
        jest.spyOn(productService, 'getRentedProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getRentedProductsByUserId({user: {userId: 1}}, 2);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getRentedProductsByUserId (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: 'NotFound',
                message: 'Products not found'
            }
        };
        jest.spyOn(productService, 'getRentedProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getRentedProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getRentedProductsByUserId (should return an array of products)', async ()=>{
        const allProductsByUserId: ServiceReturnInterface = {
            data: [mockProduct, mockProduct, mockProduct]
        };
        jest.spyOn(productService, 'getRentedProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return allProductsByUserId;
        });
        try{
            const resp = await productController.getRentedProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(allProductsByUserId.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });


    it('getLentProductsByUserId (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "You can't get the rented product list of another user"
            }
        };
        jest.spyOn(productService, 'getLentProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getLentProductsByUserId({user: {userId: 1}}, 2);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getLentProductsByUserId (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: 'NotFound',
                message: 'Products not found'
            }
        };
        jest.spyOn(productService, 'getLentProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getLentProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getLentProductsByUserId (should return an array of products)', async ()=>{
        const allProductsByUserId: ServiceReturnInterface = {
            data: [mockProduct, mockProduct, mockProduct]
        };
        jest.spyOn(productService, 'getLentProductsByUserId').mockImplementation(async (currentUserId: number, userId: number)=>{
            return allProductsByUserId;
        });
        try{
            const resp = await productController.getLentProductsByUserId({user: {userId: 1}}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(allProductsByUserId.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });


    it('createProduct (should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequest: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "Product shouldn't be created"
            }
        }
        jest.spyOn(productService, 'createProduct').mockImplementation(async (userId: number, dto: productDto)=> {
            return badRequest;
        });
        try{
            const resp = await productController.createProduct({user: {userId: 1}}, mockProductDto);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.response.message).toBe(badRequest.error.message);
        }
    });
    it('createProduct (should throw a NotFoundException when service returns an error of type NotFound)', async()=> {
        const notFound: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Product Not Found"
            }
        }
        jest.spyOn(productService, 'createProduct').mockImplementation(async (userId: number, dto: productDto)=> {
            return notFound;
        });
        try{
            const resp = await productController.createProduct({user: {userId: 1}}, mockProductDto);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFound.error.message);
        }
    });
    it('createProduct (should return a newly created product)', async()=> {
        const newProduct: ServiceReturnInterface = {
            data: mockProduct
        };
        jest.spyOn(productService, 'createProduct').mockImplementation(async (userId: number, dto: productDto)=> {
            return newProduct;
        });
        try{
            const resp = await productController.createProduct({user: {userId: 1}}, mockProductDto);
            expect(resp).toBeDefined();
            expect(resp).toBe(newProduct.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });


    it('updateProduct (should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequest: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "Product shouldn't be updated"
            }
        }
        jest.spyOn(productService, 'updateProduct').mockImplementation(async (userId: number, id: number,  dto: productDto)=> {
            return badRequest;
        });
        try{
            const resp = await productController.updateProduct({user: {userId: 1}}, 1,  mockProductDto);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.response.message).toBe(badRequest.error.message);
        }
    });
    it('updateProduct (should throw a NotFoundException when service returns an error of type NotFound)', async()=> {
        const notFound: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Product shouldn't be updated"
            }
        }
        jest.spyOn(productService, 'updateProduct').mockImplementation(async (userId: number, id: number,  dto: productDto)=> {
            return notFound;
        });
        try{
            const resp = await productController.updateProduct({user: {userId: 1}}, 1,  mockProductDto);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFound.error.message);
        }
    });
    it('updateProduct (should return an updated product)', async()=> {
        const updatedProduct: ServiceReturnInterface = {
            data: mockProduct
        }
        jest.spyOn(productService, 'updateProduct').mockImplementation(async (userId: number, id: number,  dto: productDto)=> {
            return updatedProduct;
        });
        try{
            const resp = await productController.updateProduct({user: {userId: 1}}, 1,  mockProductDto);
            expect(resp).toBeDefined();
            expect(resp).toBe(updatedProduct.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });


    it('deleteProduct (should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequest: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "Product shouldn't be deleted"
            }
        }
        jest.spyOn(productService, 'deleteProduct').mockImplementation(async (userId: number, id: number)=> {
            return badRequest;
        });
        try{
            const resp = await productController.deleteProduct({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.response.message).toBe(badRequest.error.message);
        }
    });
    it('deleteProduct (should throw a NotFoundException when service returns an error of type NotFound)', async()=> {
        const notFound: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Product shouldn't be deleted"
            }
        }
        jest.spyOn(productService, 'deleteProduct').mockImplementation(async (userId: number, id: number)=> {
            return notFound;
        });
        try{
            const resp = await productController.deleteProduct({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFound.error.message);
        }
    });
    it('deleteProduct (should return a deleted product)', async()=> {
        const deletedProduct: ServiceReturnInterface = {
            data: mockProduct
        }
        jest.spyOn(productService, 'deleteProduct').mockImplementation(async (userId: number, id: number)=> {
            return deletedProduct;
        });
        try{
            const resp = await productController.deleteProduct({user: {userId: 1}}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(deletedProduct.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('incrementProductViews (should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequest: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "Product shouldn't be deleted"
            }
        }
        jest.spyOn(productService, 'incrementProductViews').mockImplementation(async ( id: number)=> {
            return badRequest;
        });
        try{
            const resp = await productController.incrementProductViews({}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.response.message).toBe(badRequest.error.message);
        }
    });
    it('incrementProductViews (should throw a NotFoundException when service returns an error of type NotFound)', async()=> {
        const notFound: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Product shouldn't be deleted"
            }
        }
        jest.spyOn(productService, 'incrementProductViews').mockImplementation(async (id: number)=> {
            return notFound;
        });
         try{
            const resp = await productController.incrementProductViews({}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFound.error.message);
        }
    });
    it('incrementProductViews (should return an updated product with incremented views)', async()=> {
        const updatedProduct: ServiceReturnInterface = {
            data: mockProduct
        }
        jest.spyOn(productService, 'incrementProductViews').mockImplementation(async (id: number)=> {
            return updatedProduct;
        });
        try{
            const resp = await productController.incrementProductViews({}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(updatedProduct.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('buyProduct (should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequest: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "Product shouldn't be bought"
            }
        }
        jest.spyOn(productService, 'buyProduct').mockImplementation(async (userId: number, id: number)=> {
            return badRequest;
        });
        try{
            const resp = await productController.buyProduct({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.response.message).toBe(badRequest.error.message);
        }
    });
    it('buyProduct (should throw a NotFoundException when service returns an error of type NotFound)', async()=> {
        const notFound: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Product not found"
            }
        }
        jest.spyOn(productService, 'buyProduct').mockImplementation(async (userId: number, id: number)=> {
            return notFound;
        });
        try{
            const resp = await productController.buyProduct({user: {userId: 1}}, 1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFound.error.message);
        }
    });
    it('buyProduct (should return an bought product)', async()=> {
        const boughtProduct: ServiceReturnInterface = {
            data: mockProduct
        }
        jest.spyOn(productService, 'buyProduct').mockImplementation(async (userId: number, id: number)=> {
            return boughtProduct;
        });
        try{
            const resp = await productController.buyProduct({user: {userId: 1}}, 1);
            expect(resp).toBeDefined();
            expect(resp).toBe(boughtProduct.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('getRentHistories (Should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequestError: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "bad request message"
            }
        };
        jest.spyOn(productService, 'getRentHistories').mockImplementation(async (id: number)=>{
            return badRequestError;
        });
        try{
            const resp = await productController.getRentHistories(1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.message).toBe(badRequestError.error.message);
        }
    });
    it('getRentHistories (Should throw a NotFoundException when service returns an error of type NotFound)', async ()=>{
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Products not found"
            }
        };
        jest.spyOn(productService, 'getRentHistories').mockImplementation(async (id: number)=>{
            return notFoundError;
        });
        try{
            const resp = await productController.getRentHistories(1);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getRentHistories (should return an array of rent histories of a product)', async ()=>{
        const products: ServiceReturnInterface = {
            data: mockRentHistories
        };
        jest.spyOn(productService, 'getRentHistories').mockImplementation(async (id: number)=>{
            return products;
        });
        try{
            const resp = await productController.getRentHistories(1);
            expect(resp).toBe(products.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('rentProduct (should throw a BadRequestException when service returns an error of type BadRequest)', async()=> {
        const badRequest: ServiceReturnInterface = {
            error: {
                type: "BadRequest",
                message: "Product shouldn't be bought"
            }
        }
        jest.spyOn(productService, 'rentProduct').mockImplementation(async (userId: number, id: number, dto)=> {
            return badRequest;
        });
        try{
            const resp = await productController.rentProduct({user: {userId: 1}}, 1, {from: new Date(), to: new Date()});
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(400);
            expect(e.response.message).toBe(badRequest.error.message);
        }
    });
    it('rentProduct (should throw a NotFoundException when service returns an error of type NotFound)', async()=> {
        const notFound: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "Product not found"
            }
        }
        jest.spyOn(productService, 'rentProduct').mockImplementation(async (userId: number, id: number, dto)=> {
            return notFound;
        });
        try{
            const resp = await productController.rentProduct({user: {userId: 1}}, 1, {from: new Date(), to: new Date()});
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFound.error.message);
        }
    });
    it('rentProduct (should return a bought product)', async()=> {
        const rentedProduct: ServiceReturnInterface = {
            data: mockProduct
        }
        jest.spyOn(productService, 'rentProduct').mockImplementation(async (userId: number, id: number, dto)=> {
            return rentedProduct;
        });
        try{
            const resp = await productController.rentProduct({user: {userId: 1}}, 1, {from: new Date(), to: new Date()});
            expect(resp).toBeDefined();
            expect(resp).toBe(rentedProduct.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });
});
