import { CheckCircle2, Copy, X } from "lucide-react";
import { useState } from "react";

const DUMMY_DATA = [
	{
		id: 8,
		title: "Symptom Pattern Network",
		category: "Network",
		domain: "Healthcare",
		style: "Minimalism",
		image: "url('/symptom-pattern-network.jpg') center/cover no-repeat",
		userPrompt: "Mô tả mối liên hệ giữa các triệu chứng đau đầu, mất ngủ, và căng thẳng.",
		prompt:
			'nlm infographic create <notebook-id> --focus "Infographic mối liên hệ giữa đau đầu, mất ngủ, và căng thẳng\\n\\nFormat Guidance: Render a central-node mind map or a web-like network diagram. Use connecting lines to show relationships, hierarchies, or data flow between entities.\\n\\nTone/Context: Network/correlation diagram showing interconnected symptoms" --confirm',
		components: ["HC-004", "healthcare", "network"],
	},
	{
		id: 7,
		title: "System Architecture",
		category: "Process",
		domain: "Technology",
		style: "Isometric",
		image: "url('/system-architecture.jpg') center/cover no-repeat",
		userPrompt: "Sơ đồ kiến trúc microservices với API Gateway, Auth Service, 3 microservices và database.",
		prompt:
			'nlm infographic create <notebook-id> --focus "Sơ đồ kiến trúc microservices với API Gateway, Auth Service, 3 microservices và database\\n\\nFormat Guidance: Architecture diagram với service boxes, connection arrows, data flow indicators, tech stack icons" --confirm',
		components: ["TECH-001", "technology", "structural"],
	},
	{
		id: 6,
		title: "Customer Journey Map",
		category: "Process",
		domain: "Marketing",
		style: "Corporate",
		image: "url('/customer-journey-map.jpg') center/cover no-repeat",
		userPrompt: "Tạo customer journey map thương mại điện tử với 5 touchpoints, tỷ lệ chuyển đổi và pain points tại mỗi giai đoạn.",
		prompt:
			'nlm infographic create <notebook-id> --focus "Customer journey với 5 touchpoints, tỷ lệ chuyển đổi và pain points tại mỗi giai đoạn\\n\\nFormat Guidance: Journey map với touchpoint icons, conversion metrics, pain indicators\\n\\nTone/Context: E-commerce customer journey analysis." --confirm',
		components: ["MK-005", "marketing", "experience-flow"],
	},
	{
		id: 5,
		title: "Financial Dashboard Q1/2024",
		category: "Statistical",
		domain: "Business",
		style: "Corporate",
		image: "url('/financial-dashboard.png') center/cover no-repeat",
		userPrompt: "Create a Q1/2024 financial dashboard infographic with revenue, expenses, net income, and profit margins, formatted with KPI cards and trend charts.",
		prompt:
			'nlm infographic create <notebook-id> --focus "Dashboard tài chính Q1/2024 với doanh thu, chi phí, lợi nhuận, tỷ suất lợi nhuận.\\n\\nFormat Guidance: Financial dashboard với KPI cards, trend charts, variance indicators, benchmark comparisons" --confirm',
		components: ["BS-002", "business", "metrics"],
	},
	{
		id: 1,
		title: "SaaS Q4 Launch",
		category: "Timeline",
		domain: "SaaS",
		style: "Glassmorphism",
		image: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
		userPrompt: "Make an infographic about our new SaaS launch timeline for the Q4 board meeting.",
		prompt:
			'nlm infographic create 12a4f --focus "Product: SaaS, Structure: Timeline, Style: Glassmorphism... Make an infographic about our new SaaS launch timeline for the Q4 board meeting." --confirm',
		components: ["saas.json", "timeline.json", "glassmorphism.json"],
	},
	{
		id: 2,
		title: "Patient Onboarding",
		category: "Process",
		domain: "Healthcare",
		style: "Neumorphism",
		image: "linear-gradient(135deg, #10b981, #34d399)",
		userPrompt: "Build a 5-step process for our remote patient onboarding flow.",
		prompt:
			'nlm infographic create a8b2c --focus "Domain: Healthcare, Structure: Process... Build a 5-step process for our remote patient onboarding flow." --confirm',
		components: ["healthcare.json", "process.json", "neumorphism.json"],
	},
	{
		id: 3,
		title: "Q3 Financials vs Q4",
		category: "Comparison",
		domain: "Fintech",
		style: "Minimalism",
		image: "linear-gradient(135deg, #f59e0b, #fbbf24)",
		userPrompt: "Compare our Q3 vs Q4 financial metrics cleanly.",
		prompt:
			'nlm infographic create 99c7d --focus "Domain: Fintech, Structure: Comparison... Compare our Q3 vs Q4 financial metrics cleanly." --confirm',
		components: ["fintech.json", "comparison.json", "minimalism.json"],
	},
	{
		id: 4,
		title: "User Auth Flow",
		category: "Flowchart",
		domain: "SaaS",
		style: "Isometric",
		image: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
		userPrompt: "Show the entire user authentication flowchart with edge cases.",
		prompt:
			'nlm infographic create f4d2e --focus "Structure: Flowchart, Style: Isometric... Show the entire user authentication flowchart with edge cases." --confirm',
		components: ["saas.json", "flowchart.json", "isometric.json"],
	},
];

const CATEGORIES = [
	"All",
	"Timeline",
	"Flowchart",
	"Comparison",
	"Statistical",
	"Process",
	"Network",
	"SaaS",
	"Healthcare",
	"Business",
	"Marketing",
	"Technology",
];

