const deletePage = () => {
	const person = {
		name: "Parshuram Nikam",
		email: "parshucbb hwef@fanhc a.vv ",
		balance: 25025,
	};
	return (
		<div class="m-8 bg-white shadow-lg hover:shadow-xl rounded-md overflow-hidden">
			<table class="table flex table-auto w-full leading-normal">
				<thead class="uppercase text-gray-600 text-xs font-semibold bg-gray-200">
					<tr class="hidden md:table-row">
						<th class="text-left p-3">
							<p>Class</p>
						</th>
						<th class="text-left p-3">
							<p>Subject</p>
						</th>
						<th class="text-right p-3">
							<p>Time</p>
						</th>
						<th class="text-right p-3">
							<p>Teacher Name</p>
						</th>
						<th class="text-right p-3">
							<p>Link</p>
						</th>
					</tr>
				</thead>
				<tbody class="flex-1 text-gray-700 sm:flex-none">
					<tr
						v-for="(person, index) in persons"
						key="index"
						class="border-t first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap"
					>
						{/* -------.>>>>>>>>>> */}
						<td class="p-1 md:p-3">
							<label
								class="text-xs text-gray-500 uppercase font-semibold md:hidden"
								for=""
							>
								Name
							</label>
							<p class="">{person.name}</p>
						</td>
						{/* ---------->>>>>>>>>>>>>> */}
						<td class="p-1 md:p-3">
							<label
								class="text-xs text-gray-500 uppercase font-semibold md:hidden"
								for=""
							>
								Email
							</label>
							<p class="">{person.email}</p>
						</td>
						<td class="p-1 md:p-3 md:text-right">
							<label lass="text-xs text-gray-500 uppercase font-semibold md:hidden"for="">
								Currency
							</label>
							<div>{person.balance}</div>
						</td>
						<td class="p-1 md:p-3 md:text-right">
							<label lass="text-xs text-gray-500 uppercase font-semibold md:hidden"for="">
								Currency
							</label>
							<div>{person.balance}</div>
						</td>
						<td class="text-right p-1 md:p-3">
							<button
								type="button"
								class="inline-block text-gray-600 hover:text-gray-700"
							>
								<span class="text-blue-600 hover:text-blue-400 font-semibold">
									Edit
								</span>
								<svg
									class="hidden inline-block h-6 w-6 fill-current"
									viewBox="0 0 24 24"
								>
									<path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
								</svg>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default deletePage;
