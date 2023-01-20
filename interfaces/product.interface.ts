export interface ProductCharacteristic {
	value: string;
	name: string;
}

export interface ReviewModel {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: string;
	createdAt: Date;
}
export interface productModel {
	_id: string;
	categories: string[];
	tags: string[];
	title: string;
	link: string;
	price: number;
	credit: number;
	oldPrice: number;
	description: string;
	characteristics: ProductCharacteristic[];
	createAt: Date;
	updatedAt: Date;
	__v: number;
	image: string;
	initialRating: number;
	reviews: ReviewModel[];
	reviewCount: number;
	reviewAvg?: number;
	advantages?: string;
	disadvantages?: string;
}