export default function Gallery() {
	const [activeTab, setActiveTab] = useState("All");
	const [selectedItem, setSelectedItem] = useState<
		(typeof DUMMY_DATA)[0] | null
	>(null);
	const [copied, setCopied] = useState(false);

	const filteredData =
		activeTab === "All"
			? DUMMY_DATA
			: DUMMY_DATA.filter(
					(item) => item.category === activeTab || item.domain === activeTab,
				);

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section
			id="gallery"
			className="w-full mx-auto py-24 md:py-32 px-4 md:px-8"
		>
			<div className="text-center mb-12">
				<h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-50 mb-6">
					Infographic Demo Gallery
				</h2>
				<p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
					Browse real-world infographics generated via our NotebookLM Skill.
					Click to see the structure, style, and prompt behind each design.
				</p>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap justify-center gap-2 mb-12">
				{CATEGORIES.map((cat) => (
					<button
						key={cat}
						type="button"
						onClick={() => setActiveTab(cat)}
						className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border cursor-pointer ${
							activeTab === cat
								? "bg-sky-500 text-white border-sky-500"
								: "bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-sky-500 hover:text-sky-400"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			{/* Gallery Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{filteredData.map((item) => (
					<button
						key={item.id}
						type="button"
						onClick={() => setSelectedItem(item)}
						className="group text-left cursor-pointer rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-sm shadow-black/50 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col w-full"
					>
						<div
							className="w-full h-48 md:h-64 shrink-0"
							style={{ background: item.image }}
						/>
						<div className="p-5 flex-1">
							<h3 className="text-lg font-bold text-zinc-50 mb-2 truncate">
								{item.title}
							</h3>
							<div className="flex flex-wrap gap-2 mt-2">
								<span className="text-xs font-semibold px-2 py-1 bg-sky-900/30 text-sky-400 border border-sky-800/50 rounded-md">
									{item.domain}
								</span>
								<span className="text-xs font-semibold px-2 py-1 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md">
									{item.category}
								</span>
								<span className="text-xs font-semibold px-2 py-1 bg-purple-900/30 text-purple-400 border border-purple-800/50 rounded-md">
									{item.style}
								</span>
							</div>
						</div>
					</button>
				))}
			</div>

			{/* Modal Overlay */}
			{selectedItem && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
					{/* Backdrop */}
					<button
						type="button"
						className="absolute inset-0 w-full h-full bg-slate-900/60 backdrop-blur-sm cursor-pointer border-none"
						onClick={() => setSelectedItem(null)}
					/>

					{/* Modal Content */}
					<div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl shadow-black/80 flex flex-col max-h-[90vh] overflow-y-auto">
						<button
							type="button"
							onClick={() => setSelectedItem(null)}
							className="absolute top-4 right-4 z-10 w-10 h-10 bg-zinc-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white shadow-sm border border-zinc-700 cursor-pointer transition-colors"
						>
							<X size={20} />
						</button>

						{/* Top: Prompt Details */}
						<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 shrink-0 bg-zinc-900 border-b border-zinc-800">
							{/* Left Column: Title & Tags */}
							<div className="flex flex-col">
								<h3 className="text-3xl font-black text-zinc-50 mb-4">
									{selectedItem.title}
								</h3>

								<div className="flex flex-wrap gap-2">
									<span className="text-sm font-semibold px-3 py-1 bg-sky-900/30 text-sky-400 rounded-lg border border-sky-800/50">
										{selectedItem.domain}
									</span>
									<span className="text-sm font-semibold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700">
										{selectedItem.category}
									</span>
									<span className="text-sm font-semibold px-3 py-1 bg-purple-900/30 text-purple-400 rounded-lg border border-purple-800/50">
										{selectedItem.style}
									</span>
								</div>
							</div>

							{/* Right Column: Prompt */}
							<div className="flex flex-col h-full">
								<div className="flex items-center justify-between mb-2">
									<h4 className="font-bold text-zinc-50">
										Prompt
									</h4>
									<button
										type="button"
										onClick={() => handleCopy(selectedItem.userPrompt)}
										className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
									>
										{copied ? (
											<CheckCircle2 size={14} className="text-green-500" />
										) : (
											<Copy size={14} />
										)}
										{copied ? "Copied!" : "Copy"}
									</button>
								</div>
								<div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex-1">
									<p className="text-sm text-zinc-300 leading-relaxed italic block overflow-x-auto whitespace-pre-wrap">
										"{selectedItem.userPrompt}"
									</p>
								</div>
							</div>
						</div>

						{/* Bottom: Image (Placeholder gradient or actual image) */}
						<div className="w-full bg-zinc-950 flex items-center justify-center min-h-[40vh]">
							{selectedItem.image.startsWith("url") ? (
								<img 
									src={selectedItem.image.replace("url('", "").replace("') center/cover no-repeat", "")} 
									alt={selectedItem.title} 
									className="w-full h-auto block" 
								/>
							) : (
								<div
									className="w-full flex flex-col items-center justify-center p-8 min-h-[50vh] bg-cover bg-center"
									style={{ background: selectedItem.image }}
								>
									<div className="w-full max-w-md h-[400px] bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl p-8 flex flex-col gap-6 m-8">
										<div className="w-2/3 h-8 bg-white/50 rounded-lg"></div>
										<div className="w-full h-4 bg-white/30 rounded"></div>
										<div className="w-5/6 h-4 bg-white/30 rounded"></div>

										<div className="flex-1 mt-8 flex flex-col gap-4">
											{[1, 2, 3].map((i) => (
												<div key={i} className="flex gap-4 items-center">
													<div className="w-12 h-12 rounded-full bg-white/40 shrink-0"></div>
													<div className="flex-1 space-y-2">
														<div className="w-full h-3 bg-white/30 rounded"></div>
														<div className="w-2/3 h-3 bg-white/30 rounded"></div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
