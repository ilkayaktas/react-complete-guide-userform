import React, {useState} from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
    const [error, setError] = useState();
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault();

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age.'
            });
            return;
        }

        if (+enteredAge < 0) { // adding + at the begining cast string to integer
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age.'
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);

        setEnteredUsername('');
        setEnteredAge('');
    };

    const usernameChangedHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangedHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const errorHandler = () => {
        setError(null);
    };
    return (
        <div>
            {error && <ErrorModal title = {error.title}
                                  message = {error.message}
                                  onConfirm = {errorHandler}/>}
            <Card className = {classes.input}>
                <form onSubmit = {addUserHandler}>
                    <label htmlFor = "username">Username</label>
                    <input id = "username"
                           type = "text"
                           value = {enteredUsername}
                           onChange = {usernameChangedHandler}/>
                    <label htmlFor = "age">Age (Years)</label>
                    <input id = "age"
                           type = "number"
                           value = {enteredAge}
                           onChange = {ageChangedHandler}/>
                    <Button type = "submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
}

export default AddUser;