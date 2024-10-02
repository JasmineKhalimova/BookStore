import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import Menu from './core/Menu';
import Dashboard from './user/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import Category from './admin/Category';
import Product from './admin/Product';
 
const Routes = () => {
    return (
        <BrowserRouter>
        <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={Category} />
                <AdminRoute path="/create/product" exact component={Product} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
