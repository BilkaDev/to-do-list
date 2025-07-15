import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { SideBar } from './sideBar/SideBar.tsx';

export const DashboardLayout = () => {
  return (
    <Box className="flex min-h-screen bg-gray-200">
      <SideBar />
      <Box component="main" className={`flex grow pl-[60px] pt-[100px] md:pl-[150px]`}>
        <Outlet />
      </Box>
    </Box>
  );
};
