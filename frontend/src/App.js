import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import ChatArea from "./components/ChatArea";
import ChatDetails from "./components/ChatDetails";
import EmployeesPage from "./pages/EmployeesPage";
import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import AnalysisPage from "./pages/AnalysisPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [activeNav, setActiveNav] = useState("chats");
  const [selectedChat, setSelectedChat] = useState("sarah");
  const [selectedCallLogId, setSelectedCallLogId] = useState("cl1");
  const [showDetails, setShowDetails] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectCallLog = (contactId, callLogId) => {
    setSelectedChat(contactId);
    setSelectedCallLogId(callLogId);
  };

  const renderMainContent = () => {
    switch (activeNav) {
      case "chats":
        return (
          <>
            <ChatList
              selectedChat={selectedChat}
              selectedCallLogId={selectedCallLogId}
              onSelectChat={handleSelectCallLog}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <ChatArea
              selectedChat={selectedChat}
              selectedCallLogId={selectedCallLogId}
              onToggleDetails={() => setShowDetails(!showDetails)}
              showDetails={showDetails}
            />
            {showDetails && selectedChat && (
              <ChatDetails
                selectedChat={selectedChat}
                selectedCallLogId={selectedCallLogId}
                onClose={() => setShowDetails(false)}
              />
            )}
          </>
        );
      case "work":
        return <EmployeesPage />;
      case "meet":
        return <DashboardPage />;
      case "calendar":
        return <CalendarPage />;
      case "rating":
        return <AnalysisPage />;
      case "saved":
        return <SubscriptionPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <>
            <ChatList
              selectedChat={selectedChat}
              selectedCallLogId={selectedCallLogId}
              onSelectChat={handleSelectCallLog}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <ChatArea
              selectedChat={selectedChat}
              selectedCallLogId={selectedCallLogId}
              onToggleDetails={() => setShowDetails(!showDetails)}
              showDetails={showDetails}
            />
          </>
        );
    }
  };

  return (
    <div className="App">
      <div className="flex h-screen w-full overflow-hidden bg-white">
        <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
        {renderMainContent()}
      </div>
    </div>
  );
}

export default App;
