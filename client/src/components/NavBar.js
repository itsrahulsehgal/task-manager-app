import React from 'react'

export default function NavBar() {

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    return (
        <header className='header'>
            <div className="logo"><a href='/'>Task Manager</a></div>

            {!window.localStorage.getItem('token') ?
                <nav className='nav'>
                    <a href="/auth/register">Register</a>
                    <a href="/auth/login">Login</a>
                </nav>
                : window.location.href.includes('todo') ?
                    <nav className='nav'>
                        <div className='logout'>
                            <button onClick={logout}>Logout</button>
                        </div>
                    </nav>
                    :
                    <nav className='nav'>
                        <button className='todoListBtn' onClick={() => window.location.href = "/todo"}>TODO List</button>
                    </nav>
            }

        </header>
    )
}
