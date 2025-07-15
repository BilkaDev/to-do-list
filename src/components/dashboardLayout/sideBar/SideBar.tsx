import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

import { AppRoute } from '../../../AppRoute.ts';
import type { SideBarItem } from './SideBar.types.ts';

const sideBarItems: SideBarItem[] = [
  { text: 'To do', url: AppRoute.toDoList, icon: <Assignment /> }
];
export const SideBar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List className={`w-[60px] md:w-[150px]`}>
        {sideBarItems.map((item) => (
          <ListItem key={item.url} disablePadding>
            <ListItemButton component={NavLink} to={item.url}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
