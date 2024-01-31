import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth'
import { GET_ME } from '../utils/queries';
import { UPDATE_PASSWORD } from '../utils/mutation';
import { Avatar, Button, Modal, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { passwordValidator } from '../helpers/inputValidations'


export default function Profile() {
    const {loading, data} = useQuery(GET_ME);
    const [updatePassword, {error}] = useMutation(UPDATE_PASSWORD);
    const [messageAPI, contextHolder] = message.useMessage();
    let userData;
    const [editForm] = Form.useForm(); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        editForm.resetFields();
        setIsModalOpen(false);
    };
    const showEditModal = () => {
        setIsModalOpen(true);
    }
    const onFinish = async () => {
        let password = editForm.getFieldsValue(['password']);
        const newUser = await updatePassword({
            variables: password
        });
        if (newUser) {
            messageAPI.open({
                type: 'success',
                content: 'Update password successfully'
            })
            handleCancel();
        } 
    }

    if (Auth.loggedIn()) {
        if(loading) {
            return <h2>LOADING...</h2>
        } else {
            userData = data.me;
            return (
                <>
                    {contextHolder}
                    <h1>Profile</h1>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar icon={<UserOutlined/>} size={{ xs: 32, sm: 40, md: 64, lg: 80, xl: 100, xxl: 120}} style={{marginRight: '0.5rem'}}/>
                            <div>
                                <h3>{userData.username}</h3>
                                <p>{userData.email}</p>
                            </div>  
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <Button type='primary' onClick={() => showEditModal()}>Update Password</Button>
                            <Button className='ant-btn-dangerous' onClick={() => {Auth.logout()}}>Logout</Button>
                        </div>
                    </div>
                    <Modal centered title="Update User Password" open={isModalOpen} onOk={onFinish} onCancel={handleCancel} footer={null}>
                    <Form form={editForm} name='changePassword' autoComplete='off' labelCol={{span: 24}} initialValues={{username: userData.username}} onFinish={onFinish}>
                            <Form.Item label='Username: ' name='username' required rules={[{required: true, message: 'Please enter an username!'}]}>
                                <Input disabled/>
                            </Form.Item>
                            <Form.Item label='New Password: ' name='password' rules={[{validator: passwordValidator}]} required>
                                <Input.Password placeholder='********'/>
                            </Form.Item>
                            <Form.Item label='Confirm New Password: ' name='confirm' required dependencies={['password']} rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (value && getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}>
                                <Input.Password placeholder='********'/>
                            </Form.Item> 
                            <Form.Item style={{ textAlign: 'right' }}>
                            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>
                        </Form> 
                    </Modal>
                </>
                )
        }
    }
    else {
        window.location.assign('/');
    }
}