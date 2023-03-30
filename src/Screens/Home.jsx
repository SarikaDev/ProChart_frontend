import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const colors = ["bg-red-200", "bg-green-200", "bg-purple-200", "bg-pink-200"];

const Home = () => {
  const [ws, setWs] = useState(null);
  console.log("ws:", ws);
  const [onlinePeople, setOnlinePeople] = useState({});
  const { userId: ownUserId } = useContext(UserContext);

  const userIdBase10 = parseInt(Math.random(), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  const showOnlinePeople = useCallback(peopleArray => {
    const people = {};
    peopleArray.forEach(element => {
      people[element.userId] = element.userName;
    });

    setOnlinePeople(people);
    console.log("people:", people);
  }, []);
  const handleMessage = useCallback(
    e => {
      const messageData = JSON.parse(e.data);
      if ("online" in messageData) {
        showOnlinePeople(messageData.online);
      }
    },
    [showOnlinePeople],
  );
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, [handleMessage]);

  const onlineUsersExcOurUser = { ...onlinePeople };
  delete onlineUsersExcOurUser[ownUserId];
  return (
    <div className='flex h-screen'>
      <div className='w-2/4 lg:w-1/5  bg-white pl-4 pt-2'>
        <div className='text-blue-500 font-bold  flex gap-2 '>
          CHARTBOAT
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
            />
          </svg>
        </div>
        {Object.keys(onlinePeople).map(userId => (
          <div
            className='border-b border-gray-400 py-2 flex gap-2 items-center '
            key={userId}
          >
            <div className={"w-8 h-8 rounded-full " + color}>
              <div className='text-center w-full font-semibold pt-1'>
                {onlinePeople[userId][0]}
              </div>
            </div>
            {onlineUsersExcOurUser[userId]}
          </div>
        ))}
      </div>
      <div className='w-full p-2 bg-blue-50 flex flex-col'>
        <div className='flex-grow'>Message With selected Person</div>
        <div className='flex gap-2 mx-2'>
          <input
            type='text'
            placeholder='write a message'
            className='bg-white text-left border flex-grow border-blue-300 p-2 rounded-sm'
          />
          <button className='bg-blue-500 p-2   text-white rounded-sm '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
