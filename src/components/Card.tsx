import React from 'react';
import { TypedIcon } from 'typed-design-system';

type Props = { title: string };

const Card = ({ title }: Props) => {
  return (
    <div className="bg-white rounded-[10px] p-3 flex flex-col justify-between gap-5">
      <p className="line-clamp-2 break-words text-sm">{title}</p>
      <div className="flex self-end gap-2 ">
        {/* TODO: Can't import typed-icons. need to replace these icons later */}
        {/* <TypedIcon icon="edit_19" /> */}
        <div className="bg-black w-5 h-5"></div>
        <div className="bg-black w-5 h-5"></div>
      </div>
    </div>
  );
};

export default Card;
