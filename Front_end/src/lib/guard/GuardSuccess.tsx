import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


interface GuardedRouteProps {
    isPaymentComplete: boolean;
    redirectTo: string;
}

const GuardSuccess: React.FC<GuardedRouteProps> = ({ isPaymentComplete, redirectTo }) => {
    const paymentStatus = sessionStorage.getItem('paymentStatus'); 
  
    return (isPaymentComplete || paymentStatus === 'success' || paymentStatus === 'failed') 
      ? <Outlet />
      : <Navigate to={redirectTo} />;
  };


export default GuardSuccess;