import { SortEnum } from '../../components/Sort/Sort.props';
import { productModel } from '../../interfaces/product.interface';

export type SortActions =
	| { type: SortEnum.Price }
	| { type: SortEnum.Rating }
	| { type: 'RESET'; payload: productModel[] };

export interface SortReducerState {
	sort: SortEnum;
	products: productModel[];
}

export const sortReducer = (
	state: SortReducerState,
	action: SortActions
): SortReducerState => {
	switch (action.type) {
		case SortEnum.Rating:
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((a, b) =>
					a.initialRating > b.initialRating ? -1 : 1
				),
			};
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
			};
		case 'RESET':
			return {
				...state,
				products: action.payload,
			};
		default:
			throw new Error('Неверный тип сортировки');
	}
};
