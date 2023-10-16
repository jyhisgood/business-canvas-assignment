import { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';

function App() {
  const [visibleInput, setVisibleInput] = useState<Boolean>(false);
  const [visibleDetail, setVisibleDetail] = useState<Boolean>(false);

  const toggleInput = () => setVisibleInput((prev) => !prev);

  const showDetail = () => setVisibleDetail(true);
  const hideDetail = () => setVisibleDetail(false);

  return (
    <div className="App">
      <div className="h-screen w-full flex divide-x divide-[#C4C4C4] bg-[#F0F0F0]">
        <aside className="w-[25%] h-screen bg-[#F7F7F7] flex flex-col relative ">
          {/* Button group */}
          <div className="grid grid-flow-col px-4 py-2 gap-2 bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.1)]">
            <Button onClick={toggleInput}>URL 추가</Button>
            <Button onClick={toggleInput}>이미지 추가</Button>
          </div>

          {/* Input popup */}
          <div
            className="absolute w-full top-11 px-4"
            // TODO: Improve show and hide animation
            style={{ display: visibleInput ? 'block' : 'none' }}
          >
            <div className=" h-auto bg-white border rounded-[5px] p-1 shadow-[0_2px_5px_0_rgba(0,0,0,0.1)]">
              <input
                type="text"
                className="w-full text-xs px-2 py-1 border rounded-[3px]"
              />
            </div>
          </div>

          {/* List */}
          <ul className="p-3 overflow-y-scroll flex-1">
            {Array(40)
              .fill(null)
              .map((_, idx) => (
                <li
                  key={idx}
                  className="mb-3 cursor-pointer "
                  onClick={showDetail}
                >
                  <Card
                    title={
                      'https://tseljflsiejflsidjf.com/lakjsdf/klaszjdf/lasijdfasdklfjsklaalsdkjflkasdflksadjflkasdjflkjasdflkjsadflkjasdlkfjasdlkfjaslkdjflkjdjfjlsdkfjsd'
                    }
                  />
                </li>
              ))}
          </ul>
        </aside>
        <main className="w-[75%] h-full ">
          {visibleDetail && (
            <div className="bg-white w-full h-full">
              <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.1)] p-[14px] flex justify-between">
                <h1 className="text-sm flex-1 text-ellipsis overflow-x-hidden mr-4">
                  https://tseljflsiejflsidjf.com/lakjsdf/klaszjdf/lasijdfasdklfjsklaalsdkjflkasdflksadjflkasdjflkjasdflkjsadflkjasdlkfjasdlkfjaslkdjflkjdjfjlsdkfjsd
                </h1>
                <div>
                  {/* TODO: Can't import typed-icons. need to replace these icons later */}
                  {/* <TypedIcon icon="edit_19" /> */}
                  <div className="bg-black w-5 h-5" onClick={hideDetail}></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
