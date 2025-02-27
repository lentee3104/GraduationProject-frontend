
import type { IBusiness } from "./IBusiness";

export  interface ICartItem {
    foodExplain: string;
    foodId: number;
    foodImg: string;
    foodName: string;
    foodPrice: number;
    remarks: string;
    businessEntity: Array<IBusiness>,
}