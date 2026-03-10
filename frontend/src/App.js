import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import ChatArea from "./components/ChatArea";
import ChatDetails from "./components/ChatDetails";
import { contacts } from "./data/mockData";

function App() {
  const [activeNav, setActiveNav] = useState("chats");
  const [selectedChat, setSelectedChat] = useState("sarah");
  const [showDetails, setShowDetails] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <div className="flex h-screen w-full overflow-hidden bg-white">
        {/* Left Sidebar */}
        <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

        {/* Chat List */}
        <ChatList
          contacts={contacts}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Chat Area */}
        <ChatArea
          selectedChat={selectedChat}
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
