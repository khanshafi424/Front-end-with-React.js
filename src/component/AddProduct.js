// import React, { useState } from "react"

// function AddProduct() {
//  const [name, setName] = useState('');
//  const [price, setPrice] = useState(0);
//  const [category, setCategory] = useState('');
//  const [company, setCompany] = useState('');
//  const [error, setError] = React.useState(false);

//  const submit = async () => {

//     if( !name || !price || !category || !company) {
//         setError(true);
//         return false
//     }

//     const userId = JSON.parse(localStorage.getItem("user"))._id;
//     let result = await fetch("http://localhost:5000/add-product", {
//         method: 'post',
//         body: JSON.stringify({
//             name , price, category, company, userId
//         }),
//         headers: {
//             "Content-Type": "application/json",
//         }      
//     })
//     result = await result.json();
//     console.log(result)
//  }

//   return (
//     <div className='product'>
//     <h1>Add Product</h1>
//     <input type="text" onChange={(e) => {setName(e.target.value)}} placeholder='Enter Product Name' className='input-box'
//     />
//     { error && !name && <span className="input-valid">Please Enter Name</span>}
//     <input type="text" onChange={(e) => {setPrice(e.target.value)}} placeholder='Enter Price' className='input-box'
//     />
//     { error && !price && <span className="input-valid">Please Enter Price</span>}
//     <input type="text" onChange={(e) => {setCategory(e.target.value)}} placeholder='Enter Category' className='input-box'
//     />
//     { error && !category && <span className="input-valid">Please Enter Catrgory</span>}
//     <input type="text" onChange={(e) => {setCompany(e.target.value)}} placeholder='Enter Company Name' className='input-box'
//     />
//     { error && !company && <span className="input-valid">Please Enter Company</span>}
//     <button onClick={submit} className='sing-up-btn'>Add Product</button>
//     </div>
//   )
// }

// export default AddProduct

import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [form, setForm] = useState({
        name: '',
        price: '',
        category: '',
        company: ''
    });

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const submit = useCallback(async () => {
        const { name, price, category, company } = form;

        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?._id;

            const response = await fetch("http://localhost:5000/add-product", {
                method: 'POST',
                headers: { "Content-Type": "application/json",   
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
                body: JSON.stringify({ ...form, userId })
            });

            const result = await response.json();
             if(result){
               navigate('/')
            }
            
            console.log(result);
            
        } catch (err) {
            console.error("Error submitting product:", err);
        }
    }, [form]);

    const renderInput = (label, name) => (
        <>
            <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="input-box"
            />
            {error && !form[name] && (
                <span className="input-valid">Please enter {label}</span>
            )}
        </>
    );

    return (
        <div className="product">
            <h1>Add Product</h1>
            {renderInput("Product Name", "name")}
            {renderInput("Price", "price")}
            {renderInput("Category", "category")}
            {renderInput("Company Name", "company")}
            <button onClick={submit} className="sing-up-btn">
                Add Product
            </button>
        </div>
    );
}

export default AddProduct;
