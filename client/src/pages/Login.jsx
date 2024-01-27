import { Button, Form, Input } from 'antd';

export default function Login() {
    return (
    <>
        <div style={{
            height: '100%',
            background: 'url(../src/assets/landing-background-img.jpg) no-repeat center center fixed',
            backgroundSize: 'cover',
            filter: 'blur(5px)',
            zIndex: '0',
            width: '100%',
            position: 'absolute'
        }}>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
        }}>
        <Form name='login' autoComplete='off' labelCol={{span: 8}} wrapperCol={{span: 8}} 
        style={{padding: '0 1rem'}}>
                    <Form.Item label='Username: ' name='username'>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Password: ' name='password'>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form> 
        </div>
    </>
    )
}