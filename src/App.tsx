import { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { GrClose, GrEdit, GrTrash } from 'react-icons/gr';
import { Slide, ToastContainer, toast } from 'react-toastify';

import Button from './components/Button';
// import useLocalStorage, { Resource } from './hooks/useLocalStorage';
import InputText from './components/InputText';
import { checkURL } from './utils';
import { toastConfig, defaultAnimationInAndOut } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  Resource,
  addResource,
  deleteResource,
  updateResource,
} from './features/resource';

function App() {
  const [visibleInput, setVisibleInput] = useState<Boolean>(false);
  const [visibleDetail, setVisibleDetail] = useState<Resource | null>();
  const [isEdit, setIsEdit] = useState<string | null>(null);

  const { resources } = useSelector((state: any) => state);
  console.log(resources);

  const dispatch = useDispatch();

  const toggleEdit = (key: string | null) =>
    setIsEdit((prev) => (prev === key ? null : key));
  const toggleInput = () => setVisibleInput((prev) => !prev);
  const showDetail = (resource: Resource) => setVisibleDetail(resource);
  const hideDetail = () => setVisibleDetail(null);

  // re-render details if some of one is changed
  useEffect(() => {
    setVisibleDetail((prev) =>
      resources.find((item: any) => item.key === prev?.key)
    );
  }, [resources]);

  const onAdd = (name: string): Promise<NodeJS.Timeout> => {
    // Randomly delay by between 300 and 1000 milliseconds
    const UPLOAD_DELAY = Math.floor(Math.random() * (1000 - 300 + 1) + 300);
    const ADD_SUCCESS = Math.floor(Math.random() * 5 + 1) > 1;

    const process = toast.loading('처리 중 입니다...', {
      position: toast.POSITION.TOP_CENTER,
    });
    return new Promise(() => {
      setTimeout(() => {
        try {
          // request fail randomly
          if (!ADD_SUCCESS) throw 'URL 추가 실패!';
          const date = moment().format('YYYYMMDDHHmmss');
          dispatch(addResource({ path: name, date }));
          // createResource(name, date);
          toast.update(process, {
            render: 'URL이 추가되었습니다.',
            type: 'success',
            isLoading: false,
            ...toastConfig,
          });
          // refetch();
          toggleInput();
        } catch (error) {
          toast.update(process, {
            render: 'URL 추가 실패',
            type: 'error',
            isLoading: false,
            ...toastConfig,
          });
        }
        // delay randomly
      }, UPLOAD_DELAY);
    });
  };
  const onEdit = (path: string, key: string) => {
    // updateResource(key, name);
    dispatch(updateResource({ key, data: { path } }));
    toast.success('성공적으로 수정되었습니다.', {
      position: 'top-center',
      ...toastConfig,
    });
    // refetch();
    toggleEdit(null);
  };

  const onRemove = (key: string) => {
    // deleteResource(key);
    dispatch(deleteResource(key));
    toast.success('성공적으로 삭제되었습니다.', {
      position: 'top-center',
      ...toastConfig,
    });
    // refetch();
  };

  return (
    <div className="App">
      <ToastContainer className="text-xs m-0" transition={Slide} />
      <div className="h-screen w-full flex divide-x divide-[#C4C4C4] bg-[#F0F0F0]">
        <aside className="w-[25%] h-screen bg-[#F7F7F7] flex flex-col relative ">
          {/* Button group */}
          <div className="grid grid-flow-col px-4 py-2 gap-2 bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.1)]">
            <Button onClick={toggleInput}>URL 추가</Button>
            <Button onClick={toggleInput}>이미지 추가</Button>
          </div>

          {/* Input popup */}
          <AnimatePresence>
            {visibleInput && (
              <motion.div
                key="add-popup"
                className="absolute w-full top-11 px-4 z-[1]"
                {...defaultAnimationInAndOut}
              >
                <div className="h-auto bg-white border rounded-[5px] p-1 shadow-[0_2px_5px_0_rgba(0,0,0,0.1)]">
                  <InputText onEnter={onAdd} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List */}
          <ul className="p-3 overflow-y-scroll flex-1">
            {resources?.map((item: Resource) => {
              const isOnEditing = isEdit === item.key;
              return (
                <motion.li
                  className={`mb-3 cursor-pointer relative rounded-[10px] border ${
                    visibleDetail?.key === item.key
                      ? 'border-[rgba(56,165,225,1)]'
                      : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => showDetail(item)}
                  key={item.key}
                >
                  <div className="bg-white rounded-[10px] h-24 p-4 flex flex-col justify-between gap-5">
                    <div className="h-10">
                      {isOnEditing ? (
                        <InputText
                          onEnter={(value) => onEdit(value, item.key)}
                          defaultValue={item.updatedPath || item.path}
                        />
                      ) : (
                        <p className="line-clamp-2 break-words text-sm">
                          {item.updatedPath || item.path}
                        </p>
                      )}
                    </div>
                    <div className="flex self-end gap-3 absolute bottom-3 right-5">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className=" cursor-pointer"
                        onClick={() => toggleEdit(item.key)}
                      >
                        {isOnEditing ? <GrClose /> : <GrEdit />}
                      </motion.div>
                      <motion.div
                        className="cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        onClick={() => onRemove(item.key)}
                      >
                        <GrTrash />
                      </motion.div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-[75%] h-full ">
          <AnimatePresence>
            {visibleDetail && (
              <motion.div
                className="bg-white w-full h-full flex flex-col"
                key={visibleDetail.key}
                {...defaultAnimationInAndOut}
              >
                <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.1)] p-[14px] flex justify-between relative z-[1]">
                  <h1 className="text-sm flex-1 text-ellipsis overflow-x-hidden mr-4 ">
                    {visibleDetail.path}
                  </h1>

                  <div className="w-5 h-5 cursor-pointer" onClick={hideDetail}>
                    <GrClose />
                  </div>
                </div>
                <iframe
                  src={
                    visibleDetail.updatedPath
                      ? checkURL(visibleDetail.updatedPath)
                      : checkURL(visibleDetail.path)
                  }
                  className="w-full flex-1"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
