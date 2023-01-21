export const useStats = menu => {
	const arr: number[] = [];
	menu.forEach(m => {
		arr.push(m.pages.length);
	});
	const secondData = arr.reduce((acc, item) => acc + item, 0);

	return { secondData };
};
