import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProductList() {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProduct(result)
    }

    const deleteProduct = async (id) => {
        console.log("checking", id)
        let result = await fetch("http://localhost:5000/products/" + id, {
            method: 'delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json();
        console.log(result)
        if (result) {
            alert("Result is Deleted Successfully..")
            getProduct();
        }
    }

    const onSearch = async (event) => {
        const key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProduct(result)
                console.log(result);
            }
        } else {
            getProduct();
        }
    }

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <input type="text" className='search-input' placeholder='Search items'
                onChange={(event) => onSearch(event)} />
            {
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !!products.length > 0 ? products.map((item, index) => (
                                <tr key={item.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>₹{item.price.toFixed(2)}</td>
                                    <td>{item.category}</td>
                                    <td><button className='delete-btn'
                                        onClick={() => deleteProduct(item._id)}
                                    >Delete</button>
                                        <Link className='update-btn' to={`/update/${item._id}`}>update</Link>
                                    </td>
                                </tr>
                            )) :
                                <tr>
                                    <td><h3>Product not found...</h3></td>
                                </tr>
                        }

                    </tbody>
                </table>
            }
        </div>
    )
}

export default ProductList