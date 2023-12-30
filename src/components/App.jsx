import React, { useState, useEffect } from "react";
import Input from "./Input";
import ToDoItem from "./ToDoItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
    const [toggleTheme, setToggleTheme] = useState(false);
    const [todoItems, setToDoItems] = useState([]);
    const [checkedIDs, setCheckedIDs] = useState([]);
    const [filters, setFilters] = useState({
        all: "active",
        active: "inactive",
        completed: "inactive",
        allHover: false,
        activeHover: false,
        completedHover: false,
        clearHover: false
    });
    const [isTabletSize, setIsTabletSize] = useState(false);
    const [isMobileSize, setIsMobileSize] = useState(false);

    const checkWindowSize = () => {
        if (window.innerWidth <= 768) {
            setIsTabletSize(true);
        } else {
            setIsTabletSize(false);
        }

        if (window.innerWidth <= 606) {
            setIsMobileSize(true);
        } else {
            setIsMobileSize(false);
        }
    };

    useEffect(() => {
        checkWindowSize();
        window.addEventListener("resize", checkWindowSize);
        return () => {
            window.removeEventListener("resize", checkWindowSize);
        };
    }, []);

    // Change styles based on toggleTheme

    // Change body bg color 
    document.body.style.backgroundColor = toggleTheme ? "hsl(0, 0%, 98%)" : "hsl(235, 21%, 11%)";

    // Change bg img 
    const toggleBgImgs = (isMobileSize && toggleTheme) ? { backgroundImage: "url('./images/bg-mobile-light.jpg')" } : (isMobileSize && !toggleTheme) ? { backgroundImage: "url('./images/bg-mobile-dark.jpg')" } : toggleTheme ? { backgroundImage: "url('./images/bg-desktop-light.jpg')" } : { backgroundImage: "url('./images/bg-desktop-dark.jpg')" };

    // Change theme icons 
    const toggleThemeIcons = toggleTheme ? <img onClick={handleThemeIconClick} src="./images/icon-moon.svg" alt="icon-moon" /> : <img onClick={handleThemeIconClick} src="./images/icon-sun.svg" alt="icon-sun" />;

    // Change create box color 
    const toggleCreateBoxColor = toggleTheme ? { backgroundColor: "hsl(0, 0%, 100%)" } : { backgroundColor: "hsl(235, 24%, 19%)" }

    // Change og circle color 
    const toggleOgCircleColor = toggleTheme ? { border: "1px solid hsl(236, 33%, 92%)" } : { border: "1px solid hsl(233, 14%, 35%)" }

    // Change input text color
    const toggleInpTxtColor = toggleTheme ? { color: "hsl(235, 19%, 35%)" } : { color: "hsl(234, 39%, 85%)" }

    // Change input placeholder color 
    const inpPhClassName = toggleTheme ? "create_inp_light" : "create_inp_dark";

    // Change todoitem class name
    const todoItemClassName = toggleTheme ? "todo_item_light" : "todo_item_dark";

    // Change styles based on checked and toggleTheme

    // Change check circle class name
    const checkCircleClassName = toggleTheme ? "check_circle_light" : "check_circle_dark";

    function handleThemeIconClick() {
        setToggleTheme(PrevVal => !PrevVal);
    }

    function addToDoItem(inputText) {
        const newItem = {
            id: Date.now(),
            item: inputText
        };
        setToDoItems(prevItems => [...prevItems, newItem]);
    }

    function deleteToDoItem(id) {
        setToDoItems(prevItems => prevItems.filter(item => id !== item.id));
        setCheckedIDs(prevIDs => prevIDs.filter(chckdID => id !== chckdID));
    }

    function clearCompleted() {
        setToDoItems(prevItems => prevItems.filter(item => !checkedIDs.includes(item.id)));
        setCheckedIDs([]);
    }

    function handleAllClick() {
        setFilters(prevFilters => ({
            ...prevFilters,
            all: "active",
            active: "inactive",
            completed: "inactive"
        }));
    }

    function handleActiveClick() {
        setFilters(prevFilters => ({
            ...prevFilters,
            all: "inactive",
            active: "active",
            completed: "inactive"
        }));
    }

    function handleCompletedClick() {
        setFilters(prevFilters => ({
            ...prevFilters,
            all: "inactive",
            active: "inactive",
            completed: "active"
        }));
    }

    function handleAllMouseOver() {
        setFilters(prevFilters => ({
            ...prevFilters,
            allHover: true
        }));
    }

    function handleAllMouseOut() {
        setFilters(prevFilters => ({
            ...prevFilters,
            allHover: false
        }));
    }

    function handleActiveMouseOver() {
        setFilters(prevFilters => ({
            ...prevFilters,
            activeHover: true
        }));
    }

    function handleActiveMouseOut() {
        setFilters(prevFilters => ({
            ...prevFilters,
            activeHover: false
        }));
    }

    function handleCompletedMouseOver() {
        setFilters(prevFilters => ({
            ...prevFilters,
            completedHover: true
        }));
    }

    function handleCompletedMouseOut() {
        setFilters(prevFilters => ({
            ...prevFilters,
            completedHover: false
        }));
    }

    function handleClearMouseOver() {
        setFilters(prevFilters => ({
            ...prevFilters,
            clearHover: true
        }));
    }

    function handleClearMouseOut() {
        setFilters(prevFilters => ({
            ...prevFilters,
            clearHover: false
        }));
    }

    const handleDragDrop = (sourceIndex, targetIndex) => {
        const updatedTodoItems = [...todoItems];
        const [movedItem] = updatedTodoItems.splice(sourceIndex, 1);
        updatedTodoItems.splice(targetIndex, 0, movedItem);
        setToDoItems(updatedTodoItems);
    };

    const allPara = <p style={{
        color: filters.all === "active" ? "hsl(220, 98%, 61%)" : (filters.allHover && toggleTheme) ? "hsl(235, 21%, 11%)" : filters.allHover ? "hsl(236, 33%, 92%)" : "hsl(234, 11%, 52%)"
    }} onMouseOver={handleAllMouseOver} onMouseOut={handleAllMouseOut} onClick={handleAllClick}>All</p>;

    const activePara = <p style={{
        color: filters.active === "active" ? "hsl(220, 98%, 61%)" : (filters.activeHover && toggleTheme) ? "hsl(235, 21%, 11%)" : filters.activeHover ? "hsl(236, 33%, 92%)" : "hsl(234, 11%, 52%)"
    }} onMouseOver={handleActiveMouseOver} onMouseOut={handleActiveMouseOut} onClick={handleActiveClick}>Active</p>;

    const completedPara = <p style={{
        color: filters.completed === "active" ? "hsl(220, 98%, 61%)" : (filters.completedHover && toggleTheme) ? "hsl(235, 21%, 11%)" : filters.completedHover ? "hsl(236, 33%, 92%)" : "hsl(234, 11%, 52%)"
    }} onMouseOver={handleCompletedMouseOver} onMouseOut={handleCompletedMouseOut} onClick={handleCompletedClick}>Completed</p>;

    return (
        <div id="main_container">
            <div style={toggleBgImgs} className="bg_img_container"></div>
            <div className="todo_component">
                <div className="header">
                    <p>TODO</p>
                    {toggleThemeIcons}
                </div>
                <div style={toggleCreateBoxColor} className="create_todo">
                    <div className="check_container">
                        <div style={toggleOgCircleColor} className="og_check_circle"></div>
                    </div>
                    <Input
                        style={toggleInpTxtColor}
                        className={inpPhClassName}
                        todoItems={todoItems}
                        addToDoItem={addToDoItem}
                    />
                </div>
                <div className="todo_list">
                    <DndProvider backend={isTabletSize ? TouchBackend : HTML5Backend} options={{ enableMouseEvents: true }}>
                        {
                            todoItems.map((item, index) => {
                                const todoitem = <ToDoItem
                                    key={index}
                                    id={item.id}
                                    index={index}
                                    todoitem={item.item}
                                    toggleTheme={toggleTheme}
                                    todoItems={todoItems}
                                    checkedIDs={checkedIDs}
                                    setCheckedIDs={setCheckedIDs}
                                    deleteToDoItem={deleteToDoItem}
                                    isTabletSize={isTabletSize}
                                    checkCircleClassName={checkCircleClassName}
                                    todoItemClassName={todoItemClassName}
                                    handleDragDrop={handleDragDrop}
                                />;

                                if (filters.all === "active") {
                                    return todoitem;
                                } else if (filters.active === "active" && !checkedIDs.includes(item.id)) {
                                    return todoitem;
                                } else if (filters.completed === "active" && checkedIDs.includes(item.id)) {
                                    return todoitem;
                                }
                                return null;
                            })
                        }
                    </DndProvider>
                </div>
                {todoItems.length !== 0 &&
                    <div style={{
                        backgroundColor: toggleTheme ? "hsl(0, 0%, 100%)" : "hsl(235, 24%, 19%)",
                        boxShadow: (isMobileSize && toggleTheme) ? "0px 40px 40px -20px hsl(233, 11%, 84%)" : (isMobileSize && !toggleTheme) ? "0px 40px 40px -19px hsl(231, 24%, 6%)" : toggleTheme ? "0px 40px 40px -20px hsl(236, 9%, 61%)" : "0px 40px 40px -19px #000",
                        borderRadius: "0 0 5px 5px",
                        height: isMobileSize && "60px"
                    }} className="footer_bar">
                        <p style={{ color: toggleTheme ? "hsl(236, 9%, 61%)" : "hsl(233, 14%, 35%)" }}>{todoItems.length - checkedIDs.length} items left</p>
                        <div>
                            {!isMobileSize && allPara}
                            {!isMobileSize && activePara}
                            {!isMobileSize && completedPara}
                        </div>
                        <p style={{
                            color: (toggleTheme && filters.clearHover) ? "hsl(235, 19%, 35%)" : filters.clearHover ? "hsl(234, 39%, 85%)" : toggleTheme ? "hsl(236, 9%, 61%)" : "hsl(233, 14%, 35%)",
                            cursor: "pointer"
                        }} onClick={clearCompleted} onMouseOver={handleClearMouseOver} onMouseOut={handleClearMouseOut}>Clear Completed</p>
                    </div>}
                {(isMobileSize && todoItems.length !== 0) &&
                    <div style={{
                        backgroundColor: toggleTheme ? "hsl(0, 0%, 100%)" : "hsl(235, 24%, 19%)",
                        boxShadow: toggleTheme ? "0px 40px 40px -20px hsl(236, 33%, 92%)" : "0px 40px 40px -19px hsl(235, 24%, 10%)"
                    }} className="footer_bar_mobile">
                        <div>
                            {allPara}
                            {activePara}
                            {completedPara}
                        </div>
                    </div>}
                {todoItems.length > 1 && <p style={{ color: toggleTheme ? "hsl(236, 9%, 61%)" : "hsl(233, 14%, 35%)" }} className="dndTxt">Drag and drop to reorder list</p>}
            </div>
            {todoItems.length !== 0 && <p style={{ color: toggleTheme ? "hsl(235, 19%, 35%)" : "hsl(234, 39%, 85%)" }} className="credits">Challenge by <a style={{ color: toggleTheme ? "hsl(280, 87%, 65%)" : "hsl(192, 100%, 67%)" }} href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
                Coded by <a style={{ color: toggleTheme ? "hsl(280, 87%, 65%)" : "hsl(192, 100%, 67%)" }} href="https://www.frontendmentor.io/profile/timodn">@timodn</a>.
            </p>}
        </div>
    );
}

export default App;