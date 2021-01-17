import React from 'react';

import './post-add-form.css';

const PostAddForm = ({onAdd}) => {
    return (
        <div className="bottom-panel d-flex">
            <input
                type="text"
                placeholder="What's happening?"
                className="form-control new-post-label"
            />
            <button
                type="submit"
                className="btn btn-outline-secondary"
                //обработчик события передается в функцию addItem
                onClick={() => onAdd('Hello')}>
                Post</button>
        </div>
    )
}

export default PostAddForm;