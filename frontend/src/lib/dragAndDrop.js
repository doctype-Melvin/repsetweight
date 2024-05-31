// @ts-nocheck

export function draggable(node, data) {
	let state = data;

	node.draggable = true;
	node.style.cursor = 'grab';

	function handleDragStart(event) {
		event.dataTransfer.setData('text/plain', state);
		node.style.opacity = '0.6';
		node.parentNode.classList.add('droppable');
	}

	node.addEventListener('dragstart', handleDragStart);

	console.log(node, state);

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

	function handleDragEnter(event) {
		event.target.classList.add(state.dragoverClass);
	}

	function handleDragLeave(event) {
		event.target.classList.remove(state.dragoverClass);
	}

	node.addEventListener('dragenter', handleDragEnter);
	node.addEventListener('dragleave', handleDragLeave);
}
