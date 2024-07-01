// @ts-nocheck

export function draggable(node, data) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handleDragStart(event) {
		event.dataTransfer.setData('text/plain', JSON.stringify(state));
	}

	node.addEventListener('dragstart', handleDragStart);

	return {
		update(data) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', handleDragStart);
		}
	};
}

export function dropzone(node, options) {
	let state = {
		dropEffect: 'move',
		dragoverClass: 'droppable',
		...options
	};

	function handleDragover(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = state.dropEffect;
	}

	function handleDrop(event) {
		const data = JSON.parse(event.dataTransfer.getData('text/plain'));
		const target = event.target.closest('li');

		if (target) {
			state.onDropzone(data.index, Number(target.dataset.index));
		}
	}

	node.addEventListener('dragover', handleDragover);
	node.addEventListener('drop', handleDrop);

	return {
		update(options) {
			state = {
				...state,
				...options
			};
		},
		destroy() {
			node.removeEventListener('dragover', handleDragover);
			node.removeEventListener('drop', handleDrop);
		}
	};
}
