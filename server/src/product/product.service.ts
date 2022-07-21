import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {productDto} from "./dto";

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService
    ) {}
    async getAllProducts(){
        return await this.prisma.product.findMany({
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
    }
    async getAllCategories() {
        return await this.prisma.category.findMany({
            select: {
                id: true,
                name: true,
            }
        });
    }

    async getProductById(id: number){
        try{
            return await this.prisma.product.findUniqueOrThrow({
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
        }catch(e){
            if(e.name==="NotFoundError"){
                throw new NotFoundException("Product not found");
            }
        }
    }
    async createProduct(userId: number, dto: productDto){
        try {
            return await  this.prisma.product.create({
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
        }catch(e){
            throw new NotFoundException("Product could not be created");
        }
    }
    async updateProduct(userId: number, id: number, dto: productDto){
        try{
            const product = await this.prisma.product.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if(product.userId === userId){
                await this.prisma.categoryProduct.deleteMany({
                    where: {
                        productId: product.id
                    }
                });
                return  await this.prisma.product.update({
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
            }else{
                throw new BadRequestException("You are not allowed to update this product");
            }
        }catch(e){
            if(e.name === "NotFoundError"){
                throw new NotFoundException("Product not found");
            }
            else throw new BadRequestException(e.message);
        }
    }
    async deleteProduct(userId: number, id: number){
        try{
            const product = await this.prisma.product.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if(product.userId !== userId){
                throw new BadRequestException("You are not allowed to delete this product");
            }
            else{
                return await this.prisma.product.delete({
                    where: {
                        id: product.id
                    }
                });
            }
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }
    async incrementProductViews(id: number){
        try {
            const product = await this.prisma.product.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            const currentViews = product.views;
            return await this.prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    views: currentViews + 1
                }
            });
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }

    async buyProduct(userId: number, id: number){
        try{
            const product = await this.prisma.product.findUniqueOrThrow({
                where: {
                    id: id
                },
            });
            if(product.userId === userId){
                throw new BadRequestException("You can not buy your own product");
            }
            else if(product.isSold){
                throw new BadRequestException("This product is already sold");
            }else{
                await this.prisma.product.update({
                    data: {
                        isSold: true
                    },
                    where: {
                        id: id
                    }
                });
                const newPurchaseHistory = await this.prisma.purchaseHistory.create({
                    data: {
                        userId: userId,
                        productId: product.id
                    }
                });
                return  await this.prisma.product.findUnique({
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
                })
            }

        }catch(e){
            if(e.name==="NotFoundError"){
                throw new NotFoundException("Product not found");
            }
            else throw new BadRequestException(e.message);
        }
    }
    async getRentHistories(id: number){
        try {
            const product = await this.prisma.product.findUniqueOrThrow({
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
            return product.rentHistories;
        }
        catch(e){
            throw new NotFoundException(e.message);
        }
    }

    async rentProduct(userId: number, id: number, from: Date, to: Date){
        try{
            const product = await this.prisma.product.findUniqueOrThrow({
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
            if(product.userId === userId){
                throw new BadRequestException("You can not rent your own product");
            }
            else if(product.isSold){
                throw new BadRequestException("This product is already sold");
            }

            const fromDate = Date.parse(String(new Date(from)));
            const toDate = Date.parse(String(new Date(to)));
            if(fromDate > toDate){
                throw new BadRequestException("Invalid dates");
            }
            for (let i = 0; i < product.rentHistories.length; i++) {
                const rentHistory = product.rentHistories[i];
                const curFrom = Date.parse(String(rentHistory.from));
                const curTo = Date.parse(String(rentHistory.to));
                if((curFrom <= fromDate && curTo >= toDate) || (curFrom >= fromDate && curFrom <= toDate) || (curTo >= fromDate && curTo <= toDate)|| fromDate === curTo || toDate === curFrom){
                    throw new BadRequestException("This product is already rented in this period");
                }
            }
            const newRentHistory = await this.prisma.rentHistory.create({
                data: {
                    from: new Date(from),
                    to: new Date(to),
                    userId: userId,
                    productId: product.id
                }
            });
            return  await this.prisma.product.findUnique({
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
        }
        catch(e){
            if(e.name==="NotFoundError"){
                throw new NotFoundException("Product not found");
            }
            else throw new BadRequestException(e.message);
        }
    }

    async getAllProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
            throw new BadRequestException("You can not see other user's products");
        }
        try{
            return await this.prisma.product.findMany({
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
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }
    async getSoldProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
            throw new BadRequestException("You are not allowed to see other people's sold products");
        }
        try{
            return await this.prisma.product.findMany({
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
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }
    async getBoughtProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
            throw new BadRequestException("You are not allowed to see other people's bought products");
        }
        try{
            return await this.prisma.product.findMany({
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
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }
    async getRentedProductsByUserId(currentUserId: number, userId: number){
        if(currentUserId !== userId){
           throw new BadRequestException("You are not allowed to see other people's rented products");
        }
        try{
            return await this.prisma.product.findMany({
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
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }
    async getLentProductsByUserId(currentUserId: number, userId: number){

        if(currentUserId !== userId){
            throw new BadRequestException("You are not allowed to see other people's lent products");
        }
        try{
            return await this.prisma.product.findMany({
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
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }
}
