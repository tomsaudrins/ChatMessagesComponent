import * as React from 'react';
import { Label, Image, IconButton } from '@fluentui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '../css/style.css';

export interface IChatMessagesProps {
  conversationData: string;
  senderImage: string;
  chatAgentImage: string;
  senderName: string;
  chatAgentName: string;
  iconHeight: number;
  iconWidth: number;
  imageBorderRadius: number;
  availableHeight: number;
  fontSize: number;
  fontFamily: string;
  autoScroll?: boolean;
}

export const ChatMessagesComponent: React.FC<IChatMessagesProps> = (props) => {
  const { 
    conversationData, 
    senderImage, 
    chatAgentImage, 
    senderName, 
    chatAgentName, 
    iconHeight, 
    iconWidth, 
    imageBorderRadius, 
    availableHeight, 
    fontSize, 
    fontFamily,
    autoScroll = true
  } = props;
  
  let messages;
  try {
    messages = JSON.parse(conversationData);
  } catch (error) {
    messages = [];
  }

  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = React.useRef<number>(messages.length);

  React.useEffect(() => {
    if (autoScroll && chatContainerRef.current && messages.length > prevMessagesLengthRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100); // delay of 100 milliseconds
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, autoScroll]);
  

  return (
    <div 
      ref={chatContainerRef} 
      style={{ 
        textAlign: 'left' , 
        height: `${availableHeight}px`, 
        overflowY: 'auto', 
        fontSize: `${fontSize}px`, 
        fontFamily: fontFamily,
        width: '100%',
        alignItems: 'flex-start'
      }}
    >
      <style>
        {`
          .root-55 {
            font-size: ${fontSize}px !important;
          }
          .message-container:hover .copy-button {
            opacity: 1 !important;
          }
        `}
      </style>
      {messages.map((message: any) => (
        <div key={message.id} style={{ marginBottom: '1em', position: 'relative' }} className="message-container">
          <div style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '1em' }}>
            <Image 
              src={message.sender === 'agent' ? chatAgentImage : senderImage} 
              width={iconWidth} 
              height={iconHeight} 
              style={{ borderRadius: imageBorderRadius }} 
            />
          </div>
          <div style={{ display: 'inline-block', maxWidth: '80%' }}>
            <Label style={{ margin: 0, padding: "0px 0px 3px 0px" }}>{message.sender === 'agent' ? chatAgentName : senderName}</Label>
            <div className="no-margin">
              {message.sender === 'agent' ? 
                <MarkdownPreview
                className="no-margin markdown-preview"
                source={message.content}
                components={{
                  // @ts-ignore
                  img: ({...props}) => (
                    <a href={props.src} download>
                      <img {...props} style={{cursor: 'pointer', borderRadius: '7px', transition: 'opacity 0.3s'}} title="Click to download" className="image-hover" />
                    </a>
                  )
                }}
              />
              
              
              
                : <p className="no-margin">{message.content}</p>
              }
            </div>
          </div>
          <IconButton 
            iconProps={{ iconName: 'Copy' }} 
            title="Copy" 
            ariaLabel="Copy" 
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', opacity: 0, transition: 'opacity 0.2s' }} 
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(message.content)}
          />
        </div>
      ))}
    </div>
  );
};
