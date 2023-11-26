import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HistoryAPI from '../API/HistoryAPI';
import convertMoney from '../convertMoney';
import { ThreeDots } from 'react-loader-spinner';

const EditOrder = () => {
	const { orderId } = useParams();
	const [order, setOrder] = useState({});
	const [load, setLoad] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const getDetail = async () => {
			const response = await HistoryAPI.getDetail(orderId);
			setOrder(response);
			setLoad(false);
		};
		getDetail();
	}, [orderId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			delivery: e.target.delivery.value,
			status: e.target.status.value,
		};

		await HistoryAPI.updateOrder(orderId, data);
		navigate('/orders');
	};

	return (
		<div className="page-wrapper d-block">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">Information Order</h3>
								{load ? (
									<ThreeDots
										height="80"
										width="80"
										radius="9"
										color="#4fa94d"
										ariaLabel="three-dots-loading"
										wrapperStyle={{}}
										wrapperClassName=""
										visible={true}
									/>
								) : (
									<>
										<div className="d-flex justify-content-around pt-2">
											<div>
												<p>ID User: {order.userId}</p>
												<p>Full Name: {order.fullName}</p>
												<p>Phone: {order.phone}</p>
												<p>Address: {order.address}</p>
												<p>Total: {convertMoney(order.total)} VND </p>
											</div>
											<form onSubmit={handleSubmit}>
												<div className="form-group">
													<label htmlFor="delivery">Delivery</label>
													<select id="delivery" className="form-control">
														<option value="Chờ xác nhận">Chờ xác nhận</option>
														<option value="Chưa vận chuyển">
															Chưa vận chuyển
														</option>
													</select>
												</div>
												<div className="form-group">
													<label htmlFor="status">Status</label>
													<select id="status" className="form-control">
														<option value="Chưa thanh toán">
															Chưa thanh toán
														</option>
														<option value="Đã thanh toán">Đã thanh toán</option>
													</select>
												</div>
												<button type="submit" className="btn btn-primary">
													Update
												</button>
											</form>
										</div>

										<div className="table-responsive  pb-5 pt-3">
											<table className="table">
												<thead className="bg-light">
													<tr className="text-center">
														<th className="border-0" scope="col">
															<strong className="text-small text-uppercase">
																ID Product
															</strong>
														</th>
														<th className="border-0" scope="col">
															<strong className="text-small text-uppercase">
																Image
															</strong>
														</th>
														<th className="border-0" scope="col">
															<strong className="text-small text-uppercase">
																Name
															</strong>
														</th>
														<th className="border-0" scope="col">
															<strong className="text-small text-uppercase">
																Price
															</strong>
														</th>
														<th className="border-0" scope="col">
															<strong className="text-small text-uppercase">
																Count
															</strong>
														</th>
													</tr>
												</thead>
												<tbody>
													{order.orders &&
														order.orders.items.map((value) => (
															<tr className="text-center" key={value.productId}>
																<td className="align-middle border-0">
																	<h6 className="mb-0">{value.productId}</h6>
																</td>
																<td className="pl-0 border-0">
																	<div className="media align-items-center justify-content-center">
																		<img
																			src={value.img}
																			alt="..."
																			width="200"
																		/>
																	</div>
																</td>
																<td className="align-middle border-0">
																	<h6 className="mb-0">{value.nameProduct}</h6>
																</td>
																<td className="align-middle border-0">
																	<h6 className="mb-0">
																		{convertMoney(value.priceProduct)} VND
																	</h6>
																</td>
																<td className="align-middle border-0">
																	<h6 className="mb-0">{value.quantity}</h6>
																</td>
															</tr>
														))}
												</tbody>
											</table>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	);
};

export default EditOrder;
