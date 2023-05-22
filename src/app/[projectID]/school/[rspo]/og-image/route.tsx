import { ImageResponse } from '@vercel/og';
import { fetchProjectConfig } from '../../../../../api/projectConfig/projectConfig';
import { fetchInstitutionDetails } from '../../../../../api/institutionDetails/institutionDetails';
import environment from '../../../../../environment/server';

const SITE_URL = environment.publicEnvironment.SITE_URL;

const fontUrl = `${SITE_URL}/app/assets/fonts/Jost-500-Medium.ttf`;

const font = fetch(fontUrl).then((res) => res.arrayBuffer());
export async function GET(
  request: Request,
  { params: { rspo, projectID } }: { params: { rspo: string; projectID: string } },
) {
  const { projectName } = await fetchProjectConfig(projectID);
  const { name: institutionName } = await fetchInstitutionDetails(rspo);
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        tw="flex items-center bg-white w-full h-full px-14 text-white"
        style={{ background: '#040B16' }}
      >
        <div tw="flex flex-col">
          <h3 tw="text-3xl flex items-center">
            po<span style={{ color: '#9D54BF' }}>8</span>klasie
            <span
              tw="ml-4 uppercase font-normal text-2xl text-gray-200"
              style={{ color: '#9CA0A9' }}
            >
              {projectName}
            </span>
          </h3>
          <h1>{institutionName}</h1>
          <span>sprawdź ofertę edukacyjną, dojazd i więcej na po8klasie.pl</span>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'Jost',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
