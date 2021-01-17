import React, {Component} from 'react';

import './post-list-item.css';

export default class PostListItem extends Component {
    constructor(props) {
        super(props);
        this.state ={
            important: false,
            like: false
        };
        this.onImportant = this.onImportant.bind(this);
        this.onLike = this.onLike.bind(this);
    }

//метод, изменяющий состояние (state) нашего поста (star/unstar)
    onImportant() {
        this.setState(({important}) => ({
            important: !important
        }))
    }
//метод, изменяющий state (like/dislike)
    onLike() {
        this.setState(({like}) => ({
            like: !like
        }))
    }

    render() {
        const {label, onDelete} = this.props;
        const {important, like} = this.state; //к переменной привязано изменяющееся состояние
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
                  onClick={this.onLike}>
                {label}
            </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn-star btn-sm"
                        //обработчик события: при клике вызывается метод, меняющий состояние important
                        onClick={this.onImportant}>
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
