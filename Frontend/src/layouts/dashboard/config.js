import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";

import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Unloading",
    path: "/unloading",
    icon: (
      <SvgIcon fontSize="small">
        <svg viewBox="0 0 20 20" fill="currentColor" height="1em" width="1em">
          <path d="M0 2C0 .9.9 0 2 0h16a2 2 0 012 2v16a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm14 12h4V2H2v12h4c0 1.1.9 2 2 2h4a2 2 0 002-2zM9 8V5h2v3h3l-4 4-4-4h3z" />
        </svg>
      </SvgIcon>
    ),
  },
  {
    title: "loading",
    path: "/loading",
    icon: (
      <SvgIcon fontSize="small">
        <svg baseProfile="tiny" viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
          <path d="M20.987 16a.98.98 0 00-.039-.316l-2-6A.998.998 0 0018 9h-4v2h3.279l1.667 5H5.054l1.667-5H10V9H6a.998.998 0 00-.948.684l-2 6a.98.98 0 00-.039.316C3 16 3 21 3 21a1 1 0 001 1h16a1 1 0 001-1s0-5-.013-5zM16 7.904c.259 0 .518-.095.707-.283a1 1 0 000-1.414L12 1.5 7.293 6.207a1 1 0 000 1.414c.189.189.448.283.707.283s.518-.094.707-.283L11 5.328V12a1 1 0 002 0V5.328l2.293 2.293a.997.997 0 00.707.283z" />
        </svg>
      </SvgIcon>
    ),
  },
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Warehouse Lookup",
    path: "/warehouseLookup",
    icon: (
      <SvgIcon fontSize="small">
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
          <path d="M15.5 2C13 2 11 4 11 6.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.1 3.1 1.4-1.4-3.1-3.1c.4-.7.7-1.5.7-2.4C20 4 18 2 15.5 2M4 4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5l-2-2v7H4V6h5.03c.06-.7.23-1.35.47-2H4m11.5 0C16.9 4 18 5.1 18 6.5S16.9 9 15.5 9 13 7.9 13 6.5 14.1 4 15.5 4z" />
        </svg>
      </SvgIcon>
    ),
  },
  {
    title: "Materials",
    path: "/materials",
    icon: (
      <SvgIcon fontSize="small">
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
          <path d="M11.51 0C8.338 0 5.034.537 2.694 2.694.5 5.174 0 8.464 0 11.525v.942c0 3.165.537 6.499 2.694 8.84C5.188 23.513 8.494 24 11.569 24h.854c3.18 0 6.528-.53 8.883-2.694C23.514 18.811 24 15.5 24 12.423v-.853c0-3.18-.53-6.528-2.694-8.876C18.826.494 15.544 0 12.482 0zM12 3.505c1.244 0 2.256.99 2.256 2.206 0 1.065-.685 1.976-1.715 2.181v1.59c1.48.214 2.528 1.43 2.528 2.934 0 1.654-1.377 3-3.07 3-1.692 0-3.068-1.346-3.068-3 0-.17.017-.335.045-.497l-1.536-.488a2.258 2.258 0 01-1.962 1.12c-.237 0-.471-.037-.698-.11-1.183-.375-1.833-1.622-1.449-2.78a2.246 2.246 0 012.146-1.524c.237 0 .471.036.698.108a2.23 2.23 0 011.313 1.098c.204.391.282.823.232 1.249l1.535.488c.44-.86 1.378-1.453 2.384-1.599V7.892c-1.029-.205-1.896-1.116-1.896-2.181 0-1.217 1.012-2.206 2.257-2.206zm0 .882c-.747 0-1.354.594-1.354 1.324 0 .73.607 1.324 1.354 1.324.746 0 1.354-.594 1.354-1.324 0-.73-.608-1.324-1.354-1.324zm6.522 3.75c.98 0 1.843.613 2.146 1.525a2.15 2.15 0 01-.135 1.683 2.22 2.22 0 01-1.314 1.096c-.227.073-.461.11-.698.11a2.258 2.258 0 01-1.962-1.12l-.634.201-.278-.838.632-.202a2.21 2.21 0 011.546-2.347 2.29 2.29 0 01.697-.108zM5.476 9.02c-.588 0-1.105.368-1.287.915a1.32 1.32 0 00.869 1.668c.136.043.277.065.419.065.588 0 1.105-.368 1.287-.915a1.29 1.29 0 00-.081-1.01 1.338 1.338 0 00-.788-.658 1.377 1.377 0 00-.42-.065zm13.045 0c-.142 0-.282.021-.419.065a1.32 1.32 0 00-.869 1.668c.182.547.7.915 1.287.915a1.4 1.4 0 00.42-.065c.344-.11.623-.343.787-.659.165-.315.193-.673.082-1.009a1.348 1.348 0 00-1.288-.915zM12 10.474c-1.095 0-1.986.871-1.986 1.942 0 1.07.89 1.941 1.986 1.941 1.094 0 1.985-.87 1.985-1.94 0-1.072-.89-1.943-1.985-1.943zm-2.706 4.831l.73.519-.39.526c.709.757.801 1.925.16 2.787a2.28 2.28 0 01-1.827.91c-.478 0-.937-.147-1.325-.422a2.177 2.177 0 01-.499-3.082 2.28 2.28 0 012.76-.71zm5.41 0l.392.528a2.285 2.285 0 012.76.71 2.178 2.178 0 01-.499 3.082 2.275 2.275 0 01-1.325.421 2.28 2.28 0 01-1.827-.91 2.172 2.172 0 01.16-2.785l-.39-.527zm-6.734 1.21a1.37 1.37 0 00-1.097.547c-.44.59-.304 1.42.3 1.849a1.37 1.37 0 001.891-.293c.44-.59.305-1.42-.3-1.85a1.364 1.364 0 00-.794-.252zm8.059 0c-.287 0-.561.088-.795.254a1.307 1.307 0 00-.299 1.849 1.371 1.371 0 001.891.293 1.307 1.307 0 00.3-1.85 1.37 1.37 0 00-1.097-.545z" />
        </svg>
      </SvgIcon>
    ),
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: (
      <SvgIcon fontSize="small">
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
          <path d="M17 6h-1V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H7c-3.31 0-6 2.69-6 6s2.69 6 6 6v3h2v-3h6v3h2v-3c3.31 0 6-2.69 6-6s-2.69-6-6-6m-7-1h4v1h-4V5m7 11H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4z" />
        </svg>
      </SvgIcon>
    ),
  },
  {
    title: "Location Details",
    path: "/location",
    icon: (
      <SvgIcon fontSize="small">
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
          <path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z" />
        </svg>
      </SvgIcon>
    ),
  },
  {
    title: "Companies",
    path: "/companies",
    icon: (
      <SvgIcon fontSize="small">
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
          <path d="M32 32C14.3 32 0 46.3 0 64v368c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V152.2c0-18.2-19.4-29.7-35.4-21.1L320 215.4v-63.2c0-18.2-19.4-29.7-35.4-21.1L128 215.4V64c0-17.7-14.3-32-32-32H32z" />
        </svg>
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Reports",
    path: "/reports",
    icon: (
      <SvgIcon fontSize="small">
        <svg baseProfile="tiny" viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
          <path d="M20.987 16a.98.98 0 00-.039-.316l-2-6A.998.998 0 0018 9h-4v2h3.279l1.667 5H5.054l1.667-5H10V9H6a.998.998 0 00-.948.684l-2 6a.98.98 0 00-.039.316C3 16 3 21 3 21a1 1 0 001 1h16a1 1 0 001-1s0-5-.013-5zM16 7.904c.259 0 .518-.095.707-.283a1 1 0 000-1.414L12 1.5 7.293 6.207a1 1 0 000 1.414c.189.189.448.283.707.283s.518-.094.707-.283L11 5.328V12a1 1 0 002 0V5.328l2.293 2.293a.997.997 0 00.707.283z" />
        </svg>
      </SvgIcon>
    ),
  },
];
