import {
  Sparkles,
  PenTool,
  ListTodo,
  FileText,
  Settings,
  MessageSquare,
  ChevronRight,
  BrainCircuit,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

const navigationItems = [
  {
    label: "Content Creation",
    items: [
      { icon: Sparkles, label: "AI Writer", active: true },
      { icon: PenTool, label: "Post Editor" },
      { icon: ListTodo, label: "Post Queue" },
      { icon: FileText, label: "My Posts" },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: BrainCircuit, label: "My AI" },
      { icon: MessageSquare, label: "Tone & Voice" },
      { icon: Settings, label: "AI Preferences" },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="h-16 px-6 border-b border-gray-200 flex items-center">
        <Link href="/dashboard">
          <img src="/logo.svg" alt="LinkedGenius" className="h-10" />
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6 px-3 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        {navigationItems.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      item.active
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-md transition-colors ${
                        item.active
                          ? "bg-gradient-to-r from-blue-100 to-indigo-100"
                          : "bg-gray-100 group-hover:bg-gray-200"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    {item.label}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      item.active ? "rotate-90 text-blue-600" : "text-gray-400"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pro Features Card */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 p-4 text-white">
          <div className="relative z-10">
            <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
            <p className="text-xs text-blue-100 mb-3">
              Unlock unlimited AI post generation
            </p>
            <button className="w-full bg-white text-blue-600 text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors">
              Upgrade Now
            </button>
          </div>
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
            <div className="absolute inset-0 rotate-45 opacity-10">
              <div className="w-full h-full bg-white rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
