function Topbar({ title }) {
  return (
    <header className="h-14 border-b border-[#2B2B2B] flex items-center px-8 text-sm text-[#9B9B9B] sticky top-0 bg-[#191919]/90 backdrop-blur-md z-20">
      {title}
    </header>
  );
}

export default Topbar;