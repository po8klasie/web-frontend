import Brand from './Brand'
import { useState, type FC } from 'react'
import ProjectLink, { ProjectNavLink } from './ProjectLink'

const navLinks = [
    {
        label: 'Dashboard',
        to: '/',
    },
    {
        label: 'Mapa szkół',
        to: '/map',
    },
    {
        label: 'Kalkulator punktów',
        to: '/calculator',
    },
]

const AppNavbar: FC = () => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
    const toggleMenu = () => setIsMenuCollapsed(!isMenuCollapsed)

    const getLinkClassName = ({ isActive }) => {
        return isActive ? 'font-bold' : ''
    }

    return (
        <div className="fixed top-0 left-0 w-full z-99999 bg-white border-b border-lighten font-primary h-navbarHeight flex items-center">
            <div
                className={`w-wideContainer
                } mx-auto lg:flex justify-between items-center py-3`}
            >
                <div className="relative flex items-center justify-between">
                    <ProjectLink to="/" className="flex items-center">
                        <Brand className="font-bold text-xl" />
                        <span className="ml-2 rounded-full bg-primaryBg text-primary uppercase px-2 py-1 text-xs font-bold">
                            Beta
                        </span>
                    </ProjectLink>
                    <button
                        className="text-xl lg:hidden"
                        onClick={toggleMenu}
                        type="button"
                    >
                        {/*{isMenuCollapsed ? <AiOutlineClose/> : <AiOutlineMenu/>}*/}
                    </button>
                </div>
                <div
                    className={` absolute z-10 top-navbarHeight bg-white w-full left-0 lg:w-auto pb-3 lg:pb-0 lg:static ${
                        !isMenuCollapsed && 'hidden lg:block'
                    }`}
                >
                    <div className="w-container mx-auto lg:w-full lg:flex items-center">
                        <ul className="lg:flex lg:mr-8">
                            {navLinks.map(({ label, to, badge }) => (
                                <li key={to} className="lg:mx-4 my-4 lg:my-0">
                                    <ProjectNavLink
                                        end
                                        to={to}
                                        className={getLinkClassName}
                                    >
                                        {label}
                                        {Boolean(badge) && (
                                            <span className="ml-1 rounded-full px-1 text-sm bg-primaryBg text-primary font-bold">
                                                {badge}
                                            </span>
                                        )}
                                    </ProjectNavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppNavbar
