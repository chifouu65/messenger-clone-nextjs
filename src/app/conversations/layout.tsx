import Sidebar from "@/app/components/sidebar/sideBar";
import getUsers from "@/app/actions/getUsers";
import getConversations from "@/app/actions/getConversations";
import ConversationList from "./components/conversationList";

export default async function ConversationsLayout({children} : {children: React.ReactNode}) {
    
    const users = await getUsers();
    const conversations = await getConversations();
    
    return (
        // @ts-expect-error Server Component
        <Sidebar>
          <div className="h-full">
            <ConversationList 
              users={users} 
              title="Messages" 
              initialItems={conversations}
            />
            {children}
          </div>
        </Sidebar>
      );
}