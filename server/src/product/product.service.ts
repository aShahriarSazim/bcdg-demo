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
            console.log(e);
            throw new ForbiddenException('Product not found');
        }
    }
}
