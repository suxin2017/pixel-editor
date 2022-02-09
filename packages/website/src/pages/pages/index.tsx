import React, { Suspense } from "react";


const Pages: React.FC = () => {
  return (
    <div>
      pages
      <Suspense fallback={"loading..."}>
        {/* <RemoteButton /> */}
      </Suspense>
    </div>
  );
};

export default Pages;
