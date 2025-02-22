import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Spinner = () => {
  return (
    <div className='container mx-auto w-44 h-44'>
      <DotLottieReact
        src='https://lottie.host/9f9444ce-1187-4951-b002-887aa783ee36/LKpMA79FXs.lottie'
        loop
        autoplay
        style={{
          filter: "hue-rotate(-240deg)",
        }}
      />
    </div>
  );
};

export default Spinner;
