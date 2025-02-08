import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";

const conversions = [
  {
    id: 1,
    fileName: "document1.pdf",
    outputFormat: "docx",
    date: "2023-06-01",
    status: "Completed",
  },
  {
    id: 2,
    fileName: "image1.jpg",
    outputFormat: "png",
    date: "2023-06-02",
    status: "Completed",
  },
  {
    id: 3,
    fileName: "spreadsheet1.xlsx",
    outputFormat: "csv",
    date: "2023-06-03",
    status: "Failed",
  },
  // Add more conversion history items as needed
];

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Conversion History</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Output Format</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversions.map((conversion) => (
                <TableRow key={conversion.id}>
                  <TableCell>{conversion.fileName}</TableCell>
                  <TableCell>{conversion.outputFormat}</TableCell>
                  <TableCell>{conversion.date}</TableCell>
                  <TableCell>{conversion.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
