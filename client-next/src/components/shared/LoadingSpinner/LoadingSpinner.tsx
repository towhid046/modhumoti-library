interface LoadingSpinnerProps {
    height?: string;
    size?: "sm" | "lg" | "md";
  }
  const LoadingSpinner = ({
    height = "90vh",
    size = "lg",
  }: LoadingSpinnerProps): JSX.Element => {
    return (
      <div className={`flex justify-center h-[${height}] items-center`}>
        <span className={`loading loading-spinner loading-${size} `}></span>
      </div>
    );
  };
  
  export default LoadingSpinner;