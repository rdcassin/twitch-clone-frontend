import { format } from "date-fns";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getBlockedUsers } from "@/lib/services/block-service";

const ManageParty = async () => {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((user) => ({
    ...user,
    userId: user.blocked.id,
    imageUrl: user.blocked.imageUrl,
    username: user.blocked.username,
    createdAt: format(new Date(user.blocked.createdAt), "yyyy/MM/dd"),
  }));

  return (
    <div className="p-2 sm:p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-x-2">
          👥 Manage Party
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1 mb-3">
          Banished party members appear below — restore peace as you see fit.
        </p>
      </div>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default ManageParty;
