import React from 'react'

export const Navbar = () => {
  return (

    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-white/5 z-30 relative bg-[#09090b]/80 backdrop-blur-md">
        <div className="flex items-center gap-8">   
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="flex items-center  font-bold text-xl tracking-tight">
                <img
                  src="/assets/Logo_company.png"
                  alt="Talbotiq Logo"
                  className="w-9 h-9 object-contain"
                />

                <span>
                  T<span className="text-green-300">a</span>lbot
                  <span className="text-green-300">i</span>q
                </span>
              </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Developers</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Company</a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-neutral-200 transition-colors">
            Dashboard
          </button>
        </div>
      </nav>
  )
}
