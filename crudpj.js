import React, { useState } from "react";
import logo1 from  '../../asserts/bmw.png'
import logo2 from  '../../asserts/mini copper.png'
import logo3 from  '../../asserts/polo.png'
import logo4 from  '../../asserts/mini copper.png'
import logo5 from  '../../asserts/mg.png'

const Crud=()=>{
    const[car,setCar]=useState([
        {id:1,image:logo1,brand:"MiniCooper",price:2000,qty:3},
        {id:2,image:logo2,brand:"BMW",price:3000,qty:5},
        {id:3,image:logo3,brand:"RangeRover",price:4000,qty:1},
        {id:4,image:logo4,brand:"Thar",price:5000,qty:2},
        {id:5,image:logo5,brand:"Polo",price:6000,qty:4}
    ])

    const incrQty=(insc)=>{
        setCar((toinsc)=>{
            return toinsc.map((e)=>{
                if(e.id===insc){
                    return{
                        ...e,
                        qty:e.qty+1
                    }
                }else{
                    return e
                }
            })
        })


    }

    const decrQty=(insc)=>{
        setCar((toinsc)=>{
            return toinsc.map((e)=>{
                if(e.id===insc){
                    return{
                        ...e,
                        qty:e.qty-1>0?e.qty-1:0
                    }
                }else{
                    return e
                }
            })
        })


    }

    const delData=(del)=>{
        setCar((todel)=>{
            return todel.filter(e=>e.id!==del)
        })

    }

    const[search,setSearch]=useState('')
    const filterCars=car.filter((e)=>e.brand.toLowerCase().includes(search.toLowerCase()))

    const calGrandTotal=()=>{
        let total=0
        for(let cars of filterCars){
            total+=(cars.qty*cars.price)
        }
        return total
    }

    const[newCar,setNewCar]=useState({
        brand:"",
        image:'',
        price:'',
        qty:''
    })
    const[formData,setFormData]=useState(false)

    const addCar=(e)=>{
        e.preventDefault()
        const newCardata={
            ...newCar,
            id:car.length+1,
            price:parseFloat(newCar.price),
            qty:parseInt(newCar.qty)
        }
        setCar([...car,newCardata])

    }

    const[edit,setEdit]=useState(false)

    const updateChanges=(e)=>{
        e.preventDefault()
        setCar(prevCars=>prevCars.map(car=>car.id===edit.id?edit:car))

    }

     
    return(
        <div className="container">
            <div className="row">
                <h1 className="text-success">Crud Application</h1>
            <input type="text" className="form-control w-25" placeholder="Search brand ..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className="row mt-4">
                <div className="col">
                <button className="btn btn-success " onClick={()=>setFormData(!formData)}>
                    {
                        formData ? 'Cancel':'Add'
                    }
                </button><br></br><br></br>
                {
                    formData&&(
                        <form className="w-25" onSubmit={addCar}>
                            <input type="text" placeholder="Brand" className="form form-control"
                            value={newCar.brand}
                            onChange={(e)=>setNewCar({...newCar,brand:e.target.value})}/><br></br><br></br>
                            <input type="text" placeholder="Image" className="form form-control"
                            value={newCar.image}
                            onChange={(e)=>setNewCar({...newCar,image:e.target.value})}/><br></br><br></br>
                            <input type="text" placeholder="Price" className="form form-control"
                            value={newCar.price}
                            onChange={(e)=>setNewCar({...newCar,price:e.target.value})}/><br></br><br></br>
                            <input type="text" placeholder="Qty" className="form form-control"
                            value={newCar.qty}
                            onChange={(e)=>setNewCar({...newCar,qty:e.target.value})}/><br></br><br></br>
                            <button  className="btn btn-primary">Submit</button>
                        </form>
                    )
                }
                {
                    edit&&(
                        <form className="w-25" onSubmit={updateChanges}>
                        <input type="text" placeholder="Brand" className="form form-control"
                        value={edit.brand}
                        onChange={(e)=>setEdit({...edit,brand:e.target.value})}/><br></br><br></br>
                        <input type="text" placeholder="Image" className="form form-control"
                        value={edit.image}
                        onChange={(e)=>setEdit({...edit,image:e.target.value})}/><br></br><br></br>
                        <input type="text" placeholder="Price" className="form form-control"
                        value={edit.price}
                        onChange={(e)=>setEdit({...edit,price:e.target.value})}/><br></br><br></br>
                        <input type="text" placeholder="Qty" className="form form-control"
                        value={edit.qty}
                        onChange={(e)=>setEdit({...edit,qty:e.target.value})}/><br></br><br></br>
                        <button  className="btn btn-primary">Submit</button>
                    </form>

                    )
                }

                </div>

            </div>
            <div className="row mt-4">
                <table className="table table-hover text-center table-striped">
                    <thead>
                        <tr>
                            <th>S:no</th>
                            <th>Brand</th>
                            <th>Image</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Delete</th>
                            <th>Edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterCars.map((Cars,index)=>{
                                return(
                                    <tr>
                                    <td>{Cars.id}</td>
                                    <td>{Cars.brand}</td>
                                    <td><img src={Cars.image} width={50} height={50} alt="#"/></td>
                                    <td>
                                    <i class="fa-solid fa-minus" onClick={()=>decrQty(Cars.id)}></i>
                                        {Cars.qty}
                                    <i class="fa-solid fa-plus" onClick={()=>incrQty(Cars.id)}></i>
                                    </td>
                                    <td>&#8377;{(Cars.price)}</td>
                                    <td>&#8377;{(Cars.qty*Cars.price).toFixed(2)}</td>
                                    <td className="text-danger"><i class="fa-solid fa-trash" onClick={()=>delData(Cars.id)}></i></td>
                                    <td><i class="fa-solid fa-pen-to-square" onClick={()=>setEdit(Cars)}></i></td>
                                    </tr>
                                )
                              

                            })
                        }
                        <tr>
                            <td colSpan={4}></td>
                            <td>GrandTotal</td>
                            <td>&#8377;{calGrandTotal().toFixed(2)}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Crud
