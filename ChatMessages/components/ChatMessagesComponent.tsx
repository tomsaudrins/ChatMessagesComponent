import * as React from 'react';
import { Label, Image } from '@fluentui/react';
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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
        fontFamily: fontFamily 
      }}
    >
      <style>
        {`
          .root-55 {
            font-size: ${fontSize}px !important;
          }
        `}
      </style>
      {messages.map((message: any) => (
        <div key={message.id} style={{ marginBottom: '1em' }}>
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
               img: ({node, ...props}) => (
                 <div style={{ position: 'relative', display: 'inline-block' }}>
                   <a href={props.src} download>
                     <img {...props} style={{cursor: 'pointer', borderRadius: '7px', width: '150px', height: '150px'}} title="Click to download" />
                     <div style={{ position: 'absolute', right: 0, bottom: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: 0, transition: 'opacity 0.3s', borderRadius: '7px' }} className="image-overlay">
                     </div>
                   </a>
                 </div>
               )
             }}
           />
           

 
 
       
           
            
              
              
              
                : <p className="no-margin">{message.content}</p>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
