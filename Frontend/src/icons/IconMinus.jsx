import * as React from "react";
const SvgIconMinus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={12}
    height={4}
    {...props}
  >
    <defs>
      <path
        id="icon-minus_svg__a"
        d="M11.357 3.332A.64.64 0 0 0 12 2.69V.643A.64.64 0 0 0 11.357 0H.643A.64.64 0 0 0 0 .643v2.046c0 .357.287.643.643.643z"
      />
    </defs>
    <use xlinkHref="#icon-minus_svg__a" fill="#FF7E1B" />
  </svg>
);
export default SvgIconMinus;
