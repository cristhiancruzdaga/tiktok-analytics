import React from "react";
import { useDashboard } from "./hooks/useDashboard";
import Header from "./components/Header";
import LinkAnalyzer from "./components/LinkAnalyzer";
import KpiSection from "./components/KpiSection";
import Charts from "./components/Charts";
import VideoTable from "./components/VideoTable";
import VideoDetailModal from "./components/VideoDetailModal";
import LoadDataModal from "./components/LoadDataModal";

export default function App() {
  const d = useDashboard();
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 antialiased">
      <Header {...d} />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <LinkAnalyzer {...d} />
        <KpiSection {...d} />
        <Charts {...d} />
        <VideoTable {...d} />
      </main>
      <VideoDetailModal {...d} />
      <LoadDataModal {...d} />
    </div>
  );
}
