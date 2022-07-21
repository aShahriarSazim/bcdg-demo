import {ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

    async getProductById(res, id: number){
        try{
            const product = await this.prisma.product.findUniqueOrThrow({
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
            return res.status(HttpStatus.OK).json(product);
        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product could not be created"
            });
        }
    }
    async createProduct(res, userId: number, dto: productDto){
        try {
            const product =  this.prisma.product.create({
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
            return res.status(HttpStatus.OK).json(product);

        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product could not be created"
            });
        }
    }
    async updateProduct(res, userId: number, id: number, dto: productDto){
        try{
            const product = await this.prisma.product.findUnique({
                where: {
                    id: id
                }
            });
            if(product.userId === userId){
                const deletedCategoryRelations = await this.prisma.categoryProduct.deleteMany({
                    where: {
                        productId: product.id
                    }
                })

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
                return res.status(HttpStatus.OK).json(updatedProduct);

            }else{
                return res.send(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    message: "You are not authorized to update this product"
                });
            }
        }catch(e){
            return res.send(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product not found"
            });
        }
    }
    async deleteProduct(res, userId: number, id: number){
        try{
            const product = await this.prisma.product.findUnique({
                where: {
                    id: id
                }
            });
            if(product.userId !== userId){
                return res.send(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    message: "You are not allowed to delete this product"
                });
            }
            else{
                await this.prisma.categoryProduct.deleteMany({
                    where: {
                        productId: product.id
                    }
                });
                const deletedProduct = await this.prisma.product.delete({
                    where: {
                        id: product.id
                    }
                });
                return res.status(HttpStatus.OK).json(deletedProduct);
            }
        }catch(e){
            return res.send(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product not found"
            });
        }
    }
    async incrementProductViews(res, id: number){
        try {
            const product = await this.prisma.product.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            const currentViews = product.views;
            const updatedProduct = await this.prisma.product.update({
                where: {
                    id: id
                },
                data: {
                    views: currentViews + 1
                }
            });
            return res.status(HttpStatus.OK).json(updatedProduct);
        }catch(e){
            return res.send(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product not found"
            });
        }
    }

    async buyProduct(res, userId: number, id: number){
        try{
            const product = await this.prisma.product.findUniqueOrThrow({
                where: {
                    id: id
                },
            });
            if(product.userId === userId){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    message: "You can't buy your own product"
                });
            }
            else if(product.isSold){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    message: "The product is already sold"
                });
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
                })
                return res.status(HttpStatus.OK).json(updatedProduct);
            }

        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product not found"
            });
        }
    }
    async getRentHistories(res, id: number){
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
            return res.status(HttpStatus.OK).json(product);
        }
        catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product not found"
            });
        }
    }

    async rentProduct(res, userId: number, id: number, from: Date, to: Date){
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
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    message: "You can't rent your own product"
                });
            }
            else if(product.isSold){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    message: "The product is already sold"
                });
            }

            const fromDate = Date.parse(String(new Date(from)));
            const toDate = Date.parse(String(new Date(to)));
            if(fromDate > toDate){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    message: "Invalid dates"
                });
            }
            for (let i = 0; i < product.rentHistories.length; i++) {
                const rentHistory = product.rentHistories[i];
                const curFrom = Date.parse(String(rentHistory.from));
                const curTo = Date.parse(String(rentHistory.to));
                if((curFrom <= fromDate && curTo >= toDate) || (curFrom >= fromDate && curFrom <= toDate) || (curTo >= fromDate && curTo <= toDate)|| fromDate === curTo || toDate === curFrom){
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        status: HttpStatus.BAD_REQUEST,
                        message: "The product is already rented at this interval"
                    });
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
            return res.status(HttpStatus.OK).json(
                updatedProduct
            );
        }
        catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Product not found"
            });
        }
    }

    async getAllProductsByUserId(res, currentUserId: number, userId: number){
        if(currentUserId !== userId){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: "You are not allowed to view this endpoint"
            });
        }
        try{
            const products = await this.prisma.product.findMany({
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
            return res.status(HttpStatus.OK).json(products);
        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Products not found"
            });
        }
    }
    async getSoldProductsByUserId(res, currentUserId: number, userId: number){
        if(currentUserId !== userId){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: "You are not allowed to view this endpoint"
            });
        }
        try{
            const products = await this.prisma.product.findMany({
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
            return res.status(HttpStatus.OK).json(products);
        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Products not found"
            });
        }
    }
    async getBoughtProductsByUserId(res, currentUserId: number, userId: number){
        if(currentUserId !== userId){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: "You are not allowed to view this endpoint"
            });
        }
        try{
            const products = await this.prisma.product.findMany({
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
            return res.status(HttpStatus.OK).json(products);
        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Products not found"
            });
        }
    }
    async getRentedProductsByUserId(res, currentUserId: number, userId: number){
        if(currentUserId !== userId){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: "You are not allowed to view this endpoint"
            });
        }
        try{
            const products = await this.prisma.product.findMany({
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
            return res.status(HttpStatus.OK).json(products);
        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Products not found"
            });
        }
    }
    async getLentProductsByUserId(res, currentUserId: number, userId: number){

        if(currentUserId !== userId){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: "You are not allowed to view this endpoint"
            });
        }
        try{
            const products = await this.prisma.product.findMany({
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
            return res.status(HttpStatus.OK).json(products);
        }catch(e){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: "Products not found"
            });
        }
    }
}
