import { Button, Form, Input } from 'antd';

const passwordValidator = async (_, value) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (value && value.match(pattern)) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Please enter a valid password!'))
}

const emailValidator = async (_, value) => {
    const pattern = /.+@[^@]+\.[^@]{2,}$/
    if (value && value.match(pattern)) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Please enter a valid email!'))
}

export default function Login() {
    const [loginForm] = Form.useForm();
    const [signupForm] = Form.useForm();

    return (
    <>
        <div style={{
            height: '100%',
            background: 'url(../src/assets/landing-background-img.jpg) no-repeat center center fixed',
            backgroundSize: 'cover',
            filter: 'blur(10px)',
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
        <Form form={loginForm} id='login-form' name='login' autoComplete='off' labelCol={{span: 8}} wrapperCol={{span: 8}} 
        style={{padding: '0 1rem'}}>
                    <Form.Item wrapperCol={{span: 24}}><h2>Sign In</h2></Form.Item>
                    <Form.Item label='Email: ' name='email' rules={[{validator: emailValidator}]}>
                        <Input placeholder='Enter you email' />
                    </Form.Item>

                    <Form.Item label='Password: ' name='password' required rules={[{validator: passwordValidator}]}>
                        <Input.Password placeholder='********'/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit" >
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        
                    <a onClick={() => {
                        document.getElementById('login-form').classList.add('hidden');
                        document.getElementById('signup-form').classList.remove('hidden');
                        loginForm.resetFields();
                    }}>Create a new account</a>
                    </Form.Item>
                    
        </Form> 
        <Form form={signupForm} id='signup-form' name='signup' autoComplete='off' labelCol={{span: 8}} wrapperCol={{span: 8}} 
        style={{padding: '0 1rem'}} className='hidden'>
                    <Form.Item wrapperCol={{span: 24}}><h2>Sign Up</h2></Form.Item>
                    <Form.Item label='Username: ' name='username' rules={[{required: true, message: 'Please enter an username!'}]}>
                        <Input placeholder='Enter you username' />
                    </Form.Item>
                    
                    <Form.Item label='Email: ' name='email' rules={[{validator: emailValidator}]}>
                        <Input placeholder='Enter you email' />
                    </Form.Item>

                    <Form.Item label='Password: ' name='password' rules={[{validator: passwordValidator}]}>
                        <Input.Password placeholder='********'/>
                    </Form.Item>

                    <Form.Item label='Confirm Password: ' name='confirm' dependencies={['password']} rules={[
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

                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign up
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <a onClick={() => {
                        document.getElementById('login-form').classList.remove('hidden');
                        document.getElementById('signup-form').classList.add('hidden');
                        signupForm.resetFields();
                    }}>Have an account? Back to sign in</a>
                    </Form.Item>
        </Form> 
        </div>
    </>
    )
}