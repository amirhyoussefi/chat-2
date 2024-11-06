import { FC, useContext, useState } from 'react';
import ConfigIcon from '@components/ConfigIcon';
import { Tooltip, Input } from 'antd'; /* , Dropdown, MenuProps */
import { omit, sortBy } from 'lodash-es';
import GlobalContext from '@contexts/global';
import { getMaxIndex } from '@utils';
import { RecordCardItem } from '@interfaces'; /* ConversationMode */
import './index.css';
import ImportConversationModal from '@components/ConversationModal/import';
import RecordCard from './RecordCard';

const Sidebar: FC<{
  data: RecordCardItem[];
}> = ({ data }) => {
  const [keyword] = useState(''); /* , setKeyword */
  // import modal
  const [visible, setVisible] = useState(false);
  const {
    // i18n,
    currentId,
    setCurrentId,
    conversations,
    setConversations,
    myId,
  } = useContext(GlobalContext);

  // const onAdd = (mode: ConversationMode = 'text') => {
  //   const id = getMaxIndex(data).toString();
  //   setConversations((items) => ({
  //     ...items,
  //     [id]: {
  //       id,
  //       title: '',
  //       mode,
  //       messages: [],
  //       createdAt: Date.now(),
  //     },
  //   }));
  //   setCurrentId(id);
  // };

  const onDelete = (key: string) => {
    setConversations((items) => omit(items, [key]));
    // delete other conversation doesnt need to update currentTab
    if (currentId === key) {
      setCurrentId(data.filter((tab) => tab.key !== key)[0]?.key);
    }
  };

  // const items: MenuProps['items'] = [
  //   {
  //     key: '1',
  //     label: (
  //       <div onClick={() => onAdd()}>
  //         <i className="ri-chat-4-line align-bottom mr-1" />
  //         {i18n.action_add_text}
  //       </div>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <div onClick={() => onAdd('image')}>
  //         <i className="ri-image-line align-bottom mr-1" />
  //         {i18n.action_add_image}
  //       </div>
  //     ),
  //   },
  //   {
  //     key: '3',
  //     label: (
  //       <div onClick={() => setVisible(true)}>
  //         <i className="ri-chat-upload-line align-bottom mr-1" />
  //         {i18n.action_import}
  //       </div>
  //     ),
  //   },
  // ];

  const filterData = data.filter(
    (item) =>
      item.title.includes(keyword) ||
      conversations[item.key]?.messages?.some((message) =>
        message.content.includes(keyword)
      )
  );

  const myImageSrc = `/p/${myId}/pic.jpeg`;
  let myName = 'Amir Youssefi';
  if (myId === 'ahmad') {
    myName = 'Ahmad Anvari';
  } else if (myId === 'pooya') {
    myName = 'Pooya Karimian';
  }

  const [phoneNumber, setPhoneNumber] = useState('');

  const dialPhone = async () => {
    const postData = {
      my_id: myId,
      phone_to: `+1${phoneNumber}`,
    };
    const postParams = new URLSearchParams(postData);
    const res = await fetch('https://60ab-52-52-139-227.ngrok-free.app/mc', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: postParams,
    });
    if (!res.ok) {
      return new Response(res.body, {
        status: res.status,
      });
    }
    return res;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-[60px] pl-0 mt-0 flex items-center justify-center bg-slate-200">
        <span className="pr-1 text-gradient ri-chat-voice-ai-line ri-2x"></span>
        <span className="ui-monospace text-3xl text-gradient font-800">
          SpeakWithMe
        </span>
      </div>
      <div className="p-6 pb-2 flex items-center justify-between">
        <img className="profile-img" src={myImageSrc} />
      </div>
      <div className="mb-8 flex items-baseline justify-center">
        <span className="text-3xl font-700">{myName}</span>
      </div>
      <div className="font-bold p-2 flex items-center justify-between mb-0">
        Receive a phone call from my AI Agent now:
      </div>
      <div className="p-2 flex items-center justify-between mb-8">
        <Input
          className="h-[100%] mr-2"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          prefix="+1"
          placeholder="your phone number"
          bordered={true}
        />
        <Tooltip title="Call Me!">
          <ConfigIcon
            name="cursor-pointer text-gradient ri-2x ri-phone-line"
            onClick={() => {
              dialPhone();
            }}
          />
        </Tooltip>
      </div>
      {/* <div className="mb-4 inline-flex rounded-md items-baseline justify-center">
        <button
          type="button"
          className="inline-block rounded-3x bg-slate-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-slate-500 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          Professional Profile
        </button>
        <button
          type="button"
          className="active inline-block rounded-3x bg-slate-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-slate-500 focus:bg-primary-accent-300 focus:outline-none focus:ring-0 active:bg-primary-600 motion-reduce:transition-none"
          data-twe-ripple-init
          data-twe-ripple-color="light"
          onClick={() => {
            window.open('/personal');
          }}
        >
          Personal Profile
        </button>
      </div> */}
      {/* <div className="p-2 flex items-center justify-between mb-4">
        <div className="rounded-xl h-10 border flex-1">
          <Input
            className="h-[100%]"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            prefix={<i className="ri-search-2-line" />}
            placeholder={i18n.search_placeholder}
            bordered={false}
            allowClear
          />
        </div>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
          getPopupContainer={(node) => node}
        >
          <i className="ri-chat-new-line cursor-pointer p-2 ml-1" />
        </Dropdown>
      </div> */}
      <div className="common-scrollbar flex-1 p-2 pt-0 overflow-auto">
        {sortBy(filterData, ['time'])
          .reverse()
          .map((conversation, index) => (
            <div key={conversation.key}>
              {index !== 0 ? (
                <div className="h-[1px] bg-[#edeeee] ml-2 mr-2" />
              ) : null}
              <RecordCard
                data={conversation}
                selected={conversation.key === currentId}
                onSelect={() => setCurrentId(conversation.key)}
                onDelete={
                  data.length > 1 ? () => onDelete(conversation.key) : null
                }
              />
            </div>
          ))}
      </div>
      <ImportConversationModal
        nextId={getMaxIndex(data).toString()}
        open={visible}
        onCancel={() => setVisible(false)}
      />
    </div>
  );
};

export default Sidebar;
