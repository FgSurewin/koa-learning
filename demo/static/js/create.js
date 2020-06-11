// 封装一个方法实现创建HTML组件
const create = (item) => {
	if (item.id % 2 === 0) {
		return `
        <li key="${item.id}" class="list-group-item list-group-item-action d-flex">
        <div class="font-weight-bold align-self-center mr-auto">
            ${item.title}
        </div>
        <!-- Button to Open the Modal -->
        <button
            type="button"
            id="edit"
            class="btn bg-secondary text-white mr-2"
            data-toggle="modal"
            data-target="#myModal"
        >
            Edit
        </button>
        <button id="delete" class="btn bg-danger text-white">
                &times;
            </button>
        </li>
        `;
	} else {
		return `
        <li key="${item.id}" class="list-group-item list-group-item-action d-flex bg-dark text-white">
        <div class="font-weight-bold align-self-center mr-auto">
            ${item.title}
        </div>
        <!-- Button to Open the Modal -->
        <button
            type="button"
            id="edit"
            class="btn bg-secondary text-white mr-2"
            data-toggle="modal"
            data-target="#myModal"
        >
            Edit
        </button>
        <button id="delete" class="btn bg-danger text-white">
                &times;
            </button>
        </li>
        `;
	}
};
