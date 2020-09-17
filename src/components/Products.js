import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: null,
		};
	}

	openModel = (product) => {
		this.setState({
			product,
		});
	};

	closeModal = () => {
		this.setState({ product: null });
	};

	render() {
		const { product } = this.state;
		return (
			<div>
				<Fade bottom cascade>
					<ul className="products">
						{this.props.products.map((product) => (
							<li key={product._id}>
								<div className="product">
									<a href="!#">
										<img
											src={product.image}
											alt={product.title}
											onClick={() => this.openModel(product)}
										></img>
										<p>{product.title}</p>
									</a>
									<div className="product-price">
										<div>{formatCurrency(product.price)}</div>
										<button
											className="button primary"
											onClick={() => this.props.addToCart(product)}
										>
											Add to Cart
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Fade>
				{product && (
					<Modal isOpen={true} onRequestClose={this.closeModal}>
						<Zoom>
							<button className="close-modal" onClick={this.closeModal}>
								x
							</button>
							<div className="product-details">
								<img src={product.image} alt={product.title}></img>
								<div className="product-details-description">
									<p>
										<strong>{product.description}</strong>
									</p>
									<p>
										Available Sizes:{' '}
										{product.availableSizes.map((size) => (
											<span>
												<button className="button">{size}</button>
											</span>
										))}
									</p>
									<p>
										<div className="product-price">
											<div>{formatCurrency(product.price)}</div>
											<button
												className="button primary"
												onClick={() => {
													this.props.addToCart(product);
													this.closeModal();
												}}
											>
												Add to Cart
											</button>
										</div>
									</p>
								</div>
							</div>
						</Zoom>
					</Modal>
				)}
			</div>
		);
	}
}
