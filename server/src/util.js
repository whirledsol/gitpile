module.exports = {
	orderBy: (list,itemFunc, desc = false)=>{
		const sortFunc = (a, b) => {
			const aVal = itemFunc(a);
			const bVal = itemFunc(b);
			const pos = (aVal >bVal) ? 1 : -1;
			return desc ? -pos : pos;
		}
		list.sort(sortFunc);
		return list;
	}
}