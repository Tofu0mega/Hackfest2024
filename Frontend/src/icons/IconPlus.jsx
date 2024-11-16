import * as React from "react";
const SvgIconPlus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={12}
    height={12}
    {...props}
  >
    <defs>
      <path
        id="icon-plus_svg__a"
        d="M12 7.023V4.977a.64.64 0 0 0-.643-.643h-3.69V.643A.64.64 0 0 0 7.022 0H4.977a.64.64 0 0 0-.643.643v3.69H.643A.64.64 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.64.64 0 0 0 .643-.643v-3.69h3.691A.64.64 0 0 0 12 7.022Z"
      />
    </defs>
    <use xlinkHref="#icon-plus_svg__a" fill="#FF7E1B" />
  </svg>
);
export default SvgIconPlus;
