export  interface IBusiness {
    businessId: number;
    businessName: string;
    businessAddress: string;
    businessExplain: string;
    businessImg: string;
    orderTypeId: number | null;
    starPrice: number;
    deliveryPrice: number;
    remarks: string | null;
}