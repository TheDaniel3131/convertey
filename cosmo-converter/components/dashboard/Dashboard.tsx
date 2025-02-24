import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Clock, CheckCircle } from "lucide-react";
import { createSupabaseClient } from "@/lib/utils/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
];

const sortOptions = [
  { value: "time_desc", label: "Time (newest first)" },
  { value: "time_asc", label: "Time (oldest first)" },
  { value: "name_desc", label: "Name (Z to A)" },
  { value: "name_asc", label: "Name (A to Z)" },
  { value: "type_desc", label: "File Type (Z to A)" },
  { value: "type_asc", label: "File Type (A to Z)" },
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
      switch (sortOption) {
        case "time_asc":
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        case "time_desc":
          return new Date(b.time).getTime() - new Date(a.time).getTime();
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "type_asc":
          return a.name.split(".").pop()?.localeCompare(b.name.split(".").pop() || "") || 0;
        case "type_desc":
          return b.name.split(".").pop()?.localeCompare(a.name.split(".").pop() || "") || 0;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, {userEmail}!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <FileUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">Average conversion time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Conversion success rate</p>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {filteredConversions.map((conversion) => (
              <div key={conversion.id} className="flex items-center">
                <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 mr-4" />
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
    </div>
  );
}