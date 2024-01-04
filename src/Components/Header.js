function Header() {
    return ( 
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/dashboard"> Employee System</a>
                        <a className="text-secondary" href="/addEmployee"> Add </a>
                    </div>
                </nav>
            </header>
        </>
     );
}

export default Header;