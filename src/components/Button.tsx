import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, ...rest }: Props) => {
  return (
    <button
      className="border-2 text-xs bg-white h-8 border-[#E5E5E5] p-1 rounded-[5px]"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
