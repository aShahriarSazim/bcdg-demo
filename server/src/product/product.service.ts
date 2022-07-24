import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {productDto} from "./dto";
import {ServiceReturnInterface} from "./Interfaces/ServiceReturnInterface";


@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService
    ) {}
    async getAllProducts(){
        const data =  await this.prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const res: ServiceReturnInterface =  {
            success: true,
            data: data
        }
        return res;
    }
    async getAllCategories() {
        const data =  await this.prisma.category.findMany({
            select: {
                id: true,
                name: true,
            }
        });
        const res: ServiceReturnInterface =  {
            success: true,
            data: data
        }
        return res;
    }

    async getProductById(id: number){

        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        if(!product){
            const error: ServiceReturnInterface = {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            };
            return error;
        }
        const res: ServiceReturnInterface = {
            success: true,
            data: product
        }
        return res;
    }
    async createProduct(userId: number, dto: productDto){
        const createdProduct =  await this.prisma.product.create({
            data: {
                userId: userId,
                title: dto.title,
                description: dto.description,
                price: dto.price,
                rent: dto.rent,
                rentPaymentPeriod: dto.rentPaymentPeriod,
                views: 0,
                status: true,
                categories: {
                    create: dto.categories.map(categoryId => {
                        return {
                            category: {
                                connect: {
                                    id: categoryId
                                }
                            }
                        }
                    })
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        if(!createdProduct){
            const error: ServiceReturnInterface =  {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            }
            return error;
        }
        const res: ServiceReturnInterface =  {
            success: true,
            data: createdProduct
        }
        return res;
    }
    async updateProduct(userId: number, id: number, dto: productDto){
        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            }
        });
        if(!product){
            return {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            }
        }
        if(product.userId === userId){
            await this.prisma.categoryProduct.deleteMany({
                where: {
                    productId: product.id
                }
            });
            const updatedProduct =  await this.prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    title: dto.title,
                    description: dto.description,
                    price: dto.price,
                    rent: dto.rent,
                    rentPaymentPeriod: dto.rentPaymentPeriod,
                    categories: {
                        create: dto.categories.map(categoryId => {
                            return {
                                category: {
                                    connect: {
                                        id: categoryId
                                    }
                                }
                            }
                        })
                    }
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        }
                    },
                    categories: {
                        select: {
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            }
                        }
                    },
                    purchaseHistory: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                }
                            },
                        }
                    },
                    rentHistories: {
                        select: {
                            id: true,
                            from: true,
                            to: true,
                            user: {
                                select: {
                                    id: true,
                                    email: true
                                }
                            }
                        }
                    },
                }
            });
            const resp: ServiceReturnInterface = {
                success: true,
                data: updatedProduct
            }
        }else{
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You are not allowed to update this product"
                }
            }
            return error;
        }
    }
    async deleteProduct(userId: number, id: number){
        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            }
        });
        if(!product){
            const error: ServiceReturnInterface = {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            }
            return error;
        }
        if(product.userId !== userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You are not allowed to delete this product"
                }
            }
            return error;
        }
        else{
            const deletedProduct =  await this.prisma.product.delete({
                where: {
                    id: product.id
                }
            });
            const res: ServiceReturnInterface = {
                success: true,
                data: deletedProduct
            }
            return res;
        }
    }
    async incrementProductViews(id: number){

        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            }
        });
        if(!product){
            const error: ServiceReturnInterface = {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            }
            return error;
        }
        const currentViews = product.views;
        const updatedProduct = await this.prisma.product.update({
            where: {
                id: id
            },
            data: {
                views: currentViews + 1
            }
        });
        const res: ServiceReturnInterface = {
            success: true,
            data: updatedProduct
        }
        return res;
    }

    async buyProduct(userId: number, id: number){
        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            },
        });
        if(!product){
            const error: ServiceReturnInterface = {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            }
            return error;
        }
        if(product.userId === userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You can't buy your own product"
                }
            }
            return error;
        }
        else if(product.isSold){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "This product is already sold"
                }
            }
            return error;
        }else{
            await this.prisma.product.update({
                data: {
                    isSold: true
                },
                where: {
                    id: id
                }
            });
            await this.prisma.purchaseHistory.create({
                data: {
                    userId: userId,
                    productId: product.id
                }
            });
            const updatedProduct =  await this.prisma.product.findUnique({
                where: {
                    id: id
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        }
                    },
                    categories: {
                        select: {
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            }
                        }
                    },
                    purchaseHistory: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                }
                            },
                        }
                    },
                    rentHistories: {
                        select: {
                            id: true,
                            from: true,
                            to: true,
                            user: {
                                select: {
                                    id: true,
                                    email: true
                                }
                            }
                        }
                    },
                }
            });
            const res: ServiceReturnInterface = {
                success: true,
                data: updatedProduct
            }
            return res;
        }
    }
    async getRentHistories(id: number){
        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                rentHistories: {
                    select: {
                        from: true,
                        to: true,
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        if(!product){
            const error: ServiceReturnInterface = {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            }
            return error;
        }
        const res: ServiceReturnInterface = {
            success: true,
            data: product.rentHistories
        }
        return res;
    }

    async rentProduct(userId: number, id: number, from: Date, to: Date){

        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            },
            include : {
                rentHistories: {
                    select: {
                        from: true,
                        to: true,
                    }
                },
            }
        });
        if(!product){
            const error: ServiceReturnInterface = {
                error: {
                    type: "NotFound",
                    message: "Product not found"
                }
            }
            return error;
        }
        if(product.userId === userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You can't rent your own product"
                }
            }
            return error;
        }
        else if(product.isSold){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "This product is already sold"
                }
            }
            return error;
        }

        const fromDate = Date.parse(String(new Date(from)));
        const toDate = Date.parse(String(new Date(to)));
        if(fromDate > toDate){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "Invalid dates"
                }
            }
            return error;
        }
        for (let i = 0; i < product.rentHistories.length; i++) {
            const rentHistory = product.rentHistories[i];
            const curFrom = Date.parse(String(rentHistory.from));
            const curTo = Date.parse(String(rentHistory.to));
            if((curFrom <= fromDate && curTo >= toDate) || (curFrom >= fromDate && curFrom <= toDate) || (curTo >= fromDate && curTo <= toDate)|| fromDate === curTo || toDate === curFrom){
                const error: ServiceReturnInterface = {
                    error: {
                        type: "BadRequest",
                        message: "This product is already rented at this interval"
                    }
                }
                return error;
            }
        }
        await this.prisma.rentHistory.create({
            data: {
                from: new Date(from),
                to: new Date(to),
                userId: userId,
                productId: product.id
            }
        });
        const updatedProduct =  await this.prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const res: ServiceReturnInterface = {
            success: true,
            data: updatedProduct
        }
        return res;
    }

    async getAllProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You can't get other user's products"
                }
            }
            return error;
        }
        const data = await this.prisma.product.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                userId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const res: ServiceReturnInterface = {
            success: true,
            data: data
        }
        return res;
    }
    async getSoldProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You can't get other user's sold products"
                }
            }
            return error;
        }

        const data =  await this.prisma.product.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                userId: userId,
                isSold: true,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const res: ServiceReturnInterface = {
            success: true,
            data: data
        }
        return res;
    }
    async getBoughtProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You can't get other user's bought products"
                }
            }
            return error;
        }
        const data = await this.prisma.product.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                purchaseHistory: {
                    userId: userId
                },

            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const res: ServiceReturnInterface = {
            success: true,
            data: data
        }
        return res;
    }
    async getRentedProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You can't get other user's rented products"
                }
            }
            return error;
        }

        const data =  await this.prisma.product.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                rentHistories: {
                    some: {
                        userId: userId
                    }
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const res: ServiceReturnInterface = {
            success: true,
            data: data
        }
        return res;
    }
    async getLentProductsByUserId(currentUserId: number, userId: number){

        if(currentUserId !== userId){
            const error: ServiceReturnInterface = {
                error: {
                    type: "BadRequest",
                    message: "You can't get other user's lent products"
                }
            }
            return error;
        }

        const data = await this.prisma.product.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                userId: userId,
                rentHistories: {
                    some: {}
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                purchaseHistory: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                },
                rentHistories: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        user: {
                            select: {
                                id: true,
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const res: ServiceReturnInterface = {
            success: true,
            data: data
        }
        return res;
    }
}
