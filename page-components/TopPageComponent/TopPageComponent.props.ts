import { productModel } from '../../interfaces/product.interface';
import {
	TopLevelCategory,
	TopPageModel,
} from '../../interfaces/toppage.interface';

export interface TopPageComponentProps extends Record<string, unknown> {
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: productModel[];
}
