// SSO Configuration utilities
// This file provides configuration for SAML-based SSO authentication

export interface SAMLConfig {
	issuer: string;
	entryPoint: string;
	cert: string;
	callbackUrl?: string;
}

export const getSAMLConfig = (): SAMLConfig | null => {
	const issuer = process.env.SAML_ISSUER;
	const entryPoint = process.env.SAML_ENTRY_POINT;
	const cert = process.env.SAML_CERT;

	if (!issuer || !entryPoint || !cert) {
		console.warn(
			"SAML configuration is incomplete. SSO will not be available."
		);
		return null;
	}

	return {
		issuer,
		entryPoint,
		cert,
		callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/saml`,
	};
};

// You can add SAML provider to NextAuth configuration like this:
// import SAMLProvider from "next-auth/providers/saml"
//
// SAMLProvider({
//   id: "saml",
//   name: "SSO",
//   type: "saml",
//   ...getSAMLConfig(),
// })
