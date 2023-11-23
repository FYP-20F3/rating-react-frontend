import { SvgIcon } from "@mui/material";

const Logo = () => {
  return (
    <SvgIcon
      viewBox="0 0 62 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      sx={{ fontSize: "43px"}}
    >
      <rect width="62" height="51" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_337_4704"
            transform="matrix(0.00913978 0 0 0.0111111 0.0887097 0)"
          />
        </pattern>
        <image
          id="image0_337_4704"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </SvgIcon>
  );
};

export default Logo;
