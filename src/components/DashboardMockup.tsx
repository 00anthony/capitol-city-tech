
import React from 'react';

const DashboardMockup: React.FC = () => {
  return (
    <div className="relative max-w-6xl mx-auto transform hover:scale-[1.01] transition-transform duration-700">
      <div className="-inset-1 bg-lilnear-to-r from-blue-500/30 to-purple-600/30 opacity-40 rounded-3xl absolute blur-xl"></div>
      
      <div className="relative rounded-2xl bg-[#0B0E14] border border-white/10 shadow-2xl overflow-hidden flex text-left h-150 md:h-175">
        
        {/* Sidebar */}
        <div className="w-64 border-r border-white/5 bg-[#0F1219] hidden lg:flex flex-col p-6">
          <div className="flex items-center gap-2 mb-10 text-white font-medium">
            <div className="w-6 h-6 rounded bg-linear-to-tr from-orange-400 to-pink-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <span>clambian</span>
          </div>
          
          <div className="mb-8">
            <button className="w-full flex items-center justify-between p-2 rounded-lg border border-white/10 bg-[#1A1F2E] text-xs text-white mb-6 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-700"></div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-400">Workspace</span>
                  <span className="font-medium">Team Product</span>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="m6 9 6 6 6-6"></path></svg>
            </button>
            
            <div className="space-y-1">
              {['Dashboard', 'My Task', 'Agenda', 'Inbox', 'Reports'].map((item, idx) => (
                <a key={item} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-xs font-medium ${idx === 1 ? 'text-white bg-[#1E2330] border border-white/5' : 'text-slate-400 hover:text-white'}`}>
                  {idx === 0 && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>}
                  {idx === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>}
                  {idx === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>}
                  {idx === 3 && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                  {idx === 4 && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>}
                  {item}
                  {idx === 3 && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Dhika+Endi&background=random" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-medium text-white">Dhika Endi</span>
              <span className="text-[10px] text-slate-500">UI Designer</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#0B0E14] relative overflow-hidden">
          {/* Dashboard Header */}
          <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B0E14]/80 backdrop-blur z-20">
            <div className="relative w-64 md:w-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              <input type="text" placeholder="Search" className="w-full bg-[#151B2B] border border-white/5 rounded-full pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/10 placeholder:text-slate-600" />
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:flex bg-linear-to-r from-blue-500 to-cyan-400 text-white text-xs font-medium px-4 py-2 rounded-lg items-center gap-2 hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="12" x2="12" y1="8" y2="16"></line><line x1="8" x2="16" y1="12" y2="12"></line></svg>
                Create New Board
              </button>
              <div className="w-px h-6 bg-white/10 hidden md:block"></div>
              <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
              </button>
              <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
          </div>

          {/* Board Main View */}
          <div className="px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Board</div>
                <h2 className="text-2xl font-semibold text-white">Hoboks App</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-[#0B0E14]" src="https://ui-avatars.com/api/?name=J&background=random" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0B0E14]" src="https://ui-avatars.com/api/?name=M&background=random" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0B0E14]" src="https://ui-avatars.com/api/?name=A&background=random" alt="User" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#0B0E14] bg-[#1E2330] flex items-center justify-center text-[10px] text-white">4+</div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded bg-[#1E2330] text-slate-400 flex items-center justify-center hover:bg-[#2A3042]"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" x2="20" y1="8" y2="14"></line><line x1="23" x2="17" y1="11" y2="11"></line></svg></button>
                  <button className="w-8 h-8 rounded bg-[#1E2330] text-slate-400 flex items-center justify-center hover:bg-[#2A3042]"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button>
                </div>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-6 mb-6 text-xs font-medium text-slate-500 border-b border-white/5 pb-1">
              <a href="#" className="hover:text-white transition-colors pb-3">List</a>
              <a href="#" className="text-white pb-3 border-b-2 border-blue-500">Board</a>
              <a href="#" className="hover:text-white transition-colors pb-3">Table</a>
              <a href="#" className="hover:text-white transition-colors pb-3">Files</a>
              <a href="#" className="hover:text-white transition-colors pb-3">Timeline</a>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-100 overflow-hidden overflow-y-auto dashboard-scroll">
              
              {/* Column 1: To Do */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full bg-pink-500"></div>
                    <span className="text-xs font-medium text-white">To do</span>
                    <span className="w-5 h-5 rounded bg-[#1E2330] flex items-center justify-center text-[10px] text-slate-500">3</span>
                  </div>
                </div>

                {/* Card 1 */}
                <div className="bg-[#151B2B] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer shadow-lg shadow-black/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-semibold text-slate-200">Revision Profile Page</h3>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">Create mobile wireframes & Website Task Management...</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-medium border border-green-500/20">Low</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 2
                      </div>
                      <img className="w-5 h-5 rounded-full border border-[#151B2B]" src="https://ui-avatars.com/api/?name=S&background=random" alt="Assignee" />
                    </div>
                  </div>
                </div>

                {/* Card 2 (Image/Gradient Placeholder) */}
                <div className="bg-[#151B2B] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer shadow-lg shadow-black/20">
                  <div className="w-full h-16 rounded-lg bg-linear-to-r from-blue-600 to-purple-500 mb-3"></div>
                  <h3 className="text-xs font-semibold text-slate-200 mb-1">Gradient Style</h3>
                  <p className="text-[10px] text-slate-500 mb-3">Create a gradient for the example from the wallpaper...</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-medium border border-green-500/20">Low</span>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <img className="w-5 h-5 rounded-full border border-[#151B2B]" src="https://ui-avatars.com/api/?name=A&background=random" alt="Assignee" />
                        <img className="w-5 h-5 rounded-full border border-[#151B2B]" src="https://ui-avatars.com/api/?name=B&background=random" alt="Assignee" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: In Progress */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-xs font-medium text-white">In progress</span>
                    <span className="w-5 h-5 rounded bg-[#1E2330] flex items-center justify-center text-[10px] text-slate-500">2</span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#151B2B] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer shadow-lg shadow-black/20">
                  <h3 className="text-xs font-semibold text-slate-200 mb-1">Sign In Page</h3>
                  <p className="text-[10px] text-slate-500 mb-3">This sign in page will later be used for all products.</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-medium border border-green-500/20">Low</span>
                    <img className="w-5 h-5 rounded-full border border-[#151B2B]" src="https://ui-avatars.com/api/?name=D&background=random" alt="Assignee" />
                  </div>
                </div>

                {/* Card 4 (Image) */}
                <div className="bg-[#151B2B] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer shadow-lg shadow-black/20">
                  <div className="w-full h-24 rounded-lg bg-slate-800 mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" className="w-full h-full object-cover opacity-80" alt="Wireframe" />
                  </div>
                  <h3 className="text-xs font-semibold text-slate-200 mb-1">Wireframe</h3>
                  <p className="text-[10px] text-slate-500 mb-3">Create wireframes mobile & Website Task Management...</p>
                </div>
              </div>

              {/* Column 3: In Review */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-medium text-white">In review</span>
                    <span className="w-5 h-5 rounded bg-[#1E2330] flex items-center justify-center text-[10px] text-slate-500">2</span>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="bg-[#151B2B] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer shadow-lg shadow-black/20">
                  <h3 className="text-xs font-semibold text-slate-200 mb-1">Mock Up</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[9px] font-medium border border-orange-500/20">High</span>
                    <div className="flex -space-x-1">
                      <img className="w-5 h-5 rounded-full border border-[#151B2B]" src="https://ui-avatars.com/api/?name=T&background=random" alt="Assignee" />
                      <img className="w-5 h-5 rounded-full border border-[#151B2B]" src="https://ui-avatars.com/api/?name=K&background=random" alt="Assignee" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 4: Complete */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-white">Complete</span>
                    <span className="w-5 h-5 rounded bg-[#1E2330] flex items-center justify-center text-[10px] text-slate-500">1</span>
                  </div>
                </div>

                {/* Card 6 */}
                <div className="bg-[#151B2B] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors group cursor-pointer shadow-lg shadow-black/20">
                  <div className="w-full h-24 rounded-lg bg-slate-800 mb-3 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover opacity-80" alt="Prototype" />
                  </div>
                  <h3 className="text-xs font-semibold text-slate-200 mb-1">Prototype</h3>
                  <p className="text-[10px] text-slate-500">Full interaction model ready for dev handoff...</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
