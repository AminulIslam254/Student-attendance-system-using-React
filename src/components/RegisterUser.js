import { Button, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import 'date-fns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import moment from 'moment/moment';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    box1: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    box2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    box3: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        minHeight: 530,
        height: "fit-content",
        minWidth: 500,
        width: 200,
        justifyContent: "center",
        border: "2px solid black",
        margin: "0 auto 0 auto",

    },
    cnt: {
        display: "flex",
        justifyContent: "flex-end",
    }
}));

function RegisterUser() {

    const classes = useStyles();

    const [storeToday, setStoreToday] = useState([])

    const initialState = { name: "", roll: "", checkInTime: "", checkOutTime: "" };
    const [formValue, setformValue] = useState(initialState);

    const [formErrors, setFormErrors] = useState({ name: "", roll: "", checkInTime: "", checkOutTime: "" });

    let [countRegistration, setCountRegistration] = useState(0);
    let [noSchoolStudent, setnoSchoolStudent] = useState(0);

    const [checkValueIn, setcheckValueIn] = React.useState(new Date());
    const [checkValueOut, setcheckValueOut] = React.useState(new Date());

    const handleChange = (event) => {

        const { name, value } = event.target;
        setformValue({ ...formValue, [name]: value });
    };


    const handleCheckinTime = (newValue) => {

        setcheckValueIn(newValue);
        formValue.checkInTime = newValue[Object.keys(newValue)[2]];



    }
    const handleCheckoutTime = (newValue) => {
        setcheckValueOut(newValue);
        formValue.checkOutTime = newValue[Object.keys(newValue)[2]];



    }



    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Enter Name";
        }
        if (!values.roll) {
            errors.roll = "Enter Roll Number";
        }
        if (!values.checkInTime) {
            errors.checkInTime = "Enter Check in Time";
        }
        if (!values.checkOutTime) {
            errors.checkOutTime = "Enter Check out Time";
        }
        return (errors);
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        setFormErrors(validate(formValue));
    }



    const handleData = (event) => {
        // console.log(formValue)
        let var1 = checkValueIn;
        var1 = (var1[Object.keys(var1)[2]]);

        formValue.checkInTime = (var1.getHours()) + " " + var1.getMinutes();

        var1 = checkValueOut;
        var1 = (var1[Object.keys(var1)[2]]);
        formValue.checkOutTime = var1.getHours() + " " + var1.getMinutes();


        let newArr = [...storeToday];
        if (newArr[newArr.length - 1] !== formValue) {
            newArr.push(formValue)

            setStoreToday(newArr)
        }


        console.log(storeToday)








    }

    useEffect(() => {
        setCountRegistration(storeToday.length)
        // console.log(storeToday.length)

        let today=new Date();
        let currHrs=today.getHours();
        let currMin=today.getMinutes();
        let cnt=0;

        for(let key in storeToday){
            let arr=storeToday[key].checkOutTime.split(' ');
            if(parseInt(arr[0])>currHrs)
            {
                cnt++;
            }
            else if(parseInt(arr[0])===currHrs)
            {
                if(parseInt(arr[1])>currMin)
                {
                    cnt++;
                }
            }
        }

        setnoSchoolStudent(cnt);
    }, [storeToday])


    useEffect(() => {
        if (formErrors.name === undefined && formErrors.roll === undefined &&
            formErrors.checkInTime === undefined && formErrors.checkOutTime === undefined) {
            handleData();
        }
    }, [formErrors])


    return (
        <>

            <div>Total Number of registration today : {countRegistration}</div>
            <div>Number of students in the school right now are : {noSchoolStudent}</div>
            <div className={classes.box3}>
                <div className={classes.box1}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.name}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Name" variant="outlined" onChange={handleChange} name="name" /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.roll}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Roll Number" variant="outlined" onChange={handleChange} name="roll" /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.checkInTime}</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <MobileTimePicker
                                    label="Check in Time"
                                    value={checkValueIn}
                                    onChange={handleCheckinTime}
                                    renderInput={(params) => <TextField {...params} />}
                                />


                            </Stack>
                            <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.checkOutTime}</span>
                            <Stack spacing={3}>
                                <MobileTimePicker
                                    label="Check out Time"
                                    value={checkValueOut}
                                    onChange={handleCheckoutTime}
                                    renderInput={(params) => <TextField {...params} />}
                                />


                            </Stack>
                        </LocalizationProvider>


                    </form>

                </div>


                <div className={classes.box2} >
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Register
                    </Button>
                </div>
            </div>

        </>
    )
}


export default RegisterUser