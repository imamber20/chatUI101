import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import ChatArea from "./components/ChatArea";
import ChatDetails from "./components/ChatDetails";
// contacts imported inside ChatList

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

  return (
    <div className="App">
      <div className="flex h-screen w-full overflow-hidden bg-white">
        {/* Left Sidebar */}
        <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

        {/* Call Logs */}
        <ChatList
          selectedChat={selectedChat}
          selectedCallLogId={selectedCallLogId}
          onSelectChat={handleSelectCallLog}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Transcript Area */}
        <ChatArea
          selectedChat={selectedChat}
          selectedCallLogId={selectedCallLogId}
          onToggleDetails={() => setShowDetails(!showDetails)}
          showDetails={showDetails}
        />

        {/* Right Details Panel */}
        {showDetails && selectedChat && (
          <ChatDetails
            selectedChat={selectedChat}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
