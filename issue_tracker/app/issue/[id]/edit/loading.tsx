"use client";

import { Oval } from "react-loader-spinner";

export default function LoadingPage() {
  return (
    <Oval
      height={80}
      width={80}
      color="purple"
      wrapperClass="my-10 flex justify-center"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="purple"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
