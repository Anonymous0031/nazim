import React, { Fragment,useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link,useNavigate} from 'react-router-dom';
import { createURL } from '../constant';
import axios from "axios";


export default function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[confirmpassword,setConfirmPassword]=useState("");
    const[address,setAddress]=useState("");
    const navigate=useNavigate();
    
    const handleSave = (e) => {
  
      let error = '';
      if(firstName === '')
      error = error + 'FirstName ,';  
      if(lastname === '')
      error = error + 'Lastname ,';   
      if(email === '')
      error = error + 'Email ,';
      if(password === '')
      error = error + 'Password ,';
      
      if(error.length > 0)
      {
        error = error.substring(0, error.length-1) + 'can not be blank';
        alert(error);
        return;
      }
  
      e.preventDefault();
      const url = createURL('user');
      const data = {
        FirstName: firstName,
        LastName:lastname,     
        Email: email,
        Password: password,
        ConfirmPassword:confirmpassword,
        Address:address
        
      };
  
     
      axios
        .post(url, data)
        .then((response) => {
          const result=response.data;
          console.log(data);
          if(result){
              alert("register successfully");
              navigate("/Product");
          }else{
              alert('error while uploading')
          }
        });
        // .catch((error) => {
        //   console.log("error");
        // });
    };
  
    const clear = () => {
      setFirstName("");
      setLastName("");
     
    };
  
    return (
        <Fragment>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <div>
                            <div className="form my-3">
                                <label htmlFor="First Name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="First Name"
                                    onChange={(e)=> setFirstName(e.target.value)}
                                    value={firstName}
                                    placeholder="Enter Your First Name"
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Last Name">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Last Name"
                                    onChange={(e)=> setLastName(e.target.value)}
                                    value={lastname}
                                    placeholder="Enter Your Last Name"
                                />
                            </div>
                        
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={(e)=> setEmail(e.target.value)}
                                    id="Email"
                                    value={email}
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    value={password}
                                    id="Password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="Confirm Password">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(e)=> setConfirmPassword(e.target.value)}
                                    id="CPassword"
                                    value={confirmpassword}
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div className="form  my-3">
                                <label htmlFor="Address">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Address"
                                    value={address}
                                    onChange={(e)=> setAddress(e.target.value)}
                                    placeholder="Please Enter the Address"
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit"  onClick={(e)=> handleSave(e)} >
                                    Register
                                </button>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
    }

