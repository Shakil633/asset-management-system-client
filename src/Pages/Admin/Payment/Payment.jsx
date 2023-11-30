import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Component/Provider/AuthProvider";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const [paymentEmail, setPaymentEmail] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(paymentEmail);

  useEffect(() => {
    fetch(`https://asset-management-system-server-xi.vercel.app
/userProfile/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setPaymentEmail(data));
  }, [user?.email]);

  return (
    <div>
      <h1 className=" text-4xl text-center font-semibold py-5">Payment page</h1>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            handleClose={closeModal}
            packageInfo={paymentEmail?.selectedPackage}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
