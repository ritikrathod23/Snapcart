import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import MyFooter from './Footer';

export function WithSidebar({ children }) {
  return (
    <div className="flex">
      <div className="hidden md:block w-64 ">
        <Sidebar />
      </div>
      <div className="flex-1">
       <Outlet/>
       <MyFooter/>
      </div>
    </div>
  );
}