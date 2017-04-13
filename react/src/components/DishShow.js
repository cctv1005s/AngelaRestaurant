import React from 'react';

export default function({Dish,Active,onClick}){
    if(!Active)
        return (<i></i>);
    
    return (
        <div className="dish-show-box" onClick={onClick}>
            <div className="dish-box">
                <div className="dish-img">
                    <img src={Dish.Img}/>
                </div>
                <div className="dish-info">
                    <div className="dish-title">{Dish.Name}</div>
                    <div className="dish-decription">
                        {Dish.Description}
                    </div>
                </div>
            </div>
        </div>
    );
}