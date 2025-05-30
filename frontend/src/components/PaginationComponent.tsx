import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationComponentProps {
	pagesize: number;

	onPageSizeChange: (newSize: number) => void;
	currentPage: number;

	onPageChange: (newPage: number) => void;
	totalPages: number;
}

const PaginationComponent = ({
	pagesize,
	onPageSizeChange,
	currentPage,
	onPageChange,
	totalPages,
}: PaginationComponentProps) => {
	return (
		<div className="mt-6 flex w-full items-center justify-between gap-4">
			{/* Page Size Selector */}
			<div className="flex items-center gap-2">
				<Select
					value={String(pagesize)}
					onValueChange={(value: string) =>
						onPageSizeChange(parseInt(value))
					}>
					<SelectTrigger className="w-[80px]">
						<SelectValue placeholder="Page Size" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Page Size</SelectLabel>
							{[10, 20, 30, 50].map((size) => (
								<SelectItem key={size} value={String(size)}>
									{size}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			{/* Pagination Controls */}
			<div className="flex items-center gap-2">
				<Pagination>
					<PaginationContent>
						{/* Previous Button */}
						<PaginationItem>
							<PaginationPrevious
								className={`border border-slate-200 dark:border-slate-700 ${
									currentPage === 1
										? 'cursor-not-allowed opacity-50'
										: ''
								}`}
								onClick={(e) => {
									e.preventDefault();
									if (currentPage > 1)
										onPageChange(currentPage - 1);
								}}
							/>
						</PaginationItem>

						{/* First Page */}
						{currentPage > 2 && (
							<PaginationItem>
								<PaginationLink
									role="button"
									onClick={() => onPageChange(1)}
									className="border border-slate-200 dark:border-slate-700">
									1
								</PaginationLink>
							</PaginationItem>
						)}

						{/* Ellipsis Before Current Page */}
						{currentPage > 3 && <PaginationEllipsis />}

						{/* Previous Page */}
						{currentPage > 1 && (
							<PaginationItem>
								<PaginationLink
									role="button"
									onClick={() =>
										onPageChange(currentPage - 1)
									}
									className="border border-slate-200 dark:border-slate-700">
									{currentPage - 1}
								</PaginationLink>
							</PaginationItem>
						)}

						{/* Current Page */}
						<PaginationItem>
							<PaginationLink
								isActive
								className="border border-slate-200 bg-[#EC672B] dark:border-slate-700 dark:bg-[#EC672B] dark:text-slate-50">
								{currentPage}
							</PaginationLink>
						</PaginationItem>

						{/* Next Page */}
						{currentPage < totalPages && (
							<PaginationItem>
								<PaginationLink
									role="button"
									onClick={() =>
										onPageChange(currentPage + 1)
									}
									className="border border-slate-200 dark:border-slate-700">
									{currentPage + 1}
								</PaginationLink>
							</PaginationItem>
						)}

						{/* Ellipsis After Current Page */}
						{currentPage < totalPages - 2 && <PaginationEllipsis />}

						{/* Last Page */}
						{currentPage < totalPages - 1 && (
							<PaginationItem>
								<PaginationLink
									role="button"
									onClick={() => onPageChange(totalPages)}
									className="border border-slate-200 dark:border-slate-700">
									{totalPages}
								</PaginationLink>
							</PaginationItem>
						)}

						{/* Next Button */}
						<PaginationItem>
							<PaginationNext
								className={`border border-slate-200 dark:border-slate-700 ${
									currentPage === totalPages
										? 'cursor-not-allowed opacity-50'
										: ''
								}`}
								onClick={(e) => {
									e.preventDefault();
									if (currentPage < totalPages)
										onPageChange(currentPage + 1);
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

export default PaginationComponent;
