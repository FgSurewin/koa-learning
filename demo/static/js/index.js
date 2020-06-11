// 概述:
// 网页的第一次渲染由模板引擎完成, 之后的每一次渲染通过动态的DOM操作配合Ajax获取数据完成.

$('.list-group').append(create({ id: 8, title: 'hello' }));

// 定义各种API
const API_GET = 'http://localhost:3002/api/getAll';
const API_DELETE = 'http://localhost:3002/api/delete';
const API_ADD = 'http://localhost:3002/api/push';
const API_UPDATE = 'http://localhost:3002/api/update';

// 封装一个获取全部数据的方法
const fetchData = () =>
	new Promise((resolve, reject) => {
		axios
			.get(API_GET)
			.then((res) => resolve(res.data.db))
			.catch((err) => reject(err));
	}).catch((err) => console.log(err));

// 整合create和fetchData这两个方法,形成一个渲染的方法.
const render = async () => {
	const data = await fetchData();
	const node = data.map((item) => create(item));
	// 清空原有的元素
	$('.list-group').empty();
	// 重新加入新的元素
	$('.list-group').append(...node);
};
render();

// 删除数据
// 由于后面加入的元素是动态元素, 无法直接使用click的方法进行获取.
$('body').on('click', '#delete', async function (e) {
	const parentOfTarget = $(e.target).parent();
	// 添加key属性去锁定每一个点击的li
	const order = parentOfTarget.attr('key');
	await axios.delete(API_DELETE + `/${order}`);
	render();
});

// 添加数据
$('#add').click(async (e) => {
	e.preventDefault();
	const value = $('#addText').val();
	await axios.post(API_ADD, {
		title: value,
	});
	render();
	$('#addText').val('');
});

// 更新数据
// 设置该变量锁定待更新的ID
let updateOrder;
$('body').on('click', '#edit', async function (e) {
	const parentOfTarget = $(e.target).parent();
	// 添加key属性去锁定每一个点击的li
	updateOrder = parentOfTarget.attr('key');
});
$('.modal-body button').click(async (e) => {
	e.preventDefault();
	const value = $('#updateText').val();
	await axios.post(API_UPDATE, {
		id: updateOrder,
		title: value,
	});
	render();
	$('#updateText').val('');
	// 用于关闭Modal
	$('#close').click();
});
