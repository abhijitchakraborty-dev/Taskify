

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-slate-500 text-white p-2">
            <div className="logo">
                <span className="font-bold text-xl mx-6">Taskify</span>
            </div>
            <ul className="flex gap-7 mx-9">
                <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
            </ul>
            
        </nav>
    )
}

export default Navbar
