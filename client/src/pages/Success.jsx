import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

function Success() {
  useEffect(() => {
    async function redirect() {
      setTimeout(() => {
        window.location.assign('/profile');
      }, 3000);
    }
    redirect();
  }, []);

  return (
    <div
      style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
    >
        <div>
            <h1>Success!</h1>
            <h2>Thank you for your support!</h2>
            <h2>You will now be redirected to the home page</h2>
        </div>
    </div>
  );
}

export default Success;