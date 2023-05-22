'use client';

import { FC } from 'react';
import { useProjectConfig } from '../api/projectConfig/projectConfigContext';
import Link, { LinkProps } from 'next/link';

const ProjectLink: FC<LinkProps> = (props) => {
  const { projectId } = useProjectConfig();
  const href = `/${projectId}${props.href}`;
  return <Link {...props} href={href} />;
};

export default ProjectLink;
