import Sidebar from "@/app/components/sidebar/sideBar";
import getConversations from "@/app/actions/getConversations";
import ConversationList from "./components/conversationList";

export default async function ConversationsLayout({children} : {children: React.ReactNode}) {
    
    const conversations = await getConversations();
    
    return (
        // @ts-expect-error Server Component
        <Sidebar>
          <div className="h-full">
            <ConversationList 
              initialItems={conversations}
            />
            {children}
          </div>
        </Sidebar>
      );
}