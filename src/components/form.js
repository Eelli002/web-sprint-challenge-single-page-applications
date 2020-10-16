import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {
    const [formState, setFormState] = useState({
        name: '',
        size: {
            small: false,
            medium: false,
            large: false,
        },
        toppings: {
            pepperoni: false,
            sausage: false,
            olive: false,
            basil: false,
        },
        instructions: '',
    })

    const inputChange = (event) => {
        if(event.target.type==='checkbox'){
            setFormState({...formState, toppings:{
                ...formState.toppings,[event.target.value]:event.target.checked
            }})
        } else {
            setFormState({...formState,[event.target.name]:event.target.value})
        }
    }

    const validate = yup.object().shape({
        name: yup
        .string().min(2, 'min 2 letters').required('Enter valid name')
    })

    const validateSchema = (event) => {
        event.persist()
        yup.reach(validate, event.target.name)
        validate(event.target.value)
        .then(success => {
            console.log('success', success)
        })
    }

    const [order, setOrder] = useState([])

    const formSubmit = event => {
        event.preventDefault()
        axios
        .post('https://reqres.in/api/users', formState)
        .then(response => {
            console.log('working', response.data)
            setOrder(response.data)
        })
    }

    return(
        <form onSubmit={formSubmit}>

            <label htmlFor='name'>
                Name
                <input
                id='name'
                type='text'
                name='name'
                value={formState.name}
                onChange={inputChange}
                data-cy='name'
                />
            </label>

            <label htmlFor='size'>
                Size
                <select id='size' type='text' name='size' value={formState.size} onChange={inputChange} data-cy='size'>
                    <option value=''>---Choose One---</option>
                    <option value='small' data-cy='small'>Small</option>
                    <option value='medium' data-cy='medium'>Medium</option>
                    <option value='large' data-cy='large'>Large</option>
                </select>
            </label>

            <label htmlFor='toppings'>
                Toppings
                <label htmlFor='pepperoni'> <input id='pepperoni' type='checkbox' name='pepperoni' onChange={inputChange} data-cy='pepperoni'/>Pepperoni</label>
                <label htmlFor='sausage'> <input id='sausage' type='checkbox' name='sausage' onChange={inputChange} data-cy='sausage'/>Sausage</label>
                <label htmlFor='olive'> <input id='olive' type='checkbox' name='olive' onChange={inputChange} data-cy='olive'/>Olive</label>
                <label htmlFor='basil'> <input id='basil' type='checkbox' name='basil' onChange={inputChange} data-cy='basil'/>Basil</label>
            </label>

            <label htmlFor='instructions'>
                Instructions
                <textarea id='instructions' name='instructions' placeholder='Enter Instructions Here' value={formState.instructions} onChange={inputChange} data-cy='instructions'/>
            </label>

            <button type='submit' data-cy='submit'>Submit Your Order</button>
            <pre>{JSON.stringify(order, null, 2)}</pre>

        </form>
    )
}

export default Form