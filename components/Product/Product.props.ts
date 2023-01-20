import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { productModel } from '../../interfaces/product.interface';

export interface ProductProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	product: productModel;
}
