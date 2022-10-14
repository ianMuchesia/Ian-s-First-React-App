import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircleOutline } from "react-icons/md";

const Todos = () => {
  const [name, setName] = React.useState("");
  const [task, setTask] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [edit, setEdit] = React.useState(false);
  const [newName, setNewName] = useState("");
  const [editArray, setEditArray] = useState([]);

  //getting items from local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  //handleChange function
  const handleChange = (event) => {
    setName(event.target.value);
  };

  //handleClick function
  const handleClick = () => {
    if (name) {
      setName("");
      setTask([...task, { id: uuidv4(), toBeDone: name, checked: false }]);
      localStorage.setItem("tasks", JSON.stringify(task));
    } else {
      alert("please enter a task");
    }
  };

  //to remove a task button
  const handleRemove = (id) => {
    const filterOutRemovedTask = task.filter((item) => item.id !== id);
    console.log(filterOutRemovedTask);
    setTask(filterOutRemovedTask);
    localStorage.setItem("tasks", JSON.stringify(filterOutRemovedTask));
  };

  //the edit button
  const handleClickEdit = (id) => {
    setEdit((prevEdit) => !prevEdit);
    const updatedEditArray = task.filter((item) => item.id === id);

    setEditArray(updatedEditArray);
  };

  //handle the edit input task
  const handleEdit = (event) => {
    setNewName(event.target.value);
  };

  //to edit the task
  const handleSubmitEdit = (id) => {
    editTask(id, newName);
    setEdit((prevEdit) => !prevEdit);
    setNewName("");
  };
  // logic behind the editing, if id matches
  const editTask = (id, value) => {
    const editedTaskList = task.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, toBeDone: value };
      }
      return task;
    });
    setTask(editedTaskList);
    localStorage.setItem("tasks", JSON.stringify(editedTaskList));
  };

  //checkbox event
  const handleIsChecked = (id) => {
    checkedState(id);
  };
  //updates the state with checked items
  const checkedState = (id) => {
    const updatedArray = task.map((item) => {
      if (id === item.id) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    setTask(updatedArray);
    localStorage.setItem("tasks", JSON.stringify(updatedArray));
  };

  //to clear isChecked items
  const handleClear = () => {
    const updatedArray = task.filter((item) => !item.checked);
    setTask(updatedArray);
    localStorage.setItem("tasks", JSON.stringify(updatedArray));
  };

  //tailwind classes
  const classes = {
    wholeDiv:
      "w-[400px] bg-black h-[574px] border-2 p-5 flex flex-col items-center shadow-xl rounded-xl overflow-auto",
    heading: "text-4xl text-white text-center mb-4",
    inputBox: "w-full h-10 rounded-md border border-red-600 text-black p-2",
    Button:
      "w-32 h-10 bg-red-900 text-white  cursor-pointer hover:bg-white hover:text-black hover:font-bold mt-4 rounded-md ml-2",
    Todo: `shadow-lg  border-4 border-red-800 w-full m-4 h-28 p-2 rounded-md  `,
    heading_2: "text-white mb-2 font-bold hover:text-red-800 ",
    name: `text-white text-sm truncate `,
    deleteBtn:
      "w-24 h-8 bg-red-900 text-white  cursor-pointer hover:bg-white hover:text-black text-sm hover:font-bold  rounded-md mx-1",
    controlButtons: "flex justify-evenly",
    editBox: "w-full h-10 rounded-md border border-red-600 text-black p-2 mt-4",
    editButton:
      "w-24 h-10 bg-red-900 text-white  cursor-pointer hover:bg-white hover:text-black hover:font-bold mt-4 rounded-md ml-2",
    edit: "flex ",
    ClearButton:
      "w-32 h-10 bg-red-900 text-white  cursor-pointer hover:bg-white hover:text-black hover:font-bold mt-4 rounded-md ml-16",
    checkbox: "accent-red-800 w-5 h-5 text-white mt-1 mr-4",
    remove: "text-white text-2xl hover:text-red-800",
    spanEdit: "text-white text-2xl mr-2 hover:text-red-800",
    todoItems: "flex justify-between",
  };

  return (
    <div>
      <div className={classes.wholeDiv}>
        <h1 className={classes.heading}> My Todo App</h1>
        <div>
          <input
            type="text"
            className={classes.inputBox}
            placeholder="Type your name here"
            value={name}
            onChange={handleChange}
          />
          <button className={classes.Button} onClick={handleClick}>
            {" "}
            Add Task
          </button>
          <button className={classes.ClearButton} onClick={handleClear}>
            Clear Done
          </button>
        </div>
        {edit &&
          editArray.map((item) => {
            return (
              <div className={classes.edit} key={item.id}>
                {" "}
                <input
                  type="text"
                  className={classes.editBox}
                  placeholder="Edit your task here"
                  value={newName}
                  onChange={handleEdit}
                />
                <button
                  className={classes.editButton}
                  onClick={() => handleSubmitEdit(item.id)}
                >
                  {" "}
                  Edit
                </button>
              </div>
            );
          })}

        {!edit &&
          task.map((item) => {
            return (
              <div key={item.id} className={classes.Todo}>
                <div className={classes.todoItems}>
                  <h3 className={classes.heading_2}>
                    Item {task.indexOf(item) + 1}
                  </h3>
                  <div className={classes.controlButtons}>
                    <input
                      type="checkbox"
                      value={item.checked}
                      onChange={() => handleIsChecked(item.id)}
                      className={classes.checkbox}
                      checked={item.checked}
                    />
                    <span
                      className={classes.spanEdit}
                      onClick={() => handleClickEdit(item.id)}
                    >
                      <FaEdit />
                    </span>

                    <span
                      className={classes.remove}
                      onClick={() => handleRemove(item.id)}
                    >
                      <MdRemoveCircleOutline />
                    </span>
                  </div>
                </div>

                <p
                  className={`${classes.name}${
                    item.checked === true ? "line-through" : ""
                  }`}
                >
                  &bull;{item.toBeDone}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todos;
