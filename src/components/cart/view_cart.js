import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {formatMoney} from '../../helpers';
import './view_cart.scss';
import CartItem from './cart_row';

class Cart extends Component{
    state = {
        items:[],
        meta:{}
    }
    componentDidMount(){
        this.getCartData();
    }
    getCartData= async ()=>{
        const {data} = await axios.get('/api/getcartitems.php');
        console.log(data);
        if(data.success){
            this.setState({
                items:data.cartItems,
                meta:data.cartMetaData
            })
        }else {
            console.error('Cart data failed to load');
        }
    }
    render(){
        const {items,meta} = this.state;
        let totalItems=0;
        const cartItems=items.map((item)=>{
            const {quantity,id} = item;
            totalItems+=quantity
            return(
                <CartItem  key={id} {...item} deleteItemCallback={this.getCartData}/>
            )
        });
        return (
            <div className="row">
                <div className="cart col s12 m10 offset-m1">
                    {/* <h1 className="center">Shopping Cart</h1> */}
                    <Link to="/products"><i className="material-icons back-arrow green-text text-lighten-1">arrow_back</i></Link>
                    <div className="right-align total-items">Total Items In Cart: {totalItems}</div>
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems}
                            <tr>
                                <td colSpan="6" className="total-price">
                                Total:{formatMoney(meta.total)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        )
    }
}

export default Cart;