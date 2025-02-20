import { Link } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='container mx-auto px-2.5 flex flex-col justify-center items-center'>
        <DotLottieReact
          src='https://lottie.host/eca3cfe9-6e97-4d51-baf9-33d6916039ed/DptL15B3bv.lottie'
          loop
          autoplay
          className='md:w-96 w-80 aspect-square'
        />
        <p className='mb-2 text-xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
          Something missing.
        </p>
        <p className='mb-2 text-base font-light text-center text-gray-500 dark:text-gray-400'>
          Sorry, we can not find that page. You will find lots to explore on the
          home page.{" "}
        </p>
        <Link
          to='/'
          className='bg-[#FF0080] py-2 px-6 rounded-[10px] text-white font-semibold text-base'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
