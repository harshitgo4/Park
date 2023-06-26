import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  )

  const router = useNavigate()

  return (
    <div className="w-full m-auto overflow-scroll">
      <table {...getTableProps()} className="table w-full m-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="text-left border-b py-2 px-4"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => router(`/task/${row.original.taskId}`)}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border-b py-2 px-4">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div
        className={`pagination text-blue-500 flex justify-center items-center mt-4`}
      >
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageCount}
          onPageChange={(data) => gotoPage(data.selected)}
          containerClassName="flex space-x-2"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={pageIndex}
          previousClassName="border rounded p-2 bg-gray-200"
          nextClassName="border rounded p-2 bg-gray-200"
          pageClassName="border rounded p-2"
          pageLinkClassName="hover:bg-gray-200"
        />
      </div>
    </div>
  )
}
