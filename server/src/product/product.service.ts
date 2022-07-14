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

    async getProductById(id: number){
        try{
            return await this.prisma.product.findUnique({
                rejectOnNotFound: true,
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
            throw new ForbiddenException("Product not found");
        }
    }
    async createProduct(userId: number, dto: productDto){
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

            return product;

        }catch(e){
            throw new ForbiddenException("Failed to create a product");
        }
    }
    async updateProduct(userId: number, id: number, dto: productDto){
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

                return await this.prisma.product.update({
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
                throw new ForbiddenException('You are not allowed to update this product');
            }
        }catch(e){
            throw new ForbiddenException("Product Not found");
        }
    }
    async deleteProduct(userId: number, id: number){
        try{
            const product = await this.prisma.product.findUnique({
                where: {
                    id: id
                }
            });
            if(product.userId !== userId){
                throw new ForbiddenException('You are not allowed to delete this product');
            }
            else{
                await this.prisma.categoryProduct.deleteMany({
                    where: {
                        productId: product.id
                    }
                });
                return await this.prisma.product.delete({
                    where: {
                        id: product.id
                    }
                });
            }
        }catch(e){
            throw new ForbiddenException('Product not found');
        }
    }

    async incrementProductViews(userId: number, id: number){
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
            throw new ForbiddenException("Product not found");
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
                return res.status(HttpStatus.FORBIDDEN).json({
                    status: HttpStatus.FORBIDDEN,
                    error: "You can't buy your own product"
                });
            }
            // @ts-ignore
            else if(product.isSold === true){
                return res.status(HttpStatus.FORBIDDEN).json({
                    status: HttpStatus.FORBIDDEN,
                    error: "The product is already sold"
                });
            }else{
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
                return res.status(HttpStatus.OK).json(
                    updatedProduct
                );
            }

        }catch(e){
            return res.status(HttpStatus.FORBIDDEN).json({
                status: HttpStatus.FORBIDDEN,
                error: "Product not found"
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
            return res.status(HttpStatus.OK).json(product.rentHistories);
        }
        catch(e){
            return res.status(HttpStatus.FORBIDDEN).json({
                status: HttpStatus.FORBIDDEN,
                error: "Product not found"
            });
        }
    }

    async rentProduct(res, userId: number, id: number, from: string, to: string){
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
                return res.status(HttpStatus.FORBIDDEN).json({
                    status: HttpStatus.FORBIDDEN,
                    error: "You can't rent your own product"
                });
            }
            // @ts-ignore
            else if(product.isSold === true){
                return res.status(HttpStatus.FORBIDDEN).json({
                    status: HttpStatus.FORBIDDEN,
                    error: "The product is already sold"
                });
            }

            const fromDate = Date.parse(String(new Date(from)));
            const toDate = Date.parse(String(new Date(to)));
            if(fromDate > toDate){
                return res.status(HttpStatus.FORBIDDEN).json({
                    status: HttpStatus.FORBIDDEN,
                    error: "Invalid dates"
                });
            }
            for (let i = 0; i < product.rentHistories.length; i++) {
                const rentHistory = product.rentHistories[i];
                const curFrom = Date.parse(String(rentHistory.from));
                const curTo = Date.parse(String(rentHistory.to));
                if((curFrom <= fromDate && curTo >= toDate) || (curFrom >= fromDate && curFrom <= toDate) || (curTo >= fromDate && curTo <= toDate)|| fromDate === curTo || toDate === curFrom){
                    return res.status(HttpStatus.FORBIDDEN).json({
                        status: HttpStatus.FORBIDDEN,
                        error: "The product is already rented at this interval"
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
            return res.status(HttpStatus.FORBIDDEN).json({
                status: HttpStatus.FORBIDDEN,
                error: "Product not found"
            });
        }
    }
}
