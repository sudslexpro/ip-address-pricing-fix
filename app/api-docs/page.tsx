import React from "react";
import ApiDocumentationPage from "@/components/pages-ui/api-docs/ApiDocumentationPage";

const page: React.FC = () => {
	return (
		<main>
			<div className={`min-h-screen bg-background`}>
				<ApiDocumentationPage />
			</div>
		</main>
	);
};

export default page;
