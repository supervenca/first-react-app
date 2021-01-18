import React, {Component} from 'react';

import './post-list-item.css';

export default class PostListItem extends Component {


    render() {
        const {label, onDelete,onToggleImportant, onToggleLiked,important,like} = this.props;
        let classNames = 'app-list-item d-flex justify-content-between';
        if (important) {
            classNames += ' important';
        }
        if (like) {
            classNames += ' like';
        }

        return (
            <div className={classNames}>
            <span className="app-list-item-label"
                //обработчик события: при клике вызывается метод, меняющий состояние like
                  onClick={onToggleLiked}>
                {label}
            </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn-star btn-sm"
                        //обработчик события: при клике вызывается метод, меняющий состояние important
                        onClick={onToggleImportant}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button
                        type="button"
                        className="btn-trash btn-sm"
                        //обработчик события передается в функцию deleteItem
                        onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
    }
}
