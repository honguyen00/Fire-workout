import { Button, Form, Input } from 'antd';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutation';
import { passwordValidator, emailValidator } from '../helpers/inputValidations'

const Login = () => {
    const [loginForm] = Form.useForm();
    const [signupForm] = Form.useForm();

    const [login, { error1, data1 }] = useMutation(LOGIN_USER);
    const [addUser, { error2, data2 }] = useMutation(ADD_USER);

    if(!Auth.loggedIn()) {
    
    // event handler for submit button click
    const onFinish = async (values) => {
        if (Object.keys(values).length === 2) {
            try {
                const { data } = await login({
                    variables: {...values}
                });
                Auth.login(data.login.token)
            } catch(err) {
                loginForm.setFields([{name: 'password', errors: ['Unable to login, please check all your credentials!']}, {name: 'email', errors: ['']}]);
            } 
        } else {
            try {
                const { data } = await addUser({
                    variables: {username: values.username, email: values.email, password: values.password}
                })
                Auth.login(data.addUser.token)
            } catch(err) {
                signupForm.setFields([{name: 'confirm', errors: [`Unable to sign up, please try again!`]}, 
                {name: 'email', errors: ['']},
                {name: 'username', errors: ['']},
                {name: 'password', errors: ['']}]);
            }
        }
    }

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
            textAlign: 'center'
        }}>
        <Form onFinish={onFinish} form={loginForm} id='login-form' name='login' autoComplete='off' labelCol={{span: 8}} wrapperCol={{span: 8}} 
        style={{padding: '0 1rem'}}>
                    <Form.Item wrapperCol={{span: 24}}><h2>Sign In</h2></Form.Item>
                    <Form.Item label='Email: ' name='email' required rules={[{validator: emailValidator}]}>
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
        <Form onFinish={onFinish} form={signupForm} id='signup-form' name='signup' autoComplete='off' labelCol={{span: 8}} wrapperCol={{span: 8}} 
        style={{padding: '0 1rem'}} className='hidden'>
                    <Form.Item wrapperCol={{span: 24}}><h2>Sign Up</h2></Form.Item>
                    <Form.Item label='Username: ' name='username' required rules={[{required: true, message: 'Please enter an username!'}]}>
                        <Input placeholder='Enter you username' />
                    </Form.Item>
                    
                    <Form.Item label='Email: ' name='email' rules={[{validator: emailValidator}]} required>
                        <Input placeholder='Enter you email' />
                    </Form.Item>

                    <Form.Item label='Password: ' name='password' rules={[{validator: passwordValidator}]} required>
                        <Input.Password placeholder='********'/>
                    </Form.Item>

                    <Form.Item label='Confirm Password: ' name='confirm' required dependencies={['password']} rules={[
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
    else {
        window.location.assign('/profile');
    }
}

export default Login;