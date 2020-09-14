import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';

export default class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			address: '',
			showCheckout: false,
		};
	}

	handleInput = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	createOrder = (event) => {
		event.preventDefault();
		const order = {
			name: this.state.name,
			email: this.state.email,
			address: this.state.address,
			cartItems: this.state.cartItems,
		};
		this.props.createOrder(order);
	};

	render() {
		const { cartItems } = this.props;
		return (
			<div>
				{cartItems.length === 0 ? (
					<div className="cart cart-header">Cart is Empty</div>
				) : (
					<div className="cart cart-header">
						You have {cartItems.length} items in your cart{' '}
					</div>
				)}

				<div className="cart">
					<Fade right cascade>
						<ul className="cart-items">
							{cartItems.map((item) => (
								<li key={item._id}>
									<div>
										<img src={item.image} alt={item.title}></img>
									</div>
									<div>
										<div>{item.title}</div>
										<div className="right">
											{formatCurrency(item.price)} x {item.count}{' '}
											<button onClick={() => this.props.removeFromCart(item)}>
												Remove
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</Fade>
				</div>

				{cartItems.length !== 0 && (
					<div>
						<div className="cart">
							<div className="total">
								<div>
									Total:{' '}
									{formatCurrency(
										cartItems.reduce((a, c) => a + c.price * c.count, 0),
									)}
								</div>
								<button
									className="button primary"
									onClick={() => this.setState({ showCheckout: true })}
								>
									Proceed
								</button>
							</div>
						</div>

						{this.state.showCheckout && (
							<Fade bottom cascade>
								<div className="cart">
									<form onSubmit={this.createOrder}>
										<ul className="form-container">
											<li>
												<label>Email</label>
												<input
													name="email"
													type="email"
													required
													onChange={this.handleInput}
												></input>
											</li>
											<li>
												<label>Name</label>
												<input
													name="name"
													type="text"
													required
													onChange={this.handleInput}
												></input>
											</li>
											<li>
												<label>Address</label>
												<input
													name="address"
													type="text"
													required
													onChange={this.handleInput}
												></input>
											</li>
											<li>
												<button className="button primary">Checkout</button>
											</li>
										</ul>
									</form>
								</div>
							</Fade>
						)}
					</div>
				)}
			</div>
		);
	}
}
