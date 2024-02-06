import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import Auth from '../utils/auth';
import { Button, Typography } from 'antd';
const { Text } = Typography;

const stripePromise = loadStripe('pk_test_51OgfiuDnxOGikg97u5ON3BJeUwiYORhaNiW5hpGFCsbV6usUVkFEDDAJ3YyuDH3Tph4AOE7SiQVJw0Z8ufkpO2TD00XQvFLr2l');


export default function Support() {
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    function submitCheckout() {
        getCheckout();
    }

    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);
    if(Auth.loggedIn()) {
        return (
            <>
            <h1>Support Us</h1>
            <div>
            <Text>Support our workout tracker with a simple click!</Text>
            <br/>
            <Text>Your contribution helps us continue providing great features to our application.</Text>
            <br/>
            <br/>
            <Button type='primary' onClick={() => submitCheckout()}>Make A Donation</Button>
            </div>
            </>
        )
    } else {
        window.location.assign('/')
    }
}