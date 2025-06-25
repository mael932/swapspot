
import React from "react";
import ExcelExportAdmin from "@/components/ExcelExportAdmin";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Manage student exchange submissions</p>
          </div>
          
          <ExcelExportAdmin />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
