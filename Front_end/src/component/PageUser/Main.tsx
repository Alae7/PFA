import { lazy, Suspense } from 'react';
import { SectionWrapper, ActiveSection, ScrollTop } from '../../lib';


const PersonalInformation = lazy(() => import('./personalInformation/PersonalInformation'));
const Orders = lazy(() => import('./orders/Orders'));
const Purchases = lazy(() => import('./purchases/Purchases'));


const Main = ({ activeSection }) => {


  let ActiveComponent;

  switch (activeSection) {
    case 'personalInformation':
      ActiveComponent = PersonalInformation;
      break;
    case 'myOrders':
      ActiveComponent = Orders;
      break;
    case 'purchases':
      ActiveComponent = Purchases;
      break;
    default:
      ActiveComponent = () => <div>Section not found</div>;
  }

  return (
    <div className='p-4 bg-gray-200 h-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <ActiveComponent  />
        <ScrollTop />
      </Suspense>
    </div>
  );
};
const WrappedMain = SectionWrapper(ActiveSection(Main));

export default WrappedMain;