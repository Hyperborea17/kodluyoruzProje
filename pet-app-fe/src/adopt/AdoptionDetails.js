import { useEffect, Fragment, useState } from 'react';
import moment from 'moment';
import {
	DeleteTwoTone,
	EditTwoTone,
	PhoneOutlined,
	MailOutlined,
	ExclamationCircleOutlined,
	EnvironmentOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../helpers/auth';
import { fetchSingleAdopt, deleteAdopt } from '../actions/adopt';
import { Typography, Divider, Button, Modal, Layout } from 'antd';
import EditAdoptForm from './EditAdoptForm';
import './AdoptionDetails.css';
const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;
const PostDetails = ({ history, match }) => {
	const { id } = match.params;
	const currentAdopt = useSelector((state) => state.adopts.currentAdopts);
	const [editMode, setEditMode] = useState(false);
	const { Content, Footer } = Layout;
	const openEditMode = () => {
		setEditMode(true);
	};
	const closeEditMode = () => {
		setEditMode(false);
	};
	const convertRelativeTime = (date) => {
		return moment(date).fromNow();
	};
	function info() {
		Modal.info({
			title: 'Ulaşım Bilgileri',
			content: (
				<div>
					<p>{currentAdopt?.communication}</p>
				</div>
			),
			onOk() {},
		});
	}
	function showConfirm() {
		confirm({
			title: 'Bu makaleyi silmek istediğinizden emin misiniz?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Evet',
			cancelText: 'İptal',
			onOk() {
				dispatch(deleteAdopt(currentAdopt?._id));
				history.push('/adoption');
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSingleAdopt(id));
	}, [id, dispatch]);

	return (
		<div>
			<Content className="site-layout">
				<div className="site-layout-background">
					<Typography>
						{editMode ? (
							<EditAdoptForm adopt={currentAdopt} closeEditMode={closeEditMode} />
						) : (
							<div>
								{isAuthenticated() && (
									<Fragment>
										<div className="btns">
											<Button
												type="link"
												style={{
													float: 'right',
													fontSize: '20px',
													borderBlockColor: 'white',
													color: 'white',
												}}
												onClick={showConfirm}
											>
												<DeleteTwoTone twoToneColor="#ee99a0" />
												<Text type="secondary">Sil</Text>
											</Button>
											<Button
												type="link"
												onClick={openEditMode}
												style={{
													float: 'right',
													fontSize: '20px',
													borderBlockColor: 'white',
													color: 'white',
												}}
											>
												<EditTwoTone twoToneColor="#ee99a0" />
												<Text type="secondary">Düzenle</Text>
											</Button>
										</div>
									</Fragment>
								)}
								<Text>{convertRelativeTime(currentAdopt?.createdAt)}</Text>
								<Text style={{ marginLeft: '100px', fontSize: '30px' }} strong>
									{currentAdopt?.title}
								</Text>
								<Divider />
								<div className="adopt-body">
									<img className="adopt-img" src={currentAdopt?.image} />
								</div>
								<Divider type="vertical">
									<br />
									<div className="adopt-body2">
										<Paragraph style={{ marginLeft: '00px', marginTop: '10px' }}>
											{currentAdopt?.content}
										</Paragraph>
										<br />
										<Text style={{ marginLeft: '00px', marginTop: '10px' }}>
											<EnvironmentOutlined />
											{currentAdopt?.town}/{currentAdopt?.province}
										</Text>
										<br />
										<Text style={{ marginLeft: '00px', marginTop: '10px' }}>
											<strong>Cinsiyeti: </strong>
											{currentAdopt?.gender}
										</Text>
										<br />
										<Text style={{ marginLeft: '00px', marginTop: '10px' }}>
											<strong>Yaşı: </strong>
											{currentAdopt?.age}
										</Text>
										<br />
										<Text style={{ marginLeft: '00px', marginTop: '10px' }}>
											<strong>Türü: </strong>
											{currentAdopt?.species}
										</Text>

										<br />
										<Button className="btn_ulas" type="primary" size="large" onClick={info}>
											Ulaşın
										</Button>
									</div>
								</Divider>
							</div>
						)}
					</Typography>
				</div>
			</Content>
			<Divider />
			<Footer className="site-footer">Petstagram ©2020 Created by IN</Footer>
		</div>
	);
};
export default PostDetails;
