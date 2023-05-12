import Sidebar from "@/app/components/sidebar/sideBar";
import getConversations from "@/app/actions/getConversations";
import ConversationList from "./components/conversationList";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({children} : {children: React.ReactNode}) {
    
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        // @ts-expect-error Server Component
        <Sidebar>
          <div className="h-full">
            <ConversationList 
              initialItems={conversations}
              users={users}
              title=""
            />
            {children}
          </div>
        </Sidebar>
      );
}