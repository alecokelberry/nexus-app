import { DashboardLayout } from "@/components/DashboardLayout";
import { DataProvider } from "@/context/DataContext";
import { SchedulingProvider } from "@/context/SchedulingContext";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DataProvider>
            <SchedulingProvider>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </SchedulingProvider>
        </DataProvider>
    );
}
