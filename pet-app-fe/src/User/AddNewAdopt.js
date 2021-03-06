import React, { useState } from 'react';
import { Form, Input, Button, Select, Layout } from 'antd';
import { useDispatch } from 'react-redux';
import FileBase64 from 'react-file-base64';
import TextArea from 'antd/lib/input/TextArea';
import { createAdopt } from '../actions/adopt';
import { Redirect } from 'react-router-dom';
import './AddNewAdopt.css';

const AddNewAdoption = () => {
	const [form] = Form.useForm();
	const { Content } = Layout;
	const [file, setFile] = useState(null);
	const { Option } = Select;
	const dispatch = useDispatch();
	const onFinish = (values) => {
		dispatch(createAdopt({ ...values, image: file }));
		<Redirect to="/adoption" />;
	};
	return (
		<Content className="site-layout">
			<div className="site-layout-background">
				<Form
					className="all-form"
					form={form}
					name="addadoption"
					onFinish={onFinish}
					scrollToFirstError
				>
					<Form.Item
						name="title"
						rules={[
							{
								required: true,
								message: 'Lütfen bir başlık giriniz',
							},
						]}
					>
						<Input id="title" name="title" placeholder="Başlık" autoComplete="off" />
					</Form.Item>
					<Form.Item name="content">
						<TextArea
							id="content"
							name="content"
							placeholder="Eklemek İstedikleriniz(İsteğe Bağlı)"
						/>
					</Form.Item>
					<Form.Item name="image">
						<FileBase64 name="image" multiple={false} onDone={({ base64 }) => setFile(base64)} />
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						<Form.Item
							name="species"
							rules={[{ required: true }]}
							label="Türü"
							style={{ display: 'inline-block', width: 'calc(12% - 8px)' }}
						>
							<Select id="species">
								<Option value="kedi">Kedi</Option>
								<Option value="köpek">Köpek</Option>
								<Option value="kuş">Kuş</Option>
								<Option value="kemirgen">Kemirgen</Option>
								<Option value="diğer">Diğer</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="gender"
							label="Cinsiyeti"
							rules={[{ required: true }]}
							style={{ display: 'inline-block', width: 'calc(12% - 8px)', margin: '0 8px' }}
						>
							<Select id="gender">
								<Option value="dişi">Dişi</Option>
								<Option value="erkek">Erkek</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="age"
							label="Yaşı"
							rules={[{ required: true }]}
							style={{ display: 'inline-block', width: 'calc(12% - 8px)', margin: '0 8px' }}
						>
							<Select id="age">
								<Option value="0-1">0-12 Aylık</Option>
								<Option value="1-7">1-7 Yaşında</Option>
								<Option value="8-12">8-12 Yaşında</Option>
								<Option value="12+">12 Yaş Üstü</Option>
							</Select>
						</Form.Item>
					</Form.Item>
					<Form.Item style={{ marginBottom: 0 }}>
						<Form.Item
							name="province"
							rules={[{ required: true }]}
							label="İl"
							style={{ display: 'inline-block', width: 'calc(12% - 8px)' }}
						>
							<Input id="province" name="province" />
						</Form.Item>
						<Form.Item
							name="town"
							label="İlçe"
							rules={[{ required: true }]}
							style={{ display: 'inline-block', width: 'calc(12% - 8px)', margin: '0 8px' }}
						>
							<Input id="town" name="town" />
						</Form.Item>
					</Form.Item>
					<Form.Item name="communication" rules={[{ required: true }]}>
						<Input
							id="communication"
							name="communication"
							placeholder="Email ya da Telefon Numarası Giriniz"
						/>
					</Form.Item>
					<Form.Item>
						<Button className="btn-onayla" type="primary" htmlType="submit">
							Onayla
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Content>
	);
};
export default AddNewAdoption;
