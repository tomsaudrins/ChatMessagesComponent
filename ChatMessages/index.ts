import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ChatMessagesComponent, IChatMessagesProps } from "./ChatMessagesComponent";
import * as React from "react";
import * as ReactDOM from "react-dom";

export class ChatMessages implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private notifyOutputChanged: () => void;
  private theContainer: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
    this.theContainer = container;
    this._context = context;
    context.mode.trackContainerResize(true);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement | undefined {
    const props: IChatMessagesProps = {
        conversationData: context.parameters.conversationData.raw || '',
        senderImage: context.parameters.senderImage.raw || '',
        chatAgentImage: context.parameters.chatAgentImage.raw || '',
        senderName: context.parameters.senderName.raw || '',
        chatAgentName: context.parameters.chatAgentName.raw || '',
        iconHeight: context.parameters.iconHeight.raw || 0,
        iconWidth: context.parameters.iconWidth.raw || 0,
        imageBorderRadius: context.parameters.imageBorderRadius.raw || 0,
        availableHeight: context.mode.allocatedHeight || 200,
        fontSize: context.parameters.fontSize.raw || 12, // default to 14 if not provided
        fontFamily: context.parameters.fontFamily.raw || 'Segoe UI', // default to Arial if not provided
        autoScroll: context.parameters.autoScroll.raw,
      };
      

    return React.createElement(ChatMessagesComponent, props);
}



  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.theContainer);
  }
}
