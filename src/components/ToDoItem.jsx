import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function ToDoItem(props) {
    const [itemHover, setItemHover] = useState(false);
    const [crossHover, setCrossHover] = useState(false);

    const [, drag] = useDrag({
        type: "TODO_ITEM",
        item: { id: props.id, index: props.index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "TODO_ITEM",
        hover: (item) => {
            if (item.id !== props.id) {
                props.handleDragDrop(item.index, props.index);
                item.index = props.index;
            }
        },
    });

    function handleCheck() {
        if (props.checkedIDs.includes(props.id)) {
            props.setCheckedIDs(prevIDs => prevIDs.filter(id => id !== props.id));
        } else {
            props.setCheckedIDs(prevIDs => [...prevIDs, props.id]);
        }
    }

    const isChecked = props.checkedIDs.includes(props.id);

    function handleItemMouseOver() {
        setItemHover(true);
    }

    function handleItemMouseOut() {
        setItemHover(false);
    }

    function handleCrossMouseOver() {
        setCrossHover(true);
    }

    function handleCrossMouseOut() {
        setCrossHover(false);
    }

    const crossIcon = <svg onClick={() => {
        props.deleteToDoItem(props.id);
    }} onMouseOver={handleCrossMouseOver} onMouseOut={handleCrossMouseOut} className="cross_icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path style={{
            fill: (crossHover && props.toggleTheme) ? "hsl(233, 11%, 84%)" : (crossHover && !props.toggleTheme) ? "hsl(237, 14%, 26%)" : "#494C6B"
        }} fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
    </svg>;

    return (
        <div ref={(node) => drag(drop(node))} style={{ borderRadius: props.index === 0 && "5px 5px 0 0" }} className={props.todoItemClassName} onMouseOver={handleItemMouseOver} onMouseOut={handleItemMouseOut}>
            <div className="check_container">
                <div onClick={handleCheck} className={`${props.checkCircleClassName}${isChecked ? "_active" : ""}`}>
                    {isChecked && <img src="./images/icon-check.svg" alt="icon-check" />}
                </div>
            </div>
            <p style={{
                color: isChecked && props.toggleTheme ? "hsl(236, 33%, 92%)" : isChecked && !props.toggleTheme ? "hsl(233, 14%, 35%)" : undefined,
                textDecoration: isChecked && "line-through",
                textDecorationColor: (isChecked && props.toggleTheme) ? "hsl(235, 19%, 35%)" : (isChecked && !props.toggleTheme) ? "hsl(234, 39%, 85%)" : undefined,
                textDecorationThickness: isChecked && "0.1px"
            }}>{props.todoitem}</p>
            {props.isTabletSize ? crossIcon : itemHover && crossIcon}
        </div>
    );
}

export default ToDoItem;