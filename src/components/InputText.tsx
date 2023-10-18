import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

type InputTextProps = {
  onEnter: (value: string) => void;
  defaultValue?: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = ({ onEnter, defaultValue = '', ...rest }: InputTextProps) => {
  const urlRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');

  // default value for editing
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const activeEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key === 'Enter') {
        if (!urlRef.current?.value) throw `리소스를 입력하세요.`;

        const protocolRegex = /^https:\/\/|^http:\/\//gm;
        if (!protocolRegex.test(urlRef.current?.value))
          throw '프로토콜을 명시해야합니다.';

        await onEnter(urlRef.current.value || '');
      }
    } catch (error: any) {
      toast.error(error, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
      });
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      ref={urlRef}
      type="text"
      onKeyDown={activeEnter}
      onChange={onChange}
      className="w-full text-xs px-2 py-1 border rounded-[3px]"
      value={value}
      {...rest}
    />
  );
};

export default InputText;
