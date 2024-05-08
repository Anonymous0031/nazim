import React, {useState,Fragment,useEffect} from  'react';
import { Link, useNavigate } from "react-router-dom";
import { Footer } from '../components';
import AuthGuard from './AuthGuard';
import CheckUser from './CheckUser';
 
export  default function AdminHeader(){    
    const [username, setUserName] = useState("");
    const nevigate=useNavigate();
    const token=sessionStorage['token'];
 
    useEffect(() => {
      setUserName(localStorage.getItem("username"));
    }, []);
    if(!token){
      nevigate("/Login");
      alert("please login")
      return ;
    }
    else
    {
      var role= CheckUser(token);
      if(role!="Admin")
      {
        nevigate("/PageNotFound");
        return 
      }
    }
 
    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "/";
    };
 
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Pharmacy ( Admin Panel)
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
 
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Welcome <span className="sr-only">(current)</span>
                  {username}
                </a>
              </li>
              <li className="nav-item">
                <Link to="/Medicine" className="nav-link">
                  Product Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ListCustomers" className="nav-link">
                  Customer Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AdminOrders" className="nav-link">
                  Order Management
                </Link>
              </li>              
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={(e) => logout(e)}
              >
              GoBack
              </button>
            </form>
          </div>
        </nav>
       <AuthGuard/>
      </Fragment>
    );
}