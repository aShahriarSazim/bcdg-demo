interface categoryInterface{
    category: {
        id: number;
        name: string;
    }
}
interface rentHistoryInterface{
    id: number;
    from: Date;
    to: Date;
    user: {
        id: number;
        name: string;
    }
}

export default interface ProductInterface{
    id: number;
    title: string;
    description: string;
    price: number;
    rent: number;
    rentPaymentPeriod: number;
    views: 0;
    status: boolean;
    isSold: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        email: string;
    }
    categories: categoryInterface[],
    purchaseHistory ?: {
        id: number;
        user: {
            id: number;
            email: string;
        }
    },
    rentHistories : rentHistoryInterface[]
}

export interface allProductsInterface{
    loading: boolean;
    success: boolean;
    error: any;
    data: ProductInterface[];
}
export interface singleProductInterface{
    loading: boolean;
    success: boolean;
    error: boolean;
    data?: ProductInterface;
}
