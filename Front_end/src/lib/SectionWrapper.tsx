import React from 'react';
import { Footer, Header } from "../component";


const StarWrapper = <P extends object>(Component: React.ComponentType<P>) => {
  const HOC: React.FC<P> = (props) => {
    return (
    <>
      <div className="relative z-10">
        <Header />
        <Component {...props}/>
      </div>
      <div className="relative z-0">
        <Footer />
      </div>
    </>
  );
};
return HOC;
};
export default StarWrapper;