import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type AppRoutes = {
  url:string;
  icon:string;
  key:string;
  name:string;
  active:boolean
}

export const appRoutes:AppRoutes[] = [
  {
    active:true,
    icon:'/images/dashboard.svg',
    key:'dashboard',
    url:'/dashboard',
    name:'Dashboard',
  },
  {
    active:true,
    icon:'/images/users.svg',
    key:'users',
    url:'/users',
    name:'Users',
  },
  {
    active:false,
    icon:'/images/matches.svg',
    key:'matches',
    url:'/matches',
    name:'Matches',
  },
] 

export const sideBarPaths = {
  DASHBOARD: "/dashboard",
  USERS: "/users",
}