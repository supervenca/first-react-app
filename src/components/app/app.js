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
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: 'That is so good', important: false,like: false, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };

        //чтобы функции(обработчики событий) выполнялись, их надо забиндить
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

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

    //функция, отвечающая за переключение state у important
    onToggleImportant(id) {
        this.setState(({data}) => {

            const index = data.findIndex(elem =>elem.id === id);

            const old = data[index];

            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0,index),newItem,...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }
//функция, отвечающая за количество лайков
    onToggleLiked(id) {
        this.setState(({data}) => {
            //получаем номер поста из массива data
            //сверяем id поста из data с тем id, который был передан функции в аргумент через событие
            const index = data.findIndex(elem =>elem.id === id);
            //сохраняем полученный пост в переменную
            const old = data[index];
            //перезапись инвертированного свойства like
            //в newItem будет помещено все, что было в старом объекте с одним измененным свойством
            const newItem = {...old, like: !old.like};

            //формируем новый массив для data тем же методом, что и в addItem
            const newArr = [...data.slice(0,index),newItem,...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    //поиск по постам - функция вернет массив
    searchPost(items, term) {
        if (term.length === 0) {
            //если пользователь ничего не ввел, ничего не меняется
            return items
        }

        return items.filter((item) => {
            //те посты, в которых будет содержаться то, что ввел пользователь в поиске
            return item.label.indexOf(term) > -1
        });
    }

    //обновляет term у state
    onUpdateSearch(term) {
        this.setState({term})
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        }else {
            return items
        }

    }

    onFilterSelect(filter) {
        this.setState({filter})
    }


    //формирование вёрстки приложения
    render() {
        const {data,term,filter} = this.state;
        //подсчитываем кол-во общих постов
        const liked = this.state.data.filter(item => item.like).length;
        //подсчитываем кол-во лайкнутых постов
        const allPosts = this.state.data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

