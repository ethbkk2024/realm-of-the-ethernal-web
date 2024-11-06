import React from 'react';
import Image from 'next/image';

const IconCheckbox = () => {
  return (
    <div className="h-[24px]">
      <Image src={'/icons/icon-checkbox.svg'} width={24} height={24} alt="" />
    </div>
  );
};

export default IconCheckbox;
