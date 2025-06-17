import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
 const [name, setName] = useState('');
 const [price, setPrice] = useState(0);
 const [category, setCategory] = useState('');
 const [company, setCompany] = useState('');
 
 const [error, setError] = React.useState(false);
 const useParam = useParams();
 const navigate = useNavigate();

 useEffect(() => {
    console.log(useParam);
    getProduct();
 }, [])

const getProduct = async () => {
    let result = await fetch("http://localhost:5000/product/" + useParam.id, {
       headers: {
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
    });
    result = await result.json(); 
    if(result) {
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    }
 }

 const submit = async () => {

    if( !name || !price || !category || !company) {
        setError(true);
        return false
    }

    let result = await fetch("http://localhost:5000/product/" + useParam.id, {
        method: 'put',
        body: JSON.stringify({
            name , price, category, company
        }),
        headers: {
            "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }      
    })
    result = await result.json();
    if(result){
       navigate('/')
    }
    console.log(result)
 }

  return (
    <div className='product'>
    <h1>Update Product</h1>
    <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder='Enter Product Name' className='input-box'
    />
    { error && !name && <span className="input-valid">Please Enter Name</span>}
    <input type="text" value={price} onChange={(e) => {setPrice(e.target.value)}} placeholder='Enter Price' className='input-box'
    />
    { error && !price && <span className="input-valid">Please Enter Price</span>}
    <input type="text" value={category} onChange={(e) => {setCategory(e.target.value)}} placeholder='Enter Category' className='input-box'
    />
    { error && !category && <span className="input-valid">Please Enter Catrgory</span>}
    <input type="text" value={company} onChange={(e) => {setCompany(e.target.value)}} placeholder='Enter Company Name' className='input-box'
    />
    { error && !company && <span className="input-valid">Please Enter Company</span>}
    <button onClick={submit} className='sing-up-btn'>Update Product</button>
    </div>
  )
}

export default Update