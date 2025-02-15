import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Clock, CheckCircle } from "lucide-react";
import { createSupabaseClient } from "@/lib/utils/supabase/client";

const conversions = [
  {
    id: 1,
    name: "document1.pdf → document1.docx",
    time: "2023-10-01T14:00:00Z",
  },
  {
    id: 2,
    name: "document2.pdf → document2.docx",
    time: "2023-10-01T11:00:00Z",
  },
  {
    id: 3,
    name: "document3.pdf → document3.docx",
    time: "2023-09-30T10:00:00Z",
  },
  // Add more conversions as needed
];

export function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("time_desc");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [supabase] = useState(() => createSupabaseClient());

  useEffect(() => {
    const fetchUser = async () => {
      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserEmail(user?.email ?? null);
      }
    };

    fetchUser();
  }, [supabase]);

  const filteredConversions = conversions
    .filter((conversion) =>
      conversion.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "time_asc") {
        return new Date(a.time) > new Date(b.time) ? 1 : -1;
      } else if (sortOption === "time_desc") {
        return new Date(a.time) > new Date(b.time) ? -1 : 1;
      } else if (sortOption === "name_asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "name_desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <>
      <h1 className="text-3xl font-bold">Welcome back, {userEmail}!</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversions
            </CardTitle>
            <FileUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">
              Average conversion time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Conversion success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded p-2 bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <option value="time_desc">
                <Clock className="inline h-4 w-4 mr-1" /> Time (↓)
              </option>
              <option value="time_asc">
                <Clock className="inline h-4 w-4 mr-1" /> Time (↑)
              </option>
              <option value="name_desc">
                <FileUp className="inline h-4 w-4 mr-1" /> Name (↓)
              </option>
              <option value="name_asc">
                <FileUp className="inline h-4 w-4 mr-1" /> Name (↑)
              </option>
              <option value="type_desc">
                <FileUp className="inline h-4 w-4 mr-1" /> File Type (↓)
              </option>
              <option value="type_asc">
                <FileUp className="inline h-4 w-4 mr-1" /> File Type (↑)
              </option>
            </select>
          </div>
          <div className="space-y-6">
            {filteredConversions.map((conversion) => (
              <div key={conversion.id} className="flex items-center">
                <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 mr-4"></div>
                <div>
                  <p className="font-medium">{conversion.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(conversion.time).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline">
            View All Conversions
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
