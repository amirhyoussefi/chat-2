import { FC, useContext, useState } from 'react';
import { Conversation, ReactSetState } from '@interfaces';
import ConfigIcon from '@components/ConfigIcon';
import GlobalContext from '@contexts/global';
import { Tooltip } from 'antd';
import ExportConversationModal from '@components/ConversationModal/export';
import EditModal from '@components/EditModal';
import './index.css';

interface ContentHeaderProps {
  conversation: Conversation;
  setActiveSetting: ReactSetState<boolean>;
  setShowPrompt: ReactSetState<boolean>;
  setText: ReactSetState<string>;
}

const ContentHeader: FC<ContentHeaderProps> = ({
  conversation,
  setActiveSetting,
  setShowPrompt,
  setText,
}) => {
  const { i18n, isMobile, currentId, setCurrentId, setConversations, myId } =
    useContext(GlobalContext);

  // output conversation modal
  const [visible, setVisible] = useState(false);

  // edit title modal
  const [titleText, setTitleText] = useState('');
  const [titleVisible, setTitleVisible] = useState(false);

  return (
    <div
      className={`bg-slate-200 w-full h-[60px] flex items-center justify-end ${
        isMobile ? '' : 'pl-5'
      } pr-5 border-b border-b-[#edeeee] overflow-hidden`}
    >
      {/* <div className="flex items-center flex-1 overflow-hidden mr-2">
        {isMobile ? (
          <i
            className="ri-arrow-left-line p-3 ml-2 cursor-pointer"
            onClick={() => setCurrentId('')}
          />
        ) : null}
        <div className="text-[#232629] flex-1 flex overflow-hidden">
          <div className="truncate">
            {conversation.title || i18n.status_empty}
          </div>
          <div className="ml-1">
            <ConfigIcon
              name="ri-edit-2-line"
              onClick={() => {
                setTitleText(conversation.title);
                setTitleVisible(true);
              }}
            />
          </div>
        </div>
      </div> */}
      <div className="flex justify-end mr-2">
        <Tooltip title="Voice Chat">
          <ConfigIcon
            name="ri-chat-voice-ai-line ri-2x mr-2"
            onClick={() => {
              window.open(
                'https://self-adaptive-interface-14r2uj.sandbox.livekit.io'
              );
            }}
          />
        </Tooltip>
        {conversation.mode === 'image' ? null : (
          <Tooltip title={i18n.action_prompt}>
            <ConfigIcon
              name="ri-questionnaire-line ri-2x mr-2"
              onClick={() => {
                setText('/');
                setShowPrompt(true);
              }}
            />
          </Tooltip>
        )}
        {myId !== 'amir' ? null : (
          <Tooltip title="Download Resume">
            <ConfigIcon
              name="ri-article-line ri-2x mr-2"
              onClick={() => {
                window.open(`/p/${myId}/resume.pdf`);
              }}
            />
          </Tooltip>
        )}
        <Tooltip title="Linkedin">
          <ConfigIcon
            name="ri-linkedin-box-line ri-2x mr-2"
            onClick={() => {
              window.open('http://linkedin.com/in/youssefi');
            }}
          />
        </Tooltip>
        {/* <Tooltip title={i18n.action_output}>
          <ConfigIcon
            name="ri-chat-download-line ri-xl mr-2"
            onClick={() => {
              setVisible(true);
            }}
          />
        </Tooltip> */}
        <ConfigIcon
          name="ri-settings-3-line ri-2x"
          onClick={() => setActiveSetting((active) => !active)}
        />
      </div>
      <ExportConversationModal
        conversation={conversation}
        open={visible}
        onCancel={() => setVisible(false)}
      />
      <EditModal
        value={titleText}
        setValue={setTitleText}
        open={titleVisible}
        onCancel={() => setTitleVisible(false)}
        onOk={() => {
          setConversations((conversations) => ({
            ...conversations,
            [currentId]: {
              ...conversations[currentId],
              title: titleText,
            },
          }));
          setTitleVisible(false);
        }}
      />
    </div>
  );
};
export default ContentHeader;
