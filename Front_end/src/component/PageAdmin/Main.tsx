import { lazy, Suspense } from 'react';
import { SectionWrapper, ActiveSection, ScrollTop } from '../../lib';


const PersonalInformation = lazy(() => import('./personalInformation/PersonalInformation'));
const Orders = lazy(() => import('./orders/Orders'));
const Category = lazy(() => import('./category/Category'));
const Products = lazy(() => import('./products/Products'));
const Users = lazy(() => import('./users/Users'));
const Admins = lazy(() => import('./users/Admins'));
const Sellers = lazy(() => import('./users/Sellers'));




const MainAdmin = ({ activeSection }) => {
  let ActiveComponent;

  switch (activeSection) {
    case 'personalInformation':
      ActiveComponent = PersonalInformation;
      break;
    case 'orders':
      ActiveComponent = Orders;
      break;
    case 'category':
      ActiveComponent = Category;
      break;
    case 'products':
      ActiveComponent = Products;
      break;
    case 'users':
      ActiveComponent = () => <div>Select a sub-section</div>;
      break;
    case 'usersTable':
      ActiveComponent = Users;
      break;
    case 'adminsTable':
      ActiveComponent = Admins;
      break;
    case 'sellersTable':
      ActiveComponent = Sellers;
      break;
    default:
      ActiveComponent = () => <div>Section not found</div>;
  }

  return (
    <div className='p-4 bg-gray-200 h-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <ActiveComponent />
        <ScrollTop />
      </Suspense>
    </div>
  );
};
const Main = SectionWrapper(ActiveSection(MainAdmin));

export default Main;
