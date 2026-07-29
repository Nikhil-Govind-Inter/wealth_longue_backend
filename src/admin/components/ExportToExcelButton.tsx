import * as React from 'react';
import { Button } from '@strapi/design-system';
import { Download } from '@strapi/icons';
import {
  unstable_useContentManagerContext as useContentManagerContext,
  useFetchClient,
  useQueryParams,
} from '@strapi/strapi/admin';

const EXPORTABLE_UIDS = new Set([
  'api::enquiry.enquiry',
  'api::contact-enquiry.contact-enquiry',
  'api::profile-assesment-enquiry.profile-assesment-enquiry',
]);



type Params = {
  filters: string;
  sort: string;
  _q: string;
}

const ExportToExcelButton = () => {
  const { model } = useContentManagerContext();
  const { get } = useFetchClient();
  const [{ query }] = useQueryParams<Params>();
  const [isLoading, setIsLoading] = React.useState(false);

  if (!EXPORTABLE_UIDS.has(model)) return null;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await get(`/export-to-excel/export/${encodeURIComponent(model)}`, {
        params: {
          filters: query.filters,
          sort: query.sort,
          _q: query._q,
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${model.split('.').pop()}-export.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Excel export failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="secondary" startIcon={<Download />} onClick={handleClick} loading={isLoading}>
      Export to Excel
    </Button>
  );
};

export default ExportToExcelButton;
