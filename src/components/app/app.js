import React, {Component} from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css';

export default class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            //эмуляция данных, принятых с сервера:
            data: [
                {label: 'Going to learn React', important: true, id: 1},
                {label: 'That is so good', important: false, id: 2},
                {label: 'I need a break...', important: false, id: 3}
            ]
        };

        //чтобы функции(обработчики событий) выполнялись, их надо забиндить
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);

        //начиная с этого номера будут присваиваться id новым записям
        this.maxId = 4;
    }

    // функция удаляющая пост:
    deleteItem(id) {
        this.setState(({data}) => {
            //узнаем на каком месте стоит тот пост, который нужно удалить
            //сравниваем все id из массива с id, который передан в аргумент
            //функции onDelete в post-list.js
            const index = data.findIndex(elem => elem.id === id);

            //создаем массив, который будет находиться ДО того элемента, который нужно удалить
            //и массив, который будет ПОСЛЕ этого элемента
            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            //соединяем два этих массива, в которых нет удаленного элемента в один:
            const newArr = [...before, ...after];

            return {
                data: newArr
            }

        });
    }

    //функция добавляющая пост
    addItem(body) {
        //создаем новый элемент (пост) в виде объекта
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        //помещаем его в state:
        this.setState(({data}) => {
            //создаем новый массив, в который уже включены все элементы data + новый элемент
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    //формирование вёрстки приложения
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList
                    posts={this.state.data}
                    onDelete={this.deleteItem}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

