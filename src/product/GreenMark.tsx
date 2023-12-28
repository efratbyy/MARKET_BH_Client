import React from "react";

type Props = {
  width?: string;
  height?: string;
};

const GreenMark: React.FC<Props> = ({
  width = "55.133",
  height = "55.133",
}) => {
  return (
    <img
      src="/assets/images/green_mark.png"
      alt="Green mark"
      width={width}
      height={height}
    />
  );
};

export default GreenMark;
