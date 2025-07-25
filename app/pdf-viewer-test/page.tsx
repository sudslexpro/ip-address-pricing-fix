import React from "react";
import { PDFViewerDemo } from "@/components/pages-ui/download-pdf";

export default function PDFViewerTestPage() {
	return (
		<div className="min-h-screen bg-background py-16">
			<div className="max-w-4xl mx-auto px-6 lg:px-8">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold text-text-primary mb-4">
						PDF Viewer Modal Test
					</h1>
					<p className="text-xl text-text-secondary">
						Test the PDF viewer modal with sample content, download and print
						functionality.
					</p>
				</div>

				<div className="flex justify-center">
					<PDFViewerDemo />
				</div>

				<div className="mt-12 bg-white dark:bg-white/10 rounded-2xl p-8 shadow-lg border border-border">
					<h2 className="text-2xl font-semibold text-text-primary mb-6">
						Features
					</h2>

					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-text-primary">
								Modal Features
							</h3>
							<ul className="space-y-2 text-text-secondary">
								<li>• Responsive modal sizing (sm, md, lg, xl, full)</li>
								<li>• Dark mode compatible</li>
								<li>• Floating element management</li>
								<li>• Keyboard accessibility</li>
								<li>• Customizable PDF options</li>
							</ul>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-medium text-text-primary">
								PDF Capabilities
							</h3>
							<ul className="space-y-2 text-text-secondary">
								<li>• High-quality PDF generation (jsPDF + html2canvas)</li>
								<li>• Print functionality with optimized styles</li>
								<li>• Multiple format support (A4, Letter, Legal)</li>
								<li>• Configurable margins and scaling</li>
								<li>• Custom filename support</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
