import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "../core/Signin";
import Signup from "../core/Signup";
import UserDashboard from '../users/UserDashBoard';
import PrivateRoutes from '../auth/privateRoutes';
import DoctorDashboard from '../users/DoctorDashboard';
import UploadDoc from '../users/UploadDoc';
import Home from '../core/Home';
import Test from '../core/TestPage'
import {signout, isAuthenticated} from '../auth/index';
import DoctorDocuments from '../core/DoctorDocuments';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route> 
        <Route path="/doctor/doc" exact component={DoctorDocuments}></Route>
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}></PrivateRoutes>
        <PrivateRoutes path="/doctor/dashboard" exact component={DoctorDashboard}></PrivateRoutes>
        <PrivateRoutes path="/patient/dashboard" exact component={UploadDoc}></PrivateRoutes>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
