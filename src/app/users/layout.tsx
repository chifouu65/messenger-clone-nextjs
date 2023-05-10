import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/sideBar";
import UserList from "./components/userList";

interface ILayoutProps {
    children: React.ReactNode;
}

export default async function UsersLayout({
    children
  }: ILayoutProps) {
    const users = await getUsers();
    console.log(users);
    return (
      // @ts-expect-error Server Component
      <SideBar>
        <div className="h-full">
          <UserList users={users} />
          {children}
        </div>
      </SideBar>
    );
  }