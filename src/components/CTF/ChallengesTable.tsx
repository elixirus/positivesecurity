// import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Flex, Text,
    Image,
    HStack,
    Heading,
} from '@chakra-ui/react';
import * as React from "react";

import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel
} from "@tanstack/react-table";
import { CustomDivider } from '../CustomDivider/CustomDivider';
export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

export default function Challenges<Data extends object>({
    data,
    columns
}: DataTableProps<Data>) {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        }
    });

    return (

        <Stack>

            <CustomDivider title="Challenges" />

            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        <chakra.span pl="4">
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === "desc" ? (
                                                    <TriangleDownIcon aria-label="sorted descending" />
                                                ) : (
                                                    <TriangleUpIcon aria-label="sorted ascending" />
                                                )
                                            ) : null}
                                        </chakra.span>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                                const meta: any = cell.column.columnDef.meta;
                                return (
                                    <Td key={cell.id} isNumeric={meta?.isNumeric}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>

        </Stack>

    );
}