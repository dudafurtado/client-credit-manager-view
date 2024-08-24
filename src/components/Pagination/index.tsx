import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useMyContext from '@/context/useMyContext';
import { fetchData } from '@/services/fetchData';
import { getToken } from '@/utils/token';

function decodeHtml(html: any) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export function PaginationDemo() {
  const { pagination, setPagination } = useMyContext();
  const token = getToken();

  const loadPage = async (url: string) => {
    const { pathname, search } = new URL(url);
    let path = `${pathname}${search}`.replace('/api', '');
    const { ok, data } = await fetchData(
      'api',
      path,
      'GET',
      'Paginação Feita com Sucesso',
      '',
      token
    );

    if (ok) {
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        links: data.links.map((link: { label: string }) => ({
          ...link,
          label: decodeHtml(link.label.trim()),
        })),
      });
    }
  };

  function handlePagination(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    pageUrl: string | null
  ) {
    e.preventDefault();
    if (pageUrl) {
      loadPage(pageUrl);
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => handlePagination(e, pagination.prev_page_url)}
            className={`${
              !pagination.prev_page_url ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
        {pagination.links
          .filter(
            (link: { label: string | string[] }) =>
              !link.label.includes('&laquo;') && !link.label.includes('&raquo;')
          )
          .map((link: any, index: number) =>
            link.label.includes('...') ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={link.active}
                  onClick={(e) => handlePagination(e, link.url)}
                >
                  {decodeHtml(link.label)}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handlePagination(e, pagination.next_page_url)}
            className={`${
              !pagination.next_page_url ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
