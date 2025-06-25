
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, Users } from "lucide-react";
import { getAllSubmissions, exportToExcel } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";

const ExcelExportAdmin = () => {
  const { toast } = useToast();

  const handleExport = () => {
    try {
      const submissions = getAllSubmissions();
      
      if (submissions.length === 0) {
        toast({
          title: "No Data",
          description: "No student submissions found to export.",
          variant: "destructive",
        });
        return;
      }

      exportToExcel(submissions);
      
      toast({
        title: "Export Successful",
        description: `Exported ${submissions.length} student submissions to Excel.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      });
    }
  };

  const submissions = getAllSubmissions();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Student Data Export
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{submissions.length} submissions ready for export</span>
        </div>
        
        <Button 
          onClick={handleExport}
          className="w-full"
          disabled={submissions.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          This will download an Excel file with all student preferences and contact information.
        </p>
      </CardContent>
    </Card>
  );
};

export default ExcelExportAdmin;
