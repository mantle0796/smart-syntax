"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Code,
  Rocket,
  Wallet,
  MessageCircle,
  Send,
  FileText,
  Check,
  X,
  Plus,
  User,
  LogOut,
  ChevronDown,
  Gift,
  Coins
} from 'lucide-react';
import Link from 'next/link';
import questAbi from '../contractData/smart.json'
import { BrowserProvider, ethers } from "ethers";
import questAddress from "../contractData/address.json";


interface ContractTemplate {
  name: string;
  icon: React.ReactElement;
  description: string;
  autoMessage: string
}

interface ChatMessage {
  id: number;
  sender: 'AI' | 'User';
  message: string;
}

declare global {
  interface Window {
    ethereum?: {
      isMetaMask: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

const SmartContractDashboard: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeContract, setActiveContract] = useState<string>('HelloWorld');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'AI', message: 'Welcome to ContractCraft! How can I help you design your smart contract today?' },
    { id: 2, sender: 'User', message: 'Can you help me understand how to create a basic voting contract?' }
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [tokensClaimed, setTokensClaimed] = useState(false);
  const [ccBalance, setCcBalance] = useState(0);

  const handleClaimTokens = async() => {
    setTokensClaimed(true);
    alert('Withdrawing. Transaction Processing..............');

    const balance = "10";
    if (window.ethereum != undefined) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const account = await signer.address;
      const questContract = new ethers.Contract(questAddress.contractAddress, questAbi.abi, signer)
      // mint();
      // console.log(balance, "========inside withdraw===")

      await (await questContract.mint(account, ethers.parseUnits(parseInt(balance).toString(), 18))).wait();
      alert('Withdraw your earned CC coins!');
      setShowProfileDropdown(false);
    }
    alert('Successfully claimed 10 CC tokens!');
    setShowProfileDropdown(false);
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const handleWithdraw = async () => {
    alert('Withdrawing. Transaction Processing..............');

    const balance = "10";
    if (window.ethereum != undefined) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const account = await signer.address;

      const questContract = new ethers.Contract(questAddress.contractAddress, questAbi.abi, signer)
      // mint();
      // console.log(balance, "========inside withdraw===")

      await (await questContract.mint(account, ethers.parseUnits(parseInt(balance).toString(), 18))).wait();
      alert('Withdraw your earned CC coins!');
      setShowProfileDropdown(false);
    }
  };

  const contractTemplates: ContractTemplate[] = [
    {
      name: 'HelloWorld',
      icon: <FileText className="w-6 h-6" />,
      description: 'Basic smart contract template',
      autoMessage: 'I want to create a basic HelloWorld smart contract. Can you guide me through the process and explain the key components?'
    },
    {
      name: 'Voting',
      icon: <Check className="w-6 h-6" />,
      description: 'Decentralized voting system',
      autoMessage: 'I\'m interested in creating a decentralized voting contract. What are the key considerations for a fair and transparent voting mechanism?'
    },
    {
      name: 'Betting',
      icon: <Zap className="w-6 h-6" />,
      description: 'Trustless betting platform',
      autoMessage: 'I want to develop a trustless betting platform smart contract. What security measures should I consider?'
    },
    {
      name: 'Token',
      icon: <Code className="w-6 h-6" />,
      description: 'Custom token creation',
      autoMessage: 'Can you help me understand the process of creating a custom ERC20 token contract?'
    }
  ];

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || newMessage;
    try {
      const response = await fetch('https://upgraded-funicular-7v59gggjgrr7hrxq4-8000.app.github.dev/chat_gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: messageToSend }),
      });

      const data = await response.json();

      if (messageToSend.trim()) {
        console.log(data.ans)
        setChatMessages(prevMessages => [
          ...prevMessages,
          { id: prevMessages.length + 1, sender: 'User', message: messageToSend },
          {
            id: prevMessages.length + 2,
            sender: 'AI',
            message: `Here's a helpful response about ${activeContract} contracts. ${data.ans}`
          }
        ]);
        setNewMessage('');
        setCcBalance(prev => prev + 1);
      }
    } catch {
      console.log("Error happened");
    }
  };

  const handleContractSelect = (template: ContractTemplate) => {
    setActiveContract(template.name);
    handleSendMessage(template.autoMessage);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-gray-100">
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-800/70 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-100 flex items-center">
            <Rocket className="mr-2 text-blue-400" />
            <Link href="/">
              ContractCraft
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!walletConnected ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                onClick={connectWallet}
              >
                <Wallet className="mr-2 w-5 h-5" />
                Connect Metamask
              </motion.button>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-4 py-2 bg-gray-700 rounded-lg">
                  <Coins className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-medium">{ccBalance} CC</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <User className="mr-2 w-5 h-5" />
                  <span className="mr-2">Profile</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>

                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-4 top-16 w-64 bg-gray-700 rounded-lg shadow-lg border border-gray-600 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-600">
                      <div className="text-sm text-gray-300 mb-2">Connected Wallet</div>
                      <div className="text-sm font-mono">{walletAddress.substring(0, 6)}...{walletAddress.substring(38)}</div>
                    </div>

                    <button
                      onClick={handleClaimTokens}
                      disabled={tokensClaimed}
                      className={`w-full flex items-center p-4 hover:bg-gray-600 transition text-left ${tokensClaimed ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Gift className="mr-2 w-5 h-5 text-green-400" />
                      <div>
                        <div className="font-medium">Claim CC Tokens</div>
                        <div className="text-sm text-gray-400">{ccBalance} CC tokens available</div>
                      </div>
                    </button>

                    <button
                      onClick={handleWithdraw}
                      className="w-full flex items-center p-4 hover:bg-gray-600 transition text-left"
                    >
                      <LogOut className="mr-2 w-5 h-5 text-red-400" />
                      Withdraw
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      <div className="pt-20 flex">
        <div className="w-64 bg-gray-800/70 backdrop-blur-md p-6 border-r border-gray-700 h-[calc(100vh-5rem)] overflow-y-auto">
          <h3 className="text-xl font-bold mb-6 flex items-center text-gray-100">
            <Plus className="mr-2 text-blue-400" />
            Contract Templates
          </h3>
          <div className="space-y-4">
            {contractTemplates.map((template) => (
              <motion.button
                key={template.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleContractSelect(template)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeContract === template.name
                    ? 'bg-blue-800/50 text-blue-300'
                    : 'hover:bg-gray-700 text-gray-300'
                  }`}
              >
                <div className="text-left">
                  <h4 className="font-semibold">{template.name}</h4>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex-grow p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-100">
              {React.cloneElement(
                contractTemplates.find(t => t.name === activeContract)?.icon ?? <X />,
                { className: "mr-2 w-8 h-8 text-blue-400" }
              )}
              {activeContract} Contract
            </h2>
            <p className="text-gray-400">
              Create and configure your {activeContract} smart contract using our no-code interface.
            </p>
          </motion.div>

          <div className="bg-gray-800 rounded-lg shadow-lg h-[500px]">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="font-bold flex items-center text-gray-100">
                <MessageCircle className="mr-2 text-blue-400" />
                ContractCraft AI
              </h3>
            </div>

            <div className="p-4 max-h-108 overflow-y-auto space-y-3 h-[370px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${msg.sender === 'AI'
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-blue-800 text-gray-100'
                      }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about your smart contract..."
                className="flex-grow p-2 bg-gray-700 text-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContractDashboard;