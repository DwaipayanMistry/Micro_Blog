import UserSignin from "./user";

const DesktopComponent = () => {
    return (
      <>
        <div className="hidden lg:flex gap-5">
          <div className="flex justify-center items-center">side bar item 1</div>
          <div className="flex justify-center items-center">side bar item 2</div>
          <div className="flex justify-center items-center">side bar item 3</div>
          <div className="flex justify-center items-center">side bar item 4</div>
          <UserSignin></UserSignin>
        </div>
      </>
    );
  };
   export default DesktopComponent