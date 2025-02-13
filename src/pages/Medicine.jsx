import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { createURL } from "./constant";
import { useNavigate } from "react-router-dom";
import AuthGuard from './AuthGuard';
 
export default function Medicine() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [expdate, setExpdate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [addUpdateFlag, setAddUpdateFlag] = useState(true);
  const nevigate=useNavigate();

 
  useEffect(() => {
    getData();
    getAllCategory();
  }, []);
 

  const getData = () => {
  

    const url=createURL('api/Products');
    axios
      .get(url)
      .then((result) => {
         console.log(result);
        if (result.status === 200) {
          console.log(result.data);
          setProduct(result.data);
          
        }
      })
      .catch((error) => {
        console.log("error"+error);
      });
 
  };
 
  const deleteMedicine = (e, id) => {
   
    e.preventDefault();
   
    const url = createURL(`api/Products/${id}`);
    axios
      .delete(url, data)
      .then((result) => {
        console.log(result);
        
        if (result.status === 200) {
          getData();
          alert("product deleted successfully");
        }
      })
      
  };
 
  const editMedicine = (e, id) => {
    e.preventDefault();
    setAddUpdateFlag(false);
 
    const url = createURL(`api/Products/${id}`);
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        console.log(data);
       
          setMedicineId(id);
          setName(data.productName);
          setDescription(data.productDescription);
          setUnitPrice(data.price);
          setStock(data.stock);
          setImageUrl(data.imageURL);
          const date = new Date(data.expiryDate);
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
         
         
          setExpdate(formattedDate);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };
 

 
  const getAllCategory = () => {
    const url = createURL('api/Categories');
    axios
      .get(url)
      .then((response) => {
        setCategory(response.data);
        console.log(response.data);
      })
  }
  const addProduct = () => {
    const data = {
      productName: name,
      productDescription: description,
      price: unitPrice,
      stock: stock,
      imageURL: imageUrl,
      expiryDate: expdate,
 
      categoryId: categoryId,
 
    };
    const url = createURL('api/Products');
    axios
      .post(url, data)
      .then((result) => {
 
        console.log(result);
        if (result.status === 200) {
          alert("Medicine added successfully!");
          getData();
          // Clear();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  // catch (ex) {
  //   console.log(ex);
  // }
 
 
  // const Clear = () => {
  //   setName("");
  //   setManufacturer("");
  //   setUnitPrice("");
  //   setDiscount("");
  //   setExpdate("");
  //   setFile("");
  //   setFileName("");
  //   setQuantity("");
  // };
 
  const updateMedicine = () => {
    
    
    const data = {
      productId:medicineId,
      productName: name,
      productDescription: description,
      price: unitPrice,
      stock: stock,
      imageURL: imageUrl,
      expiryDate: expdate,
 
      categoryId: categoryId,
    };
    const url = createURL(`api/Products/${medicineId}`);
    axios
      .put(url, data)
      .then((result) => {
        console.log(result);
        const dt = result.data;
        console.log(dt);
        if (result.status === 200) {
          alert("data updated successfully");
          getData();
          // Clear();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
 
  return (
    <Fragment>
      <AdminHeader />
      <br></br>
      <div>
        <div
          class="form-row"
          style={{ width: "80%", backgroundColor: "white", margin: " auto" }}
        >
          <div class="form-group col-md-12">
            <h3>Medicine Management</h3>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="form-control"
              required
              value={name}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="form-control"
              required
              value={description}
            />
          </div>
 
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="validationTextarea"
              placeholder="UnitPrice"
              onChange={(e) => setUnitPrice(e.target.value)}
              required
              value={unitPrice}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className="form-control"
              required
              value={stock}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="link"
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image Url"
              className="form-control"
              required
              value={imageUrl}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="date"
              onChange={(e) => setExpdate(e.target.value)}
              placeholder="Exp Date"
              className="form-control"
              value={expdate}
            />
          </div>
          <div className="form-group col-md-6">
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select a category</option>
          {category.map((cat, index) => (
            <option key={index} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>
         
          <div className="form-group col-md-6">
 
            {addUpdateFlag ? (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
                // onClick={(e) => uploadFile(e)}
                onClick={addProduct}
              >
                Add
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
               onClick={(e) => updateMedicine()}
              >
                Update
              </button>
            )}
            <button
              className="btn btn-danger"
              style={{ width: "150px" }}
            // onClick={(e) => Clear(e)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {product ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">UnitPrice</th>
              <th scope="col">Stock</th>
              <th scope="col">Image</th>
              <th scope="col">Exp Date</th>
             
              <th scope="col" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((val, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{val.productName}</td>
                  <td>{val.productDescription}</td>
                  <td>{val.price}</td>
                  <td>{val.stock}</td>
                  <td>
                    <img
                      src={val.imageURL}
                      style={{ width: "70px", borderRadius: "11px" }}
                    />
                   
                  </td>
                  <td>{val.expiryDate}</td>
                 
                  <td>
                    <button
                     onClick={(e) => editMedicine(e, val.productId)}
                    >
                      Edit
                    </button>{" "}
                  </td>
                  <td>
                    <button
                    onClick={(e) => deleteMedicine(e, val.productId)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
      <AuthGuard/>
    </Fragment>
  );
 
}