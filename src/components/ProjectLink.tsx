import { FC } from 'react'
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router'
import { useCustomizationCtx } from '../lib/customizations/customizationContext'

const useProjectLinkProps = <T = LinkProps,>(props: T): T => {
    const { projectId } = useCustomizationCtx()
    return { ...props, to: `/app/${projectId}${props.to}` }
}

const ProjectLink: FC<LinkProps> = (props) => {
    const linkProps = useProjectLinkProps(props)
    return <Link {...linkProps}>{props.children}</Link>
}

export const ProjectNavLink: FC<NavLinkProps> = (props) => {
    const linkProps = useProjectLinkProps<NavLinkProps>(props)
    return <NavLink {...linkProps}>{props.children}</NavLink>
}

export default ProjectLink
