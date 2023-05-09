
import SideBar from "../components/sidebar/sideBar";

interface ILayoutProps {
    children: React.ReactNode;
}

export default async function UsersLayout({ children }: ILayoutProps) {
    return (
        // @ts-expect-error Server components
        <SideBar>
            <div className="h-full">
                {children}
            </div>
        </SideBar>
    )
}