import React, { useEffect, useRef, useState } from 'react'

const Home = (props) => {
    // * These are the initialState values of the form
    const initialState = {
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        confirmPassword: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const initialRef = useRef(true);



    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    useEffect(() => {
        if(initialRef.current === false){
            const validationErrors = validate();
            setErrors(validationErrors);
        }

        return () => {
            initialRef.current = true;
        }
    }, [initialRef, formData, errors])

    const onSubmit = (e) => {
        e.preventDefault();

        console.log('Inside onSubmit');
        const validationErrors = validate();
        console.log(Object.values(validationErrors).length);
        if (Object.values(validationErrors).length === 0) {
            // No errors, submit the form or perform other actions
            console.log("No errors");
            console.log(formData);
            setFormData(initialState); // Reset the form after submission
        } else {
            // Update the errors state with validationErrors
            console.log("Errors");
            setErrors(validationErrors);
        }
    }
    // Form validation goes here
    const validate = () => {

        // const errors = {
        //     fullName: '',
        //     email: '',
        //     phone: '',
        //     gender: '',
        //     password: '',
        //     confirmPassword: '',
        // };

        const errors = {};

        const { fullName, email, phone, gender, password, confirmPassword } = formData;

        // * Form validation for fullName
        // Regular expression pattern to match special characters
        var pattern = /[!@#$%^&*(),.?":{}|<>]/;

        if (fullName.length < 3 || fullName.length > 15) {
            errors.fullName = 'Full Name must be between 3 and 15 characters';
            return errors;
        }

        if (pattern.test(fullName)) {
            errors.fullName = 'Full Name cannot contain special characters';
            return errors;
        }

        // * Form validation for email
        if (!email.includes('@')) {
            errors.email = 'Please enter a valid email address';
            return errors;
        }

        // * Form validation for phone
        if (phone.length !== 10) {
            errors.phone = 'Phone number must be 10 digits';
            return errors;
        }

        // * Form validation for gender
        if (!gender) {
            errors.gender = 'Please select any gender';
            return errors;
        }

        // * Form validation for password
        if (password.length > 6 && password.length < 15) {
            if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
                errors.password = 'Password must contain at least one number, one special character, one lowercase and one uppercase letter';
                return errors;
            }
        } else {
            errors.password = 'Password must be between 6 and 15 characters';
            return errors;
        }

        // * Form validation for confirmPassword
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
            return errors;
        } else if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match';
            return errors;
        }

        // console.log(errors);
        return errors;
    };

    const { fullName, email, phone, gender, password, confirmPassword } = formData;

    return (
        <div className='mainDiv'>
            <h3 className='heading1'>Form Validation</h3>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='inputBox'>
                        <label htmlFor='name'>Name </label>
                        <input
                            type='text'
                            id='name'
                            name='fullName'
                            value={fullName}
                            onChange={onChange}
                            placeholder='Enter your Name'
                            className='inputText'
                        />
                        <br />
                        {errors.fullName && <span className='error'>{errors.fullName}</span>}
                    </div>
                    <div className='inputBox'>
                        <label htmlFor='email'>Email </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Email'
                            className='inputText'
                        />
                        <br />
                        {errors.email && <span className='error'>{errors.email}</span>}
                    </div>
                </div>

                <div className='inputBox'>
                    <label htmlFor='phone'>Phone Number </label>
                    <input
                        type='phone'
                        id='phone'
                        name='phone'
                        value={phone}
                        onChange={onChange}
                        placeholder='Enter your phone number'
                        className='inputText'
                    />
                    <br />
                    {errors.phone && <span className='error'>{errors.phone}</span>}
                </div>

                <div>
                    <p className=''>Gender</p>
                    <div className='genderBox'>
                        <input
                            type='radio'
                            id='female'
                            name='gender'
                            value='Female'
                            onChange={onChange}
                            checked={gender === 'Female'}
                        />
                        <label htmlFor='female'>Female</label>
                    </div>
                    <div className='genderBox'>
                        <input
                            id='male'
                            type='radio'
                            name='gender'
                            value='Male'
                            onChange={onChange}
                            checked={gender === 'Male'}
                        />
                        <label htmlFor='male'>Male</label>
                    </div>
                    <div className='genderBox'>
                        <input
                            id='other'
                            type='radio'
                            name='gender'
                            value='Other'
                            onChange={onChange}
                            checked={gender === 'Other'}
                        />
                        <label htmlFor='other'>Other</label>
                    </div>
                    <br />
                    {errors.gender && <span className='error'>{errors.gender}</span>}
                </div>

                <div>
                    <div className='inputBox'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password}
                            onChange={onChange}
                            placeholder='Enter your Name'
                            className='inputText' />
                        {errors.password && <span className='error'>{errors.password}</span>}
                    </div>
                    <div className='inputBox'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword}
                            onChange={onChange}
                            placeholder='Confirm Password'
                            className='inputText' />
                        {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
                    </div>

                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Home;
