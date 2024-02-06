import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth'
import { GET_ME } from '../utils/queries';
import { UPDATE_PASSWORD } from '../utils/mutation';
import { Avatar, Button, Modal, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { passwordValidator } from '../helpers/inputValidations'
import { Bar } from 'react-chartjs-2'
import { GET_DATE } from '../utils/queries.js'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import moment from 'moment';

export default function Profile() {
    const {loading: loadingMe, data: dataMe} = useQuery(GET_ME);
    const [updatePassword, {error}] = useMutation(UPDATE_PASSWORD);
    const [messageAPI, contextHolder] = message.useMessage();
    let userData;
    let dateData;
    const [editForm] = Form.useForm(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {loading: loadingDate, data: dataDate} = useQuery(GET_DATE);
    let chartData;
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
                content: 'Update password successfully!'
            })
            handleCancel();
        } 
    }

    // Function to get the ISO week number of a date
    const getWeekNumber = (d) => {
        const date = new Date(d);
        date.setUTCHours(0, 0, 0, 0);
        date.setDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        const weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
        return weekNumber;
    };

    if (Auth.loggedIn()) {
        if(loadingDate || loadingMe) {
            return <h2>LOADING...</h2>
        } else {
            userData = dataMe.me;
            console.log(dataDate);
            dateData = [...dataDate.getWorkoutDate].reverse();
            
            const endDate = moment(); // Current date
            const startDate = moment(endDate).subtract(30, 'day'); // One month ago
           
            const weeksData = {};

            const allWeeks = [];
            let currentWeekStart = moment(startDate).startOf('week');

            while (currentWeekStart.isBefore(endDate)) {
                const weekStart = moment(currentWeekStart);
                const weekEnd = moment(currentWeekStart).endOf('week');

                const weekKey = `${weekStart.format('D/M')} - ${weekEnd.format('D/M')}`;
                allWeeks.push(weekKey);
                currentWeekStart.add(1, 'week');
            }

            dateData.forEach((date) => {
                const workoutDate = moment(date, 'dddd, MMMM D, YYYY [at] h:mm A');
                if (workoutDate.isBetween(startDate, endDate, null, '[]')) {
                const weekStart = moment(workoutDate).startOf('week');
                const weekEnd = moment(workoutDate).endOf('week');

                const weekKey = `${weekStart.format('D/M')} - ${weekEnd.format('D/M')}`;

                if (!weeksData[weekKey]) {
                    weeksData[weekKey] = 1;
                } else {
                    weeksData[weekKey] += 1;
                }
                }
            });

            //Initialize counts for weeks without workouts
            allWeeks.forEach((weekKey) => {
                if (!weeksData[weekKey]) {
                weeksData[weekKey] = 0;
                }
            });

            //Sort the keys using a custom sorting function
            const sortedWeeks = allWeeks.sort((a, b) => {
                const startDateA = moment(a.split('-')[0].trim(), 'DD M');
                const startDateB = moment(b.split('-')[0].trim(), 'DD M');
            
                if (startDateA.isSame(startDateB, 'month')) {
                return startDateA.date() - startDateB.date();
                }
            
                return startDateA.isBefore(startDateB) ? -1 : 1;
            });

            const newchartData = {
                labels: sortedWeeks,
                datasets: [
                {
                    label: 'Number of workouts',
                    data: sortedWeeks.map(weekKey => weeksData[weekKey]),
                    backgroundColor: '#009090', // Customize the bar color
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                ],
            };

            const options = {
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 50,
                    }
                  },
                  title: {
                    display: false,
                    text: 'Workouts per Week',
                  },
                },
                scales: {
                    x: {
                        offset: true,
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)', // Set color for X-axis grid lines
                        },
                    },
                    y: {
                        ticks: {
                            precision: 0,
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.7)', // Set color for X-axis grid lines
                        },
                    }
                },
              };

            chartData = newchartData;
  
            return (
                <>
                    {contextHolder}
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <h1>Profile</h1>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem'}}>
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
                    <div style={{display: 'flex', height: '400px', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Bar data={chartData} options={options} style={{width: '100%'}}/>
                    </div>
                    </div>
                    {/* Pop up modal */}
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