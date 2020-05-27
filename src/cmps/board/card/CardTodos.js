import React, { Component } from 'react';

import DeleteTodoIcon from '@material-ui/icons/DeleteOutlineOutlined';

import CardService from '../../../services/CardService';

export default class CardTodos extends Component {

    state = {
        currTodoId: '',
        toggleDeleteIcon: false
    }

    showDeleteTodoButton = (id) => {
        this.setState({ currTodoId: id, toggleDeleteIcon: true });
    }

    hideDeleteTodoButton = (id) => {
        this.setState({ currTodoId: id, toggleDeleteIcon: false });
    }

    deleteTodo = (ev, id) => {
        ev.stopPropagation();
        CardService.cardTodoHandler(this.props, id, 'delete');
        this.hideDeleteTodoButton(id);
    }

    setTodoStatus = (id) => {
        CardService.cardTodoHandler(this.props, id, 'updateTodoStatus');
    }

    progressBarHandler = (progressBarProgress) => {
        const { direction } = this.props;
        return progressBarProgress === 100 ?
            { width: progressBarProgress + '%', borderRadius: 8 + 'px' } :
            { width: progressBarProgress + '%', 'borderRadius': direction === 'ltr' ? '8px 0px 0px 8px' : '0px 8px 8px 0px' };
    }

    render() {
        const { doneTodos, todos } = this.props;
        const { currTodoId, toggleDeleteIcon } = this.state;
        const progressBarProgress = Math.round((doneTodos / todos.length) * 100);
        const progressBarStyle = this.progressBarHandler(progressBarProgress);

        return (
            <div className="flex align-center column card-todos-container" >
                <div className="flex column center align-center todos-progress-bar-container">
                    <div className="flex todos-progress-bar-progress" style={progressBarStyle}>
                    </div>
                    <div className="flex todos-progress-bar-text">{progressBarProgress}%</div>
                </div>
                {todos.map(todo => {
                    return (
                        <div key={todo.id} className={`flex pointer card-todo-item ${todo.isDone ? 'done' : ''}`}
                            onMouseEnter={() => this.showDeleteTodoButton(todo.id)}
                            onMouseLeave={() => this.hideDeleteTodoButton(todo.id)}
                            onClick={() => this.setTodoStatus(todo.id)}>
                            {todo.text}
                            {toggleDeleteIcon && currTodoId === todo.id &&
                                <DeleteTodoIcon
                                    className="delete-todo-icon"
                                    onClick={(ev) => this.deleteTodo(ev, todo.id)}
                                />}
                        </div>
                    )
                })}
            </div>
        )
    }
}