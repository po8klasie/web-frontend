import React, { FC } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withProjectConfig, ProjectConfigConsumerProps } from '../../../config/withProjectConfig';
import AppLayout from '../../../components/app/AppLayout';
import SchoolHero from '../../../components/app/SchoolPage/SchoolHero';
import SchoolPageContent from '../../../components/app/SchoolPage/SchoolPageContent';
import { ISchoolData } from '../../../types';
import { ProjectConfig } from '../../../config/types';
import useSingleSchoolData, { createSingleSchoolDataQueryKey } from '../../../api/singleSchool';
import { useRouter } from 'next/router';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { queryClientOptions } from '../../../api/queryClient';
import { ProjectSpecificSeo } from '../../../Seo';
import { fetchProjectConfig } from '../../../config/fetchProjectConfig';

interface SchoolPageProps extends ProjectConfigConsumerProps<'appearance' | 'schoolInfo'> {
  school: ISchoolData;
}

const SchoolPage: FC<SchoolPageProps> = ({ PROJECT: { appearance, schoolInfo } }) => {
  const router = useRouter();
  const { data: school } = useSingleSchoolData(router.query.schoolID as string);

  return (
    <AppLayout projectAppearance={appearance}>
      <ProjectSpecificSeo appearanceConfig={appearance} title={(school as ISchoolData).name} />
      <SchoolHero school={school as ISchoolData} />
      <SchoolPageContent schoolInfoConfig={schoolInfo} school={school as ISchoolData} />
    </AppLayout>
  );
};

export default withProjectConfig<SchoolPageProps>(SchoolPage);

interface SchoolPageParams extends ParsedUrlQuery {
  schoolID: string;
  projectID: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SchoolPageParams>,
): Promise<
  GetServerSidePropsResult<{ PROJECT: Partial<ProjectConfig>; dehydratedState: DehydratedState }>
> => {
  const schoolID = context?.params?.schoolID;
  const projectID = context?.params?.projectID;

  if (!schoolID || !projectID)
    return {
      notFound: true,
    };

  const queryClient = new QueryClient(queryClientOptions);

  const queryKey = createSingleSchoolDataQueryKey(schoolID);
  await queryClient.prefetchQuery(queryKey);

  const school = queryClient.getQueryData<ISchoolData>(queryKey);

  if (!school || !school.rspo) return { notFound: true };

  return {
    props: {
      PROJECT: await fetchProjectConfig(projectID, ['school_view_config']),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

// https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
// A page that relies on publicRuntimeConfig must use getInitialProps to opt-out of Automatic Static Optimization.
// Runtime configuration won't be available to any page (or component in a page) without getInitialProps.
export const getInitialProps = (): void => {};
