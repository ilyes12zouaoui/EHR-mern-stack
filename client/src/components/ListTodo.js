import React from 'react';

const ListTodo = ({todos, deleteTodo}) => {

    return (
        <ul>
            {
                todos && todos.length > 0 ?
                    (
                        todos.map(todo => {
                                return (<li key={todo.patientId} onClick={() => deleteTodo(todo._id)}>{todo.gender}</li>)
                            }
                        )
                    )
                    :
                    (
                        <li>No todo(s) left</li>
                    )
            }
        </ul>
    )
};

export default ListTodo
