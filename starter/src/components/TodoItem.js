import React from 'react';
import { useDispatch } from "react-redux";
import { deleteTodoAsync, toggleCompleteAsync } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {

	const dispatch = useDispatch();

	const handleCompleteClick = () => {
		dispatch(toggleCompleteAsync({ id: id, completed: !completed}))
	};

	const handleDeleteTodo = () => {
		 dispatch(deleteTodoAsync({ id: id }));
	}

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input
						type='checkbox'
						className='mr-3'
						checked={completed}
						onClick={handleCompleteClick}
					></input>
					{title}
				</span>
				<button  className='btn btn-danger' onClick={handleDeleteTodo}>
					Delete
				</button>
			</div>
		</li>
	);
};


export default TodoItem;
