import Sidebar from "../Sidebar";

export default function Page({
    children,
})
{
    return (
        <div>
            <div
                css={{
                    display: "flex",
                }}
            >
                <Sidebar />

                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
