import { Toaster } from "react-hot-toast";

function layout({ children }) {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "1.6rem",
            padding: "1.2rem 2rem",
            minWidth: "300px",
          },
        }}
      />
      <main>{children}</main>
    </>
  );
}

export default layout;
