import type { AppRoute } from '../../../AppRoute.ts';
import type { ReactNode } from 'react';

type AvailableCategory = 'To do';

type RouteKey = keyof typeof AppRoute;
type RouteValue = (typeof AppRoute)[RouteKey];
export type SideBarItem = {
  url: RouteValue;
  text: AvailableCategory;
  icon: ReactNode;
};
